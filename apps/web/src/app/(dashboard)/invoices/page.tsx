import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'

export default function InvoicesPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Invoices</h1>
        <Link href="/invoices/new">
          <Button>Create Invoice</Button>
        </Link>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Recent Invoices</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center text-gray-500 py-10">
            No invoices generated yet. Click "Create Invoice" to make your first GST Bill!
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
