'use client'

import { useActionState } from 'react'
import { forgotPasswordAction } from '@/app/actions/auth'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

export default function ForgotPasswordPage() {
  const [state, formAction, isPending] = useActionState(forgotPasswordAction, null)

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md"
      >
        <Card className="w-full border-none shadow-xl shadow-slate-200/50 dark:shadow-slate-900/50 overflow-hidden">
          <CardHeader className="space-y-1 text-center bg-white dark:bg-slate-900 pb-8">
            <CardTitle className="text-3xl font-bold tracking-tight">Forgot Password</CardTitle>
            <CardDescription>Enter your email to receive a password reset link</CardDescription>
          </CardHeader>
          <CardContent className="pt-2">
            <AnimatePresence mode="wait">
              {state?.success ? (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="p-4 bg-green-50 text-green-700 rounded-lg text-sm text-center"
                >
                  {state.success}
                </motion.div>
              ) : (
                <motion.form 
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  action={formAction} 
                  className="space-y-4"
                >
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" name="email" type="email" placeholder="m@example.com" required />
                  </div>
                  {state?.error && (
                    <p className="text-sm font-medium text-red-500">{state.error}</p>
                  )}
                  <Button className="w-full" type="submit" disabled={isPending}>
                    {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                    {isPending ? 'Sending Link...' : 'Send Reset Link'}
                  </Button>
                </motion.form>
              )}
            </AnimatePresence>
          </CardContent>
          <CardFooter className="flex justify-center bg-slate-50/50 dark:bg-slate-900/50 py-6 border-t border-slate-100 dark:border-slate-800">
            <div className="text-sm text-center text-gray-500">
              Remember your password?{' '}
              <Link href="/auth/login" className="text-primary font-semibold hover:underline">
                Back to Login
              </Link>
            </div>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  )
}
