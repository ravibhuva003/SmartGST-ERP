'use client'

import { useActionState, useState } from 'react'
import Link from 'next/link'
import { ChevronLeft, Save } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { createItemAction } from '@/app/actions/items'

export default function NewItemPage() {
  const [state, formAction, isPending] = useActionState(createItemAction, null)
  const [type, setType] = useState('GOODS')

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/items">
          <Button variant="ghost" size="icon" className="rounded-full">
            <ChevronLeft className="size-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Add New Item</h1>
          <p className="text-sm text-slate-500">Create a product or service for your catalog.</p>
        </div>
      </div>

      <form action={formAction}>
        <input type="hidden" name="type" value={type} />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>Primary details about the item.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {state?.error && (
                  <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
                    {state.error}
                  </div>
                )}
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="sm:col-span-1 space-y-2">
                    <Label>Type</Label>
                    <Select value={type} onValueChange={(val) => setType(val || 'GOODS')}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="GOODS">Goods</SelectItem>
                        <SelectItem value="SERVICE">Service</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="sm:col-span-2 space-y-2">
                    <Label htmlFor="name">Item Name <span className="text-red-500">*</span></Label>
                    <Input 
                      id="name" name="name" 
                      required 
                      placeholder="e.g. Premium Office Chair" 
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <textarea 
                    id="description" name="description" 
                    className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Provide details about the item for your reference."
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Pricing & Tax</CardTitle>
                <CardDescription>Configure selling price, purchase price and GST rate.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="sellingPrice">Selling Price (₹) <span className="text-red-500">*</span></Label>
                    <Input 
                      id="sellingPrice" name="sellingPrice" type="number" step="0.01" min="0"
                      required 
                      placeholder="0.00" 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="purchasePrice">Purchase Price (₹)</Label>
                    <Input 
                      id="purchasePrice" name="purchasePrice" type="number" step="0.01" min="0"
                      placeholder="0.00" 
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="taxRate">GST Tax Rate (%) <span className="text-red-500">*</span></Label>
                    <Select name="taxRate" defaultValue="18">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0">0% (Exempt)</SelectItem>
                        <SelectItem value="0.1">0.1%</SelectItem>
                        <SelectItem value="0.25">0.25%</SelectItem>
                        <SelectItem value="3">3%</SelectItem>
                        <SelectItem value="5">5%</SelectItem>
                        <SelectItem value="12">12%</SelectItem>
                        <SelectItem value="18">18%</SelectItem>
                        <SelectItem value="28">28%</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="hsnCode">{type === 'GOODS' ? 'HSN Code' : 'SAC Code'}</Label>
                    <Input 
                      id="hsnCode" name="hsnCode" 
                      placeholder="e.g. 9403" 
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Inventory Tracking</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="unit">Unit of Measurement</Label>
                  <Select name="unit" defaultValue="PCS">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="PCS">Pieces (PCS)</SelectItem>
                      <SelectItem value="NOS">Numbers (NOS)</SelectItem>
                      <SelectItem value="KGS">Kilograms (KGS)</SelectItem>
                      <SelectItem value="LTR">Liters (LTR)</SelectItem>
                      <SelectItem value="MTR">Meters (MTR)</SelectItem>
                      <SelectItem value="BOX">Boxes (BOX)</SelectItem>
                      <SelectItem value="SRV">Services (SRV)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {type === 'GOODS' && (
                  <div className="space-y-2">
                    <Label htmlFor="openingStock">Opening Stock Quantity</Label>
                    <Input 
                      id="openingStock" name="openingStock" type="number" min="0"
                      placeholder="0" 
                    />
                    <p className="text-xs text-slate-500">
                      The initial quantity available in your inventory.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <Link href="/items">
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </Link>
          <Button type="submit" disabled={isPending} className="bg-indigo-600 hover:bg-indigo-700 text-white min-w-[120px]">
            <Save className="mr-2 size-4" /> {isPending ? 'Saving...' : 'Save Item'}
          </Button>
        </div>
      </form>
    </div>
  )
}
