export class RegisterDto {
  email!: string;
  password!: string;
  name?: string;
  companyName!: string;
}

export class LoginDto {
  email!: string;
  password!: string;
}

export class SendOtpDto {
  phone!: string;
}

export class VerifyOtpDto {
  phone!: string;
  otp!: string;
}

export class GoogleLoginDto {
  token!: string;
}
