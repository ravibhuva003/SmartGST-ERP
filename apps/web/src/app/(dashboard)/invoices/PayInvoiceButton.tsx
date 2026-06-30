'use client'

import { useState } from 'react'
import Script from 'next/script'
import { CreditCard } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { createPaymentOrderAction } from '@/app/actions/invoices'

export default function PayInvoiceButton({ invoice }: { invoice: any }) {
  const [isProcessing, setIsProcessing] = useState(false)
  const isPaid = invoice.status === 'PAID'

  const handlePayment = async () => {
    setIsProcessing(true)
    try {
      // 1. Create order on backend via Server Action
      const res = await createPaymentOrderAction(invoice.id)
      
      if (res.error) throw new Error(res.error)
      
      const { orderId, amount, currency, keyId } = res

      // 2. Open Razorpay Checkout
      const options = {
        key: keyId,
        amount,
        currency,
        name: 'Ekcero GST ERP',
        description: `Payment for Invoice #${invoice.invoiceNumber}`,
        order_id: orderId,
        handler: function (response: any) {
          // Handled by Webhook, but we can optimistically reload or show success
          alert('Payment Successful! (Status will update via webhook)')
          window.location.reload()
        },
        prefill: {
          name: invoice.customer?.name || '',
          email: invoice.customer?.email || '',
        },
        theme: {
          color: '#4F46E5', // Indigo-600
        }
      }

      const rzp = new (window as any).Razorpay(options)
      rzp.on('payment.failed', function (response: any) {
        alert(`Payment Failed: ${response.error.description}`)
      })
      rzp.open()
    } catch (error: any) {
      alert(`Payment Initialization Failed: ${error.message}`)
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={handlePayment} 
        disabled={isPaid || isProcessing}
        title={isPaid ? "Already Paid" : "Pay Now"}
      >
        <CreditCard className={`size-4 ${isPaid ? 'text-emerald-500' : 'text-slate-500 hover:text-indigo-600'}`} />
      </Button>
    </>
  )
}
