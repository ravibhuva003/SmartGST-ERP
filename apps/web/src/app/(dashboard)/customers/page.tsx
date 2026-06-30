import Link from 'next/link'
import { Plus, Search, MoreHorizontal } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { fetchAPI } from '@/lib/api'

export default async function CustomersPage() {
  let customers = []
  
  try {
    customers = await fetchAPI('/customers', { cache: 'no-store' })
  } catch (error) {
    console.error('Failed to fetch customers:', error)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Customers</h1>
          <p className="text-slate-500">Manage your clients, their GSTINs, and contact details.</p>
        </div>
        <Link href="/customers/new">
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
            <Plus className="mr-2 size-4" /> Add Customer
          </Button>
        </Link>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
              <Input placeholder="Search customers..." className="pl-9" />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left border-collapse">
              <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 border-b">
                <tr>
                  <th className="p-4 font-medium">Customer Name</th>
                  <th className="p-4 font-medium">GSTIN</th>
                  <th className="p-4 font-medium">Email</th>
                  <th className="p-4 font-medium">Phone</th>
                  <th className="p-4 font-medium">State Code</th>
                  <th className="p-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {customers.map((customer: any) => (
                  <tr key={customer.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20">
                    <td className="p-4 font-medium text-slate-900 dark:text-white">{customer.name}</td>
                    <td className="p-4 font-mono text-xs">{customer.gstin || '-'}</td>
                    <td className="p-4">{customer.email || '-'}</td>
                    <td className="p-4">{customer.phone || '-'}</td>
                    <td className="p-4">
                      {customer.stateCode ? (
                        <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400 ring-1 ring-inset ring-indigo-700/10">
                          {customer.stateCode}
                        </span>
                      ) : '-'}
                    </td>
                    <td className="p-4 text-right">
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="size-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
                {customers.length === 0 && (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-slate-500">
                      No customers found. Click "Add Customer" to create one.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
