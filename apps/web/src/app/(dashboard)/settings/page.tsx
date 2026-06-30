'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'

export default function SettingsPage() {
  const [companies, setCompanies] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchCompanies() {
      try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'
        const res = await fetch(`${API_URL}/companies`, {
          // Add auth headers when implementing client fetching hook
        })
        if (res.ok) {
          const data = await res.json()
          setCompanies(data)
        }
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    
    // Stub for UI, real fetch requires Bearer token from cookies/context
    setLoading(false)
  }, [])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Company Settings</h1>
        <p className="text-muted-foreground">
          Manage your company details, branches, and team members.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Company Details</CardTitle>
            <CardDescription>Update your company's primary information.</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="companyName">Company Name</Label>
                <Input id="companyName" defaultValue="Ekcero Infotech" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="pan">PAN Number</Label>
                <Input id="pan" placeholder="ABCDE1234F" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Contact Email</Label>
                <Input id="email" type="email" placeholder="contact@company.com" />
              </div>
              <Button type="button">Save Changes</Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Branches</CardTitle>
            <CardDescription>Manage your store locations and branches.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="rounded-md border p-4 flex justify-between items-center">
                <div>
                  <h4 className="font-medium">Head Office</h4>
                  <p className="text-sm text-muted-foreground">Main HQ</p>
                </div>
                <Button variant="outline" size="sm">Edit</Button>
              </div>
              <Button variant="secondary" className="w-full">Add New Branch</Button>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Team & Access</CardTitle>
            <CardDescription>Invite members and assign roles across branches.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <div className="p-4 flex justify-between items-center border-b">
                <div>
                  <h4 className="font-medium">You</h4>
                  <p className="text-sm text-muted-foreground">COMPANY_OWNER</p>
                </div>
                <span className="text-sm text-green-600 bg-green-100 px-2 py-1 rounded">Active</span>
              </div>
              <div className="p-4">
                <Button variant="outline">Invite Team Member</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
