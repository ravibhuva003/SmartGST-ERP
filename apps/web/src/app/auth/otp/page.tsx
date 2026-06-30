'use client'

import { useActionState } from 'react'
import { sendOtpAction, verifyOtpAction } from '@/app/actions/auth'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

export default function OtpLoginPage() {
  const [sendState, sendFormAction, isSending] = useActionState(sendOtpAction, null)
  const [verifyState, verifyFormAction, isVerifying] = useActionState(verifyOtpAction, null)

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="w-full border-none shadow-xl shadow-slate-200/50 dark:shadow-slate-900/50 overflow-hidden">
          <CardHeader className="space-y-1 text-center bg-white dark:bg-slate-900 pb-8 relative z-10">
            <CardTitle className="text-3xl font-bold tracking-tight">OTP Login</CardTitle>
            <CardDescription>
              {sendState?.success ? 'Enter the OTP sent to your phone' : 'Enter your phone number to receive an OTP'}
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-2">
            <AnimatePresence mode="wait">
              {!sendState?.success ? (
                <motion.form 
                  key="send"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  action={sendFormAction} 
                  className="space-y-4"
                >
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" name="phone" type="tel" placeholder="+91 9876543210" required />
                  </div>
                  {sendState?.error && (
                    <p className="text-sm font-medium text-red-500">{sendState.error}</p>
                  )}
                  <Button className="w-full" type="submit" disabled={isSending}>
                    {isSending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                    {isSending ? 'Sending OTP...' : 'Send OTP'}
                  </Button>
                </motion.form>
              ) : (
                <motion.form 
                  key="verify"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  action={verifyFormAction} 
                  className="space-y-4"
                >
                  <input type="hidden" name="phone" value={sendState.phone} />
                  <div className="space-y-2">
                    <Label htmlFor="otp">One Time Password (Simulated: 123456)</Label>
                    <Input id="otp" name="otp" type="text" placeholder="123456" required />
                  </div>
                  {verifyState?.error && (
                    <p className="text-sm font-medium text-red-500">{verifyState.error}</p>
                  )}
                  <Button className="w-full" type="submit" disabled={isVerifying}>
                    {isVerifying ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                    {isVerifying ? 'Verifying...' : 'Verify OTP & Login'}
                  </Button>
                </motion.form>
              )}
            </AnimatePresence>
          </CardContent>
          <CardFooter className="flex justify-center bg-slate-50/50 dark:bg-slate-900/50 py-6 border-t border-slate-100 dark:border-slate-800">
            <div className="text-sm text-center text-gray-500">
              Prefer email?{' '}
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
