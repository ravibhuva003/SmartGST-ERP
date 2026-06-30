'use server'

import { fetchAPI } from '@/lib/api'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createItemAction(prevState: any, formData: FormData) {
  const type = formData.get('type') as string
  const name = formData.get('name') as string
  const description = formData.get('description') as string
  const hsnCode = formData.get('hsnCode') as string
  const unit = formData.get('unit') as string
  const taxRate = parseFloat(formData.get('taxRate') as string)
  const sellingPrice = parseFloat(formData.get('sellingPrice') as string)
  const purchasePrice = parseFloat(formData.get('purchasePrice') as string)
  const openingStock = parseInt(formData.get('openingStock') as string) || 0

  try {
    const userCompanies = await fetchAPI('/companies')
    
    if (!userCompanies || userCompanies.length === 0) {
      return { error: 'No company found for this user.' }
    }
    
    const companyId = userCompanies[0].companyId

    await fetchAPI('/items', {
      method: 'POST',
      body: JSON.stringify({
        companyId,
        name,
        hsnSac: hsnCode,
        taxRate,
        price: sellingPrice,
        stock: openingStock
      })
    })

  } catch (error: any) {
    return { error: error.message || 'Failed to create item' }
  }

  revalidatePath('/items')
  redirect('/items')
}
