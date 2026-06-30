'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ChevronLeft, Save } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'

export default function NewItemPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: '',
    categoryId: '',
    hsnSac: '',
    barcode: '',
    price: '',
    taxRate: '18',
    stock: '0'
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // API Call to NestJS Backend goes here
    console.log('Saving item:', formData)
    
    alert('Item saved successfully!')
    router.push('/items')
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/items">
          <Button variant="ghost" size="icon" className="rounded-full">
            <ChevronLeft className="size-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Add New Item</h1>
          <p className="text-sm text-slate-500">Create a new product or service for your catalog.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Item Details</CardTitle>
            <CardDescription>Enter the primary details for this product or service.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            
            <div className="space-y-2">
              <Label htmlFor="name">Item Name <span className="text-red-500">*</span></Label>
              <Input 
                id="name" name="name" 
                required 
                value={formData.name} onChange={handleChange} 
                placeholder="e.g. Premium Office Chair" 
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="categoryId">Category</Label>
                <select 
                  id="categoryId" name="categoryId"
                  className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  value={formData.categoryId}
                  onChange={handleChange}
                >
                  <option value="">-- No Category --</option>
                  <option value="cat_1">Electronics</option>
                  <option value="cat_2">Furniture</option>
                  <option value="cat_3">Services</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="hsnSac">HSN / SAC Code</Label>
                <Input 
                  id="hsnSac" name="hsnSac" 
                  value={formData.hsnSac} onChange={handleChange} 
                  placeholder="e.g. 9403" 
                  className="font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price">Base Price (₹) <span className="text-red-500">*</span></Label>
                <Input 
                  id="price" name="price" type="number" min="0" step="0.01"
                  required
                  value={formData.price} onChange={handleChange} 
                  placeholder="0.00" 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="taxRate">Tax Rate (%) <span className="text-red-500">*</span></Label>
                <select 
                  id="taxRate" name="taxRate"
                  required
                  className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  value={formData.taxRate}
                  onChange={handleChange}
                >
                  <option value="0">0% (Exempt)</option>
                  <option value="5">5%</option>
                  <option value="12">12%</option>
                  <option value="18">18%</option>
                  <option value="28">28%</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="stock">Initial Stock</Label>
                <Input 
                  id="stock" name="stock" type="number" min="0"
                  value={formData.stock} onChange={handleChange} 
                  placeholder="0" 
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="barcode">Barcode / SKU (Optional)</Label>
              <Input 
                id="barcode" name="barcode" 
                value={formData.barcode} onChange={handleChange} 
                placeholder="Scan or type barcode..." 
              />
            </div>

            <div className="pt-4 flex justify-end gap-3 border-t">
              <Link href="/items">
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </Link>
              <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white">
                <Save className="mr-2 size-4" /> Save Item
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  )
}
