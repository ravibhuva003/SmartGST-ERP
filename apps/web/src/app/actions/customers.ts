'use server'

import { fetchAPI } from '@/lib/api'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'

export async function createCustomerAction(prevState: any, formData: FormData) {
  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const phone = formData.get('phone') as string
  const gstin = formData.get('gstin') as string
  const stateCode = formData.get('stateCode') as string
  const address = formData.get('address') as string

  try {
    // We need companyId. For MVP, we assume the user's first company.
    // We can fetch the user's profile/companies first.
    const profile = await fetchAPI('/auth/profile')
    // Get companies for this user
    const userCompanies = await fetchAPI('/companies')
    
    if (!userCompanies || userCompanies.length === 0) {
      return { error: 'No company found for this user.' }
    }
    
    const companyId = userCompanies[0].companyId

    await fetchAPI('/customers', {
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
    return { error: error.message || 'Failed to create customer' }
  }

  revalidatePath('/customers')
  redirect('/customers')
}
