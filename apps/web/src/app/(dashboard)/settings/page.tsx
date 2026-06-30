'use client'

import { useState } from 'react'
import { Save, UploadCloud } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function SettingsPage() {
  const [formData, setFormData] = useState({
    name: 'Ekcero Infotech',
    pan: 'ABCDE1234F',
    gstin: '27ABCDE1234F1Z5',
    email: 'contact@ekcero.com',
    phone: '+91 9876543210',
    address: '123 Tech Park, Mumbai, Maharashtra 400001',
    website: 'https://ekcero.com'
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // API Call to PATCH /companies/:id
    console.log('Updating company profile:', formData)
    alert('Company profile updated successfully!')
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-slate-500">Manage your company profile, tax details, and branding.</p>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="general">General Profile</TabsTrigger>
          <TabsTrigger value="tax">Tax & Legal</TabsTrigger>
          <TabsTrigger value="branding">Branding</TabsTrigger>
          <TabsTrigger value="branches">Branches</TabsTrigger>
          <TabsTrigger value="team">Team Management</TabsTrigger>
        </TabsList>

        <form onSubmit={handleSubmit}>
          {/* GENERAL TAB */}
          <TabsContent value="general" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Company Details</CardTitle>
                <CardDescription>This information will be displayed on your invoices.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Company Name <span className="text-red-500">*</span></Label>
                  <Input id="name" name="name" required value={formData.name} onChange={handleChange} />
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Contact Email</Label>
                    <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Contact Phone</Label>
                    <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input id="website" name="website" type="url" value={formData.website} onChange={handleChange} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Registered Address</Label>
                  <textarea 
                    id="address" name="address" 
                    value={formData.address} onChange={handleChange} 
                    className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* TAX TAB */}
          <TabsContent value="tax" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Tax & Legal Details</CardTitle>
                <CardDescription>Crucial for GST compliance and invoice generation.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="gstin">GSTIN <span className="text-red-500">*</span></Label>
                    <Input id="gstin" name="gstin" required value={formData.gstin} onChange={handleChange} className="uppercase font-mono" maxLength={15} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pan">PAN Number</Label>
                    <Input id="pan" name="pan" value={formData.pan} onChange={handleChange} className="uppercase font-mono" maxLength={10} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* BRANDING TAB */}
          <TabsContent value="branding" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Company Logo</CardTitle>
                <CardDescription>Upload a logo to brand your invoices.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center justify-center p-12 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-900">
                  <div className="size-16 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-4">
                    <UploadCloud className="size-8" />
                  </div>
                  <h3 className="font-medium text-lg">Click to upload logo</h3>
                  <p className="text-sm text-slate-500 mt-1">SVG, PNG, JPG or GIF (max. 2MB)</p>
                  
                  {/* Non-functional mock upload button */}
                  <Button type="button" variant="outline" className="mt-6">Select File</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* BRANCHES TAB */}
          <TabsContent value="branches" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Branches & Locations</CardTitle>
                <CardDescription>Manage your company's offices, warehouses, and GSTIN branches.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold">Registered Branches</h3>
                  <Button type="button" variant="outline" size="sm">+ Add Branch</Button>
                </div>
                <div className="border border-slate-200 dark:border-slate-800 rounded-lg overflow-hidden">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
                      <tr>
                        <th className="px-4 py-3 font-medium">Branch Name</th>
                        <th className="px-4 py-3 font-medium">GSTIN</th>
                        <th className="px-4 py-3 font-medium">State Code</th>
                        <th className="px-4 py-3 font-medium text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-slate-200 dark:border-slate-800">
                        <td className="px-4 py-3 font-medium">Head Office</td>
                        <td className="px-4 py-3 text-slate-500">27ABCDE1234F1Z5</td>
                        <td className="px-4 py-3 text-slate-500">27</td>
                        <td className="px-4 py-3 text-right">
                          <Button type="button" variant="ghost" size="sm">Edit</Button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* TEAM TAB */}
          <TabsContent value="team" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Team Management</CardTitle>
                <CardDescription>Invite members to your company and assign roles.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold">Active Members</h3>
                  <Button type="button" variant="outline" size="sm">+ Invite Member</Button>
                </div>
                <div className="border border-slate-200 dark:border-slate-800 rounded-lg overflow-hidden">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
                      <tr>
                        <th className="px-4 py-3 font-medium">Name</th>
                        <th className="px-4 py-3 font-medium">Email</th>
                        <th className="px-4 py-3 font-medium">Role</th>
                        <th className="px-4 py-3 font-medium">Branch Access</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-slate-200 dark:border-slate-800">
                        <td className="px-4 py-3 font-medium">John Doe (You)</td>
                        <td className="px-4 py-3 text-slate-500">contact@ekcero.com</td>
                        <td className="px-4 py-3">
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400">
                            Company Owner
                          </span>
                        </td>
                        <td className="px-4 py-3 text-slate-500">All Branches</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Save Button */}
          <div className="mt-6 flex justify-end">
            <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white min-w-[150px]">
              <Save className="mr-2 size-4" /> Save Changes
            </Button>
          </div>
        </form>
      </Tabs>
    </div>
  )
}
