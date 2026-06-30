import Link from 'next/link'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { Button } from '@/components/ui/button'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies()
  const token = cookieStore.get('access_token')

  if (!token) {
    redirect('/auth/login')
  }

  return (
    <div className="flex min-h-screen flex-col md:flex-row bg-gray-50 dark:bg-gray-900">
      <aside className="w-full md:w-64 bg-white dark:bg-gray-800 border-r dark:border-gray-700 flex flex-col">
        <div className="p-4 border-b dark:border-gray-700">
          <h2 className="text-xl font-bold tracking-tight text-primary">SmartGST ERP</h2>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Link href="/dashboard" className="block px-4 py-2 text-sm font-medium rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">
            Dashboard
          </Link>
          <Link href="/customers" className="block px-4 py-2 text-sm font-medium rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">
            Customers
          </Link>
          <Link href="/items" className="block px-4 py-2 text-sm font-medium rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">
            Items (Inventory)
          </Link>
          <Link href="/invoices" className="block px-4 py-2 text-sm font-medium rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">
            Invoices
          </Link>
        </nav>
        <div className="p-4 border-t dark:border-gray-700">
          <form action="/actions/auth/logoutAction" method="POST">
             <Button variant="outline" className="w-full justify-start">Logout</Button>
          </form>
        </div>
      </aside>
      <main className="flex-1 p-6">
        {children}
      </main>
    </div>
  )
}
