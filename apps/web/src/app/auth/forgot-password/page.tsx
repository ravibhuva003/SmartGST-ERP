'use client'

import { useActionState } from 'react'
import { forgotPasswordAction } from '@/app/actions/auth'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function ForgotPasswordPage() {
  const [state, formAction, isPending] = useActionState(forgotPasswordAction, null)

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-3xl font-bold tracking-tight">Forgot Password</CardTitle>
          <CardDescription>Enter your email to receive a password reset link</CardDescription>
        </CardHeader>
        <CardContent>
          {state?.success ? (
            <div className="p-4 bg-green-50 text-green-700 rounded-lg text-sm text-center">
              {state.success}
            </div>
          ) : (
            <form action={formAction} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" placeholder="m@example.com" required />
              </div>
              {state?.error && (
                <p className="text-sm font-medium text-red-500">{state.error}</p>
              )}
              <Button className="w-full" type="submit" disabled={isPending}>
                {isPending ? 'Sending Link...' : 'Send Reset Link'}
              </Button>
            </form>
          )}
        </CardContent>
        <CardFooter className="flex justify-center">
          <div className="text-sm text-center text-gray-500">
            Remember your password?{' '}
            <Link href="/auth/login" className="text-primary font-semibold hover:underline">
              Back to Login
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
