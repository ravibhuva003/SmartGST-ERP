'use client'

import { useActionState } from 'react'
import { loginAction, googleLoginAction } from '@/app/actions/auth'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(loginAction, null)

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md"
      >
        <Card className="w-full border-none shadow-xl shadow-slate-200/50 dark:shadow-slate-900/50">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-3xl font-bold tracking-tight">Ekcero GST ERP</CardTitle>
            <CardDescription>Enter your email below to login to your account</CardDescription>
          </CardHeader>
          <CardContent>
            <form action={formAction} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" placeholder="m@example.com" required />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link href="/auth/forgot-password" className="text-sm font-medium text-primary hover:underline transition-colors">
                    Forgot password?
                  </Link>
                </div>
                <Input id="password" name="password" type="password" required />
              </div>
              {state?.error && (
                <motion.p 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="text-sm font-medium text-red-500"
                >
                  {state.error}
                </motion.p>
              )}
              <Button className="w-full" type="submit" disabled={isPending}>
                {isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Logging in...
                  </>
                ) : 'Login'}
              </Button>
            </form>
            
            <div className="relative mt-6 mb-6">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-200 dark:border-gray-700" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white dark:bg-slate-900 px-2 text-gray-500 rounded-full">Or continue with</span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <form action={googleLoginAction}>
                <Button variant="outline" type="submit" className="w-full hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                  Google
                </Button>
              </form>
              <Link href="/auth/otp">
                <Button variant="outline" type="button" className="w-full hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                  Mobile OTP
                </Button>
              </Link>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4 bg-slate-50/50 dark:bg-slate-900/50 mt-4 rounded-b-xl py-6 border-t border-slate-100 dark:border-slate-800">
            <div className="text-sm text-center text-gray-500">
              Don't have an account?{' '}
              <Link href="/auth/register" className="text-primary font-semibold hover:underline">
                Sign up
              </Link>
            </div>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  )
}
