import Link from 'next/link'
import { Plus, Search, MoreHorizontal } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'

const placeholderItems = [
  { id: '1', name: 'Premium Office Chair', hsnSac: '9403', price: 8500.00, taxRate: 18, stock: 45, category: 'Furniture' },
  { id: '2', name: 'Web Development Services', hsnSac: '9983', price: 50000.00, taxRate: 18, stock: 0, category: 'Services' },
  { id: '3', name: 'Ergonomic Keyboard', hsnSac: '8471', price: 3200.00, taxRate: 12, stock: 120, category: 'Electronics' },
]

export default function ItemsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Inventory Items</h1>
          <p className="text-slate-500">Manage your product catalog, pricing, and stock levels.</p>
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
            <Button variant="outline" size="sm">Manage Categories</Button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left border-collapse">
              <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 border-b">
                <tr>
                  <th className="p-4 font-medium">Item Name</th>
                  <th className="p-4 font-medium">Category</th>
                  <th className="p-4 font-medium">HSN / SAC</th>
                  <th className="p-4 font-medium text-right">Price (₹)</th>
                  <th className="p-4 font-medium text-right">Tax (%)</th>
                  <th className="p-4 font-medium text-right">Stock</th>
                  <th className="p-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {placeholderItems.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20">
                    <td className="p-4 font-medium text-slate-900 dark:text-white">{item.name}</td>
                    <td className="p-4 text-slate-500">{item.category}</td>
                    <td className="p-4 font-mono text-xs text-slate-500">{item.hsnSac}</td>
                    <td className="p-4 text-right font-medium">₹ {item.price.toFixed(2)}</td>
                    <td className="p-4 text-right">
                      <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                        {item.taxRate}%
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      {item.stock > 0 ? (
                         <span className="font-medium text-emerald-600 dark:text-emerald-400">{item.stock}</span>
                      ) : (
                         <span className="text-slate-400">-</span>
                      )}
                    </td>
                    <td className="p-4 text-right">
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="size-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
                {placeholderItems.length === 0 && (
                  <tr>
                    <td colSpan={7} className="p-8 text-center text-slate-500">
                      No items found. Click "Add Item" to create one.
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
