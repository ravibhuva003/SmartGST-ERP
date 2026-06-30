'use client'

import { useActionState, useState } from 'react'
import { sendOtpAction, verifyOtpAction } from '@/app/actions/auth'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function OtpLoginPage() {
  const [sendState, sendFormAction, isSending] = useActionState(sendOtpAction, null)
  const [verifyState, verifyFormAction, isVerifying] = useActionState(verifyOtpAction, null)

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-3xl font-bold tracking-tight">OTP Login</CardTitle>
          <CardDescription>
            {sendState?.success ? 'Enter the OTP sent to your phone' : 'Enter your phone number to receive an OTP'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!sendState?.success ? (
            <form action={sendFormAction} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" name="phone" type="tel" placeholder="+91 9876543210" required />
              </div>
              {sendState?.error && (
                <p className="text-sm font-medium text-red-500">{sendState.error}</p>
              )}
              <Button className="w-full" type="submit" disabled={isSending}>
                {isSending ? 'Sending OTP...' : 'Send OTP'}
              </Button>
            </form>
          ) : (
            <form action={verifyFormAction} className="space-y-4">
              <input type="hidden" name="phone" value={sendState.phone} />
              <div className="space-y-2">
                <Label htmlFor="otp">One Time Password (Simulated: 123456)</Label>
                <Input id="otp" name="otp" type="text" placeholder="123456" required />
              </div>
              {verifyState?.error && (
                <p className="text-sm font-medium text-red-500">{verifyState.error}</p>
              )}
              <Button className="w-full" type="submit" disabled={isVerifying}>
                {isVerifying ? 'Verifying...' : 'Verify OTP & Login'}
              </Button>
            </form>
          )}
        </CardContent>
        <CardFooter className="flex justify-center">
          <div className="text-sm text-center text-gray-500">
            Prefer email?{' '}
            <Link href="/auth/login" className="text-primary font-semibold hover:underline">
              Back to Login
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
