'use client'

import { useActionState } from 'react'
import Link from 'next/link'
import { ChevronLeft, Save } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { createVendorAction } from '@/app/actions/vendors'

export default function NewVendorPage() {
  const [state, formAction, isPending] = useActionState(createVendorAction, null)

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/vendors">
          <Button variant="ghost" size="icon" className="rounded-full">
            <ChevronLeft className="size-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Add New Vendor</h1>
          <p className="text-sm text-slate-500">Create a new supplier profile for purchase invoices.</p>
        </div>
      </div>

      <form action={formAction}>
        <Card>
          <CardHeader>
            <CardTitle>Vendor Information</CardTitle>
            <CardDescription>Enter the primary details for this supplier.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {state?.error && (
              <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
                {state.error}
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="name">Vendor Name <span className="text-red-500">*</span></Label>
              <Input 
                id="name" name="name" 
                required 
                placeholder="e.g. Global Tech Suppliers" 
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="gstin">GSTIN</Label>
                <Input 
                  id="gstin" name="gstin" 
                  placeholder="07AAAAA0000A1Z5" 
                  className="uppercase font-mono"
                  maxLength={15}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="stateCode">State Code</Label>
                <Input 
                  id="stateCode" name="stateCode" 
                  placeholder="e.g. 07 (Delhi)" 
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input 
                  id="email" name="email" type="email"
                  placeholder="sales@supplier.com" 
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
              <Label htmlFor="address">Registered Address</Label>
              <textarea 
                id="address" name="address" 
                className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="123 Industrial Estate, City, State, ZIP"
              />
            </div>

            <div className="pt-4 flex justify-end gap-3 border-t">
              <Link href="/vendors">
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </Link>
              <Button type="submit" disabled={isPending} className="bg-indigo-600 hover:bg-indigo-700 text-white">
                <Save className="mr-2 size-4" /> {isPending ? 'Saving...' : 'Save Vendor'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  )
}

