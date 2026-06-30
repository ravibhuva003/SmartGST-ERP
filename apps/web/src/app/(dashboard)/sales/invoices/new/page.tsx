import { fetchAPI } from '@/lib/api'
import InvoiceForm from './InvoiceForm'

export default async function NewInvoicePage() {
  let customers = []
  let items = []

  try {
    customers = await fetchAPI('/customers', { cache: 'no-store' })
    items = await fetchAPI('/items', { cache: 'no-store' })
  } catch (error) {
    console.error('Failed to fetch data for invoice:', error)
  }

  return <InvoiceForm customers={customers} items={items} />
}
