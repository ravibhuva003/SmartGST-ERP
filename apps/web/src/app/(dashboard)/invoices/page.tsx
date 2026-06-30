import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import { fetchAPI } from '@/lib/api'
import DownloadInvoiceButton from './DownloadInvoiceButton'
import PayInvoiceButton from './PayInvoiceButton'

export default async function InvoicesPage() {
  let invoices = []

  try {
    invoices = await fetchAPI('/invoices', { cache: 'no-store' })
  } catch (error) {
    console.error('Failed to fetch invoices:', error)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Invoices</h1>
        <Link href="/sales/invoices/new">
          <Button>Create Invoice</Button>
        </Link>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Recent Invoices</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left border-collapse">
              <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 border-b border-t">
                <tr>
                  <th className="p-4 font-medium">Invoice #</th>
                  <th className="p-4 font-medium">Type</th>
                  <th className="p-4 font-medium">Customer/Vendor</th>
                  <th className="p-4 font-medium">Date</th>
                  <th className="p-4 font-medium text-right">Amount</th>
                  <th className="p-4 font-medium text-right">Status</th>
                  <th className="p-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {invoices.map((inv: any) => (
                  <tr key={inv.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20">
                    <td className="p-4 font-medium text-indigo-600 dark:text-indigo-400">{inv.invoiceNumber}</td>
                    <td className="p-4">
                      <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                        {inv.type.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="p-4">{inv.type === 'PURCHASE_INVOICE' ? (inv.vendor?.name || 'Unknown Vendor') : (inv.customer?.name || 'Unknown Customer')}</td>
                    <td className="p-4 text-slate-500">{new Date(inv.issueDate).toLocaleDateString()}</td>
                    <td className="p-4 text-right font-medium">₹ {Number(inv.grandTotal).toLocaleString()}</td>
                    <td className="p-4 text-right">
                      <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium ring-1 ring-inset ${
                        inv.status === 'PAID' 
                          ? 'bg-emerald-50 text-emerald-700 ring-emerald-600/20 dark:bg-emerald-500/10 dark:text-emerald-400' 
                          : 'bg-amber-50 text-amber-700 ring-amber-600/20 dark:bg-amber-500/10 dark:text-amber-400'
                      }`}>
                        {inv.status}
                      </span>
                    </td>
                    <td className="p-4 text-right flex justify-end gap-2">
                      <PayInvoiceButton invoice={inv} />
                      <DownloadInvoiceButton invoice={inv} />
                    </td>
                  </tr>
                ))}
                {invoices.length === 0 && (
                  <tr>
                    <td colSpan={6} className="p-10 text-center text-slate-500">
                      No invoices generated yet. Click "Create Invoice" to make your first GST Bill!
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

