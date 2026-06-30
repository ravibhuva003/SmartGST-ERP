'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function NewInvoicePage() {
  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Create Invoice</h1>
        <Button variant="outline">Cancel</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Invoice Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Invoice Number</Label>
                  <Input placeholder="INV-2023-001" />
                </div>
                <div className="space-y-2">
                  <Label>Date</Label>
                  <Input type="date" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Items</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Item List Header */}
                <div className="grid grid-cols-12 gap-4 font-semibold text-sm border-b pb-2">
                  <div className="col-span-5">Item</div>
                  <div className="col-span-2 text-right">Qty</div>
                  <div className="col-span-2 text-right">Rate</div>
                  <div className="col-span-3 text-right">Amount</div>
                </div>
                
                {/* Mock Item Row */}
                <div className="grid grid-cols-12 gap-4 items-center">
                  <div className="col-span-5">
                    <Input placeholder="Search Item..." />
                  </div>
                  <div className="col-span-2">
                    <Input type="number" placeholder="1" className="text-right" />
                  </div>
                  <div className="col-span-2">
                    <Input type="number" placeholder="0.00" className="text-right" />
                  </div>
                  <div className="col-span-3">
                    <div className="text-right font-medium py-2">₹0.00</div>
                  </div>
                </div>

                <Button variant="outline" className="w-full mt-4">Add Item</Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Customer</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Select Customer</Label>
                <Input placeholder="Search Customer..." />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹0.00</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>CGST</span>
                <span>₹0.00</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>SGST</span>
                <span>₹0.00</span>
              </div>
              <div className="flex justify-between font-bold text-lg pt-4 border-t mt-4">
                <span>Total</span>
                <span>₹0.00</span>
              </div>
              <Button className="w-full mt-6">Save Invoice</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
