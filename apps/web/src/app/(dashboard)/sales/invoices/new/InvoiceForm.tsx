'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Plus, Trash2 } from 'lucide-react'
import { createInvoiceAction } from '@/app/actions/invoices'

export default function InvoiceForm({ customers, items: inventoryItems }: { customers: any[], items: any[] }) {
  const [items, setItems] = useState([{ id: 1, itemId: '', name: '', quantity: 1, rate: 0, cgst: 0, sgst: 0, igst: 0 }])
  const [customerId, setCustomerId] = useState('')
  const [invoiceNumber, setInvoiceNumber] = useState('')
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState('')

  const addItem = () => {
    setItems([...items, { id: Date.now(), itemId: '', name: '', quantity: 1, rate: 0, cgst: 0, sgst: 0, igst: 0 }])
  }

  const removeItem = (id: number) => {
    if (items.length > 1) {
      setItems(items.filter(item => item.id !== id))
    }
  }

  const updateItem = (id: number, field: string, value: any) => {
    setItems(items.map(item => {
      if (item.id === id) {
        const updatedItem = { ...item, [field]: value }
        
        // Find customer state code to determine tax split
        const customer = customers.find(c => c.id === customerId)
        const companyStateCode = '27' // Default mock for company
        const isInterState = customer && customer.stateCode && customer.stateCode !== companyStateCode
        
        // Auto-fill from inventory
        if (field === 'itemId') {
          const invItem = inventoryItems.find(i => i.id === value)
          if (invItem) {
            updatedItem.name = invItem.name
            updatedItem.rate = Number(invItem.price) || 0
            
            const qty = item.quantity
            const rt = updatedItem.rate
            const baseAmount = qty * rt
            const taxRate = Number(invItem.taxRate) || 18
            
            if (isInterState) {
              updatedItem.igst = Number((baseAmount * (taxRate / 100)).toFixed(2))
              updatedItem.cgst = 0
              updatedItem.sgst = 0
            } else {
              updatedItem.cgst = Number((baseAmount * (taxRate / 2) / 100).toFixed(2))
              updatedItem.sgst = Number((baseAmount * (taxRate / 2) / 100).toFixed(2))
              updatedItem.igst = 0
            }
          }
        }

        if (field === 'quantity' || field === 'rate') {
          const qty = field === 'quantity' ? Number(value) : item.quantity
          const rt = field === 'rate' ? Number(value) : item.rate
          const baseAmount = qty * rt
          
          const invItem = inventoryItems.find(i => i.id === item.itemId)
          const taxRate = invItem ? Number(invItem.taxRate) : 18
          
          if (isInterState) {
            updatedItem.igst = Number((baseAmount * (taxRate / 100)).toFixed(2))
            updatedItem.cgst = 0
            updatedItem.sgst = 0
          } else {
            updatedItem.cgst = Number((baseAmount * (taxRate / 2) / 100).toFixed(2))
            updatedItem.sgst = Number((baseAmount * (taxRate / 2) / 100).toFixed(2))
            updatedItem.igst = 0
          }
        }
        
        return updatedItem
      }
      return item
    }))
  }

  // Calculate Totals
  const subTotal = items.reduce((sum, item) => sum + (item.quantity * item.rate), 0)
  const totalTax = items.reduce((sum, item) => sum + item.cgst + item.sgst + item.igst, 0)
  const grandTotal = subTotal + totalTax

  const handleSave = async () => {
    if (!customerId) return setError('Customer is required')
    
    setIsPending(true)
    setError('')
    
    // Map items to NestJS expected format
    const invoiceItems = items.map(item => ({
      itemId: item.itemId || undefined,
      description: item.name,
      quantity: item.quantity,
      unitPrice: item.rate,
      taxRate: 18, // Simplified
      taxAmount: item.cgst + item.sgst + item.igst,
      totalAmount: (item.quantity * item.rate) + item.cgst + item.sgst + item.igst
    }))

    const payload = {
      customerId,
      invoiceNumber: invoiceNumber || undefined, // NestJS will auto-generate if missing
      issueDate: new Date(date).toISOString(),
      dueDate: new Date(date).toISOString(), // Same day for now
      subTotal,
      taxTotal: totalTax,
      grandTotal,
      items: invoiceItems
    }

    const res = await createInvoiceAction(payload)
    if (res?.error) {
      setError(res.error)
      setIsPending(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Create Sales Invoice</h1>
          <p className="text-slate-500">Generate a new GST compliant invoice.</p>
        </div>
        <Button onClick={handleSave} disabled={isPending} className="bg-indigo-600 hover:bg-indigo-700 text-white">
          {isPending ? 'Saving...' : 'Save Invoice'}
        </Button>
      </div>

      {error && (
        <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Customer Details</CardTitle>
            <CardDescription>Select a customer or add a new one.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="customer">Select Customer</Label>
              <select 
                id="customer"
                className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                value={customerId}
                onChange={(e) => setCustomerId(e.target.value)}
              >
                <option value="">-- Choose Customer --</option>
                {customers.map(c => (
                  <option key={c.id} value={c.id}>{c.name} (GSTIN: {c.gstin || 'N/A'})</option>
                ))}
              </select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Invoice Meta</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="invoiceNumber">Invoice Number</Label>
              <Input 
                id="invoiceNumber" 
                placeholder="Auto-generated if empty" 
                value={invoiceNumber}
                onChange={(e) => setInvoiceNumber(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="date">Invoice Date</Label>
              <Input 
                id="date" 
                type="date" 
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Line Items</CardTitle>
          <CardDescription>Add products or services to this invoice.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left border-collapse">
              <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 border-b">
                <tr>
                  <th className="p-3 font-medium">Select Item</th>
                  <th className="p-3 font-medium">Description</th>
                  <th className="p-3 font-medium w-24">Qty</th>
                  <th className="p-3 font-medium w-32">Rate (₹)</th>
                  <th className="p-3 font-medium w-32">Amount</th>
                  <th className="p-3 font-medium w-24">CGST</th>
                  <th className="p-3 font-medium w-24">SGST</th>
                  <th className="p-3 font-medium w-24">IGST</th>
                  <th className="p-3 font-medium w-12"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {items.map((item, index) => (
                  <tr key={item.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20">
                    <td className="p-2">
                      <select 
                        className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                        value={item.itemId}
                        onChange={(e) => updateItem(item.id, 'itemId', e.target.value)}
                      >
                        <option value="">-- Custom --</option>
                        {inventoryItems.map(inv => (
                          <option key={inv.id} value={inv.id}>{inv.name}</option>
                        ))}
                      </select>
                    </td>
                    <td className="p-2">
                      <Input 
                        placeholder="Item name / description" 
                        value={item.name}
                        onChange={(e) => updateItem(item.id, 'name', e.target.value)}
                      />
                    </td>
                    <td className="p-2">
                      <Input 
                        type="number" 
                        min="1" 
                        value={item.quantity}
                        onChange={(e) => updateItem(item.id, 'quantity', e.target.value)}
                      />
                    </td>
                    <td className="p-2">
                      <Input 
                        type="number" 
                        min="0" 
                        step="0.01"
                        value={item.rate}
                        onChange={(e) => updateItem(item.id, 'rate', e.target.value)}
                      />
                    </td>
                    <td className="p-3 font-medium text-slate-700 dark:text-slate-300">
                      ₹ {(item.quantity * item.rate).toFixed(2)}
                    </td>
                    <td className="p-2">
                      <Input 
                        type="number" 
                        min="0" 
                        step="0.01"
                        value={item.cgst}
                        onChange={(e) => updateItem(item.id, 'cgst', Number(e.target.value))}
                      />
                    </td>
                    <td className="p-2">
                      <Input 
                        type="number" 
                        min="0" 
                        step="0.01"
                        value={item.sgst}
                        onChange={(e) => updateItem(item.id, 'sgst', Number(e.target.value))}
                      />
                    </td>
                    <td className="p-2">
                      <Input 
                        type="number" 
                        min="0" 
                        step="0.01"
                        value={item.igst}
                        onChange={(e) => updateItem(item.id, 'igst', Number(e.target.value))}
                      />
                    </td>
                    <td className="p-2 text-center">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="text-red-500 hover:text-red-600 hover:bg-red-50"
                        onClick={() => removeItem(item.id)}
                        disabled={items.length === 1}
                      >
                        <Trash2 className="size-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="mt-4">
            <Button variant="outline" onClick={addItem} className="flex items-center gap-2">
              <Plus className="size-4" /> Add Line Item
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Totals Section */}
      <div className="flex justify-end">
        <Card className="w-full md:w-96 bg-slate-50 dark:bg-slate-900 border-none shadow-sm">
          <CardContent className="p-6">
            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-slate-500">
                <span>Subtotal</span>
                <span className="font-medium text-slate-900 dark:text-white">₹ {subTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Total Tax (GST)</span>
                <span className="font-medium text-slate-900 dark:text-white">₹ {totalTax.toFixed(2)}</span>
              </div>
              <div className="pt-3 border-t border-slate-200 dark:border-slate-700 flex justify-between items-center">
                <span className="font-bold text-lg">Grand Total</span>
                <span className="font-bold text-2xl text-indigo-600 dark:text-indigo-400">₹ {grandTotal.toFixed(2)}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

    </div>
  )
}
