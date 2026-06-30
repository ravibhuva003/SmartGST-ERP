import Link from 'next/link'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { Button } from '@/components/ui/button'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies()
  const token = cookieStore.get('access_token')

  if (!token) {
    redirect('/auth/login')
  }

  // NOTE: In a real implementation, verify the JWT has the 'SUPER_ADMIN' role.

  return (
    <div className="flex min-h-screen flex-col bg-gray-50 dark:bg-gray-900">
      <header className="flex h-16 items-center px-4 border-b bg-gray-900 text-white">
        <div className="text-xl font-bold mr-8">Ekcero GST Super Admin</div>
        <nav className="flex items-center space-x-4">
          <Link href="/admin" className="text-sm font-medium hover:text-gray-300">
            Overview
          </Link>
          <Link href="/admin/users" className="text-sm font-medium hover:text-gray-300">
            Users
          </Link>
          <Link href="/admin/subscriptions" className="text-sm font-medium hover:text-gray-300">
            Subscriptions
          </Link>
        </nav>
        <div className="ml-auto">
          <Link href="/dashboard">
            <Button variant="secondary" size="sm">Back to User Dashboard</Button>
          </Link>
        </div>
      </header>
      <main className="flex-1 p-8 max-w-7xl mx-auto w-full">
        {children}
      </main>
    </div>
  )
}
