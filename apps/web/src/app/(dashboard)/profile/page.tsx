import { cookies } from 'next/headers'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'

async function getUserProfile() {
  const cookieStore = await cookies()
  const token = cookieStore.get('access_token')?.value

  const res = await fetch(`${API_URL}/auth/me`, {
    headers: {
      Authorization: `Bearer ${token}`
    },
    // We want the most up-to-date profile
    cache: 'no-store'
  })

  if (!res.ok) {
    return null
  }

  return res.json()
}

export default async function ProfilePage() {
  const user = await getUserProfile()

  if (!user) {
    return (
      <div className="p-8 text-center text-red-500">
        Failed to load profile. Please log in again.
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">My Profile</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">
          Manage your account settings and preferences.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>Update your personal details here.</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" defaultValue={user.name || ''} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue={user.email || ''} disabled className="bg-slate-50 dark:bg-slate-900" />
                <p className="text-xs text-slate-500">Email cannot be changed directly.</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" type="tel" defaultValue={user.phone || ''} placeholder="Add phone number" />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 pt-6">
          <Button>Save Changes</Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Security</CardTitle>
          <CardDescription>Manage your password and security settings.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-slate-200 dark:border-slate-800 rounded-lg">
            <div>
              <p className="font-medium text-slate-900 dark:text-white">Two-Factor Authentication</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">Add an extra layer of security to your account.</p>
            </div>
            <Button variant="outline">Enable 2FA</Button>
          </div>
          <div className="flex items-center justify-between p-4 border border-slate-200 dark:border-slate-800 rounded-lg">
            <div>
              <p className="font-medium text-slate-900 dark:text-white">Password</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">Update your password regularly to keep your account secure.</p>
            </div>
            <Button variant="outline">Change Password</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
