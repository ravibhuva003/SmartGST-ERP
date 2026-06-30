'use client'

import { Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { generateInvoicePDF } from '@/lib/pdfGenerator'

export default function DownloadInvoiceButton({ invoice }: { invoice: any }) {
  const handleDownload = () => {
    // We pass a mock company since we aren't fetching the full company profile in this query yet
    const company = {
      name: 'Ekcero GST ERP',
      address: '123 Tech Park, Mumbai, MH',
      gstin: '27ABCDE1234F1Z5',
      email: 'contact@Ekcero GST.com'
    }
    
    generateInvoicePDF(invoice, company)
  }

  return (
    <Button variant="ghost" size="icon" onClick={handleDownload} title="Download PDF">
      <Download className="size-4 text-indigo-600" />
    </Button>
  )
}
