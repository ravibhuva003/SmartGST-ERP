import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function ItemsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Inventory Items</h1>
        <Button>Add Item</Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Items Directory</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center text-gray-500 py-10">
            No items found. Add your first product or service to get started!
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
