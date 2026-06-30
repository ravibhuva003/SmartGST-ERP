'use client'

import { useActionState } from 'react'
import { registerAction } from '@/app/actions/auth'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function RegisterPage() {
  const [state, formAction, isPending] = useActionState(registerAction, null)

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md"
      >
        <Card className="w-full border-none shadow-xl shadow-slate-200/50 dark:shadow-slate-900/50">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-3xl font-bold tracking-tight">Create an account</CardTitle>
            <CardDescription>Enter your details below to create your account</CardDescription>
          </CardHeader>
          <CardContent>
            <form action={formAction} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" name="name" placeholder="John Doe" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="companyName">Company Name</Label>
                <Input id="companyName" name="companyName" placeholder="Acme Inc." required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" placeholder="m@example.com" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
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
                    Creating account...
                  </>
                ) : 'Sign up'}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4 bg-slate-50/50 dark:bg-slate-900/50 mt-4 rounded-b-xl py-6 border-t border-slate-100 dark:border-slate-800">
            <div className="text-sm text-center text-gray-500">
              Already have an account?{' '}
              <Link href="/auth/login" className="text-primary font-semibold hover:underline">
                Login
              </Link>
            </div>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  )
}
