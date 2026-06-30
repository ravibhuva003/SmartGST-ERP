import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { RegisterDto, LoginDto, SendOtpDto, VerifyOtpDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (user && user.password && await bcrypt.compare(pass, user.password)) {
      const { password, twoFactorSecret, ...result } = user;
      return result;
    }
    return null;
  }

  async login(loginDto: LoginDto, ipAddress?: string, deviceOs?: string) {
    const user = await this.validateUser(loginDto.email, loginDto.password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    
    return this.generateToken(user, ipAddress, deviceOs);
  }

  async register(registerDto: RegisterDto, ipAddress?: string, deviceOs?: string) {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: registerDto.email },
    });

    if (existingUser) {
      throw new BadRequestException('User already exists');
    }

    const hashedPassword = await bcrypt.hash(registerDto.password, 10);

    // Use a transaction to create User, Company, Branch, and CompanyUser Role
    const user = await this.prisma.$transaction(async (tx) => {
      const newUser = await tx.user.create({
        data: {
          email: registerDto.email,
          password: hashedPassword,
          name: registerDto.name,
        },
      });

      const company = await tx.company.create({
        data: {
          name: registerDto.companyName || 'My Company',
        }
      });

      const branch = await tx.branch.create({
        data: {
          companyId: company.id,
          name: 'Head Office',
        }
      });

      await tx.companyUser.create({
        data: {
          userId: newUser.id,
          companyId: company.id,
          branchId: branch.id,
          role: 'COMPANY_OWNER'
        }
      });

      return newUser;
    });

    const { password, twoFactorSecret, ...result } = user;
    return this.generateToken(result, ipAddress, deviceOs);
  }

  // --- OTP Simulation ---
  private simulatedOtps = new Map<string, string>();

  async sendOtp(dto: SendOtpDto) {
    // In Phase 2 this will integrate with MSG91 or Twilio
    const otp = "123456"; // Simulated static OTP for testing
    this.simulatedOtps.set(dto.phone, otp);
    return { message: "OTP sent successfully to " + dto.phone };
  }

  async verifyOtp(dto: VerifyOtpDto, ipAddress?: string, deviceOs?: string) {
    const validOtp = this.simulatedOtps.get(dto.phone);
    if (!validOtp || validOtp !== dto.otp) {
      throw new BadRequestException('Invalid OTP');
    }
    this.simulatedOtps.delete(dto.phone);

    let user = await this.prisma.user.findUnique({ where: { phone: dto.phone } });
    if (!user) {
      // Create a temporary user if doesn't exist, though typically they should register first
      throw new BadRequestException('User not found. Please register first.');
    }

    const { password, twoFactorSecret, ...result } = user;
    return this.generateToken(result, ipAddress, deviceOs);
  }

  private async generateToken(user: any, ipAddress?: string, deviceOs?: string) {
    const payload = { email: user.email, sub: user.id };
    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });

    // Track Device Session
    if (user.id) {
      await this.prisma.deviceSession.create({
        data: {
          userId: user.id,
          ipAddress,
          deviceOs,
          refreshToken,
        }
      });
    }

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
      user,
    };
  }

  // --- Password Reset Simulation ---
  private resetTokens = new Map<string, string>();

  async forgotPassword(email: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) {
      return { message: "If an account exists, a reset link has been sent." }; // Prevent enumeration
    }
    const token = crypto.randomBytes(32).toString('hex');
    this.resetTokens.set(token, email);
    console.log(`[Email Simulation] Reset password link for ${email}: http://localhost:3000/auth/reset-password?token=${token}`);
    return { message: "If an account exists, a reset link has been sent." };
  }

  async resetPassword(token: string, newPassword: string) {
    const email = this.resetTokens.get(token);
    if (!email) {
      throw new BadRequestException('Invalid or expired reset token');
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await this.prisma.user.update({
      where: { email },
      data: { password: hashedPassword }
    });
    this.resetTokens.delete(token);
    return { message: "Password updated successfully" };
  }

  // --- Google Auth Simulation ---
  async googleLogin(idToken: string, ipAddress?: string, deviceOs?: string) {
    // In production, use google-auth-library to verify idToken
    // const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
    // const ticket = await client.verifyIdToken({ idToken, audience: process.env.GOOGLE_CLIENT_ID });
    // const payload = ticket.getPayload();
    // For MVP, we will simulate decoding a token assuming the frontend sends a mock or we skip verification for demo
    
    // Simulating a payload
    const payload = { email: 'user@gmail.com', name: 'Google User', sub: '123456789' };
    
    let user = await this.prisma.user.findUnique({ where: { email: payload.email } });
    if (!user) {
      user = await this.prisma.$transaction(async (tx) => {
        const newUser = await tx.user.create({
          data: {
            email: payload.email,
            name: payload.name,
            googleId: payload.sub,
            isEmailVerified: true
          },
        });
        const company = await tx.company.create({ data: { name: 'My Company' } });
        const branch = await tx.branch.create({ data: { companyId: company.id, name: 'Head Office' } });
        await tx.companyUser.create({
          data: { userId: newUser.id, companyId: company.id, branchId: branch.id, role: 'COMPANY_OWNER' }
        });
        return newUser;
      });
    }

    const { password, twoFactorSecret, ...result } = user;
    return this.generateToken(result, ipAddress, deviceOs);
  }

  // --- 2FA Simulation ---
  async generateTwoFactorSecret(userId: string) {
    // In prod: return authenticator.generateSecret();
    const secret = 'JBSWY3DPEHPK3PXP'; 
    await this.prisma.user.update({
      where: { id: userId },
      data: { twoFactorSecret: secret }
    });
    return { secret, qrCodeUrl: `otpauth://totp/EkceroGSTERP?secret=${secret}` };
  }

  async turnOnTwoFactorAuth(userId: string, code: string) {
    // In prod: authenticator.verify({ token: code, secret: user.twoFactorSecret })
    if (code !== '123456') { // Simulated validation
      throw new BadRequestException('Invalid 2FA code');
    }
    await this.prisma.user.update({
      where: { id: userId },
      data: { twoFactorEnabled: true }
    });
    return { message: "2FA enabled successfully" };
  }
}
