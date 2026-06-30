'use server'

import { fetchAPI } from '@/lib/api'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createInvoiceAction(payload: any) {
  try {
    const userCompanies = await fetchAPI('/companies')
    
    if (!userCompanies || userCompanies.length === 0) {
      return { error: 'No company found for this user.' }
    }
    
    const companyId = userCompanies[0].companyId

    await fetchAPI('/invoices', {
      method: 'POST',
      body: JSON.stringify({
        ...payload,
        companyId,
      })
    })

  } catch (error: any) {
    return { error: error.message || 'Failed to create invoice' }
  }

  revalidatePath('/invoices')
  redirect('/invoices')
}

export async function createPaymentOrderAction(invoiceId: string) {
  try {
    const res = await fetchAPI('/payments/create-order', {
      method: 'POST',
      body: JSON.stringify({ invoiceId })
    });
    return res;
  } catch (error: any) {
    return { error: error.message || 'Payment initiation failed' };
  }
}

