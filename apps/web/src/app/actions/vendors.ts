'use server'

import { fetchAPI } from '@/lib/api'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createVendorAction(prevState: any, formData: FormData) {
  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const phone = formData.get('phone') as string
  const gstin = formData.get('gstin') as string
  const stateCode = formData.get('stateCode') as string
  const address = formData.get('address') as string

  try {
    const userCompanies = await fetchAPI('/companies')
    
    if (!userCompanies || userCompanies.length === 0) {
      return { error: 'No company found for this user.' }
    }
    
    const companyId = userCompanies[0].companyId

    await fetchAPI('/vendors', {
      method: 'POST',
      body: JSON.stringify({
        companyId,
        name,
        email,
        phone,
        gstin,
        stateCode,
        address
      })
    })

  } catch (error: any) {
    return { error: error.message || 'Failed to create vendor' }
  }

  revalidatePath('/vendors')
  redirect('/vendors')
}
