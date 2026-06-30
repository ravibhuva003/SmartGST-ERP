import Link from 'next/link'
import { Plus, Search, MoreHorizontal, Package } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { fetchAPI } from '@/lib/api'

export default async function ItemsPage() {
  let items = []

  try {
    items = await fetchAPI('/items', { cache: 'no-store' })
  } catch (error) {
    console.error('Failed to fetch items:', error)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Inventory Items</h1>
          <p className="text-slate-500">Manage your products, services, and HSN/SAC codes.</p>
        </div>
        <Link href="/items/new">
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
            <Plus className="mr-2 size-4" /> Add Item
          </Button>
        </Link>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
              <Input placeholder="Search items..." className="pl-9" />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left border-collapse">
              <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 border-b">
                <tr>
                  <th className="p-4 font-medium">Item Name</th>
                  <th className="p-4 font-medium">HSN/SAC</th>
                  <th className="p-4 font-medium text-right">Price</th>
                  <th className="p-4 font-medium">Tax Bracket</th>
                  <th className="p-4 font-medium text-center">Stock</th>
                  <th className="p-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {items.map((item: any) => (
                  <tr key={item.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-md">
                          <Package className="size-4 text-slate-500" />
                        </div>
                        <div>
                          <div className="font-medium text-slate-900 dark:text-white">{item.name}</div>
                          {item.barcode && <div className="text-xs text-slate-500">Barcode: {item.barcode}</div>}
                        </div>
                      </div>
                    </td>
                    <td className="p-4 font-mono text-xs">{item.hsnSac || '-'}</td>
                    <td className="p-4 text-right font-medium">₹{Number(item.price).toLocaleString()}</td>
                    <td className="p-4">
                      <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                        GST {item.taxRate}%
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium ${
                        item.stock > 10 
                          ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' 
                          : 'bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                      }`}>
                        {item.stock} Units
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="size-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
                {items.length === 0 && (
                  <tr>
                    <td colSpan={7} className="p-8 text-center text-slate-500">
                      No items found. Click "Add Item" to create your first product or service.
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
