'use client'

import { useActionState } from 'react'
import Link from 'next/link'
import { ChevronLeft, Save } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { createCustomerAction } from '@/app/actions/customers'

export default function NewCustomerPage() {
  const [state, formAction, isPending] = useActionState(createCustomerAction, null)

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/customers">
          <Button variant="ghost" size="icon" className="rounded-full">
            <ChevronLeft className="size-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Add New Customer</h1>
          <p className="text-sm text-slate-500">Create a new customer profile for billing.</p>
        </div>
      </div>

      <form action={formAction}>
        <Card>
          <CardHeader>
            <CardTitle>Customer Information</CardTitle>
            <CardDescription>Enter the primary details for this party.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {state?.error && (
              <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
                {state.error}
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="name">Business Name / Customer Name <span className="text-red-500">*</span></Label>
              <Input 
                id="name" name="name" 
                required 
                placeholder="e.g. Acme Corporation" 
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="gstin">GSTIN</Label>
                <Input 
                  id="gstin" name="gstin" 
                  placeholder="22AAAAA0000A1Z5" 
                  className="uppercase font-mono"
                  maxLength={15}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="stateCode">State Code</Label>
                <Input 
                  id="stateCode" name="stateCode" 
                  placeholder="e.g. 27 (Maharashtra)" 
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input 
                  id="email" name="email" type="email"
                  placeholder="billing@example.com" 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input 
                  id="phone" name="phone" type="tel"
                  placeholder="+91 9876543210" 
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Billing Address</Label>
              <textarea 
                id="address" name="address" 
                className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="123 Business Park, City, State, ZIP"
              />
            </div>

            <div className="pt-4 flex justify-end gap-3 border-t">
              <Link href="/customers">
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </Link>
              <Button type="submit" disabled={isPending} className="bg-indigo-600 hover:bg-indigo-700 text-white">
                <Save className="mr-2 size-4" /> {isPending ? 'Saving...' : 'Save Customer'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  )
}

