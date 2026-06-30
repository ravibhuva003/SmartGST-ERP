'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'

export async function loginAction(prevState: any, formData: FormData) {
  const email = formData.get('email')
  const password = formData.get('password')

  const res = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  })

  if (!res.ok) {
    const error = await res.json()
    return { error: error.message || 'Login failed' }
  }

  const data = await res.json()
  const cookieStore = await cookies()
  
  cookieStore.set('access_token', data.access_token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
  })

  redirect('/dashboard')
}

export async function registerAction(prevState: any, formData: FormData) {
  const name = formData.get('name')
  const email = formData.get('email')
  const password = formData.get('password')
  const companyName = formData.get('companyName')

  const res = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password, companyName }),
  })

  if (!res.ok) {
    const error = await res.json()
    return { error: error.message || 'Registration failed' }
  }

  const data = await res.json()
  const cookieStore = await cookies()
  
  cookieStore.set('access_token', data.access_token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
  })

  redirect('/dashboard')
}

export async function logoutAction() {
  const cookieStore = await cookies()
  cookieStore.delete('access_token')
  redirect('/auth/login')
}

export async function forgotPasswordAction(prevState: any, formData: FormData) {
  const email = formData.get('email')

  const res = await fetch(`${API_URL}/auth/forgot-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  })

  if (!res.ok) {
    const error = await res.json()
    return { error: error.message || 'Failed to send reset link' }
  }

  return { success: 'If an account exists, a reset link has been sent to your email.' }
}

export async function sendOtpAction(prevState: any, formData: FormData) {
  const phone = formData.get('phone')

  const res = await fetch(`${API_URL}/auth/otp/send`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ phone }),
  })

  if (!res.ok) {
    const error = await res.json()
    return { error: error.message || 'Failed to send OTP' }
  }

  return { success: true, phone: phone as string }
}

export async function verifyOtpAction(prevState: any, formData: FormData) {
  const phone = formData.get('phone')
  const otp = formData.get('otp')

  const res = await fetch(`${API_URL}/auth/otp/verify`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ phone, otp }),
  })

  if (!res.ok) {
    const error = await res.json()
    return { error: error.message || 'Invalid OTP' }
  }

  const data = await res.json()
  const cookieStore = await cookies()
  
  cookieStore.set('access_token', data.access_token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
  })

  redirect('/dashboard')
}

export async function googleLoginAction() {
  // Simulate Google Login by passing a mock idToken
  const res = await fetch(`${API_URL}/auth/google`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ idToken: 'mock_google_id_token' }),
  })

  if (!res.ok) {
    // Return error if failed, though redirecting is tricky from a form button without useActionState
    // We can just throw or redirect to an error page
    redirect('/auth/login?error=GoogleAuthFailed')
  }

  const data = await res.json()
  const cookieStore = await cookies()
  
  cookieStore.set('access_token', data.access_token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
  })

  redirect('/dashboard')
}
