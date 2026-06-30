import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'

// Register standard fonts
(pdfMake as any).vfs = (pdfFonts as any).pdfMake.vfs

export const generateInvoicePDF = (invoice: any, company: any) => {
  const customer = invoice.customer || {}

  const documentDefinition: any = {
    content: [
      {
        columns: [
          {
            text: 'TAX INVOICE',
            fontSize: 24,
            bold: true,
            color: '#4F46E5', // Indigo 600
          },
          {
            text: [
              { text: `${company.name || 'Ekcero GST ERP'}\n`, bold: true, fontSize: 14 },
              `${company.address || '123 Business Avenue, City, State'}\n`,
              `GSTIN: ${company.gstin || '27AAXXXX1234A1Z5'}\n`,
              `Email: ${company.email || 'billing@example.com'}\n`
            ],
            alignment: 'right',
            fontSize: 10,
          }
        ]
      },
      { canvas: [{ type: 'line', x1: 0, y1: 15, x2: 515, y2: 15, lineWidth: 1, lineColor: '#E2E8F0' }] },
      { text: '', margin: [0, 10] }, // Spacer
      {
        columns: [
          {
            text: [
              { text: 'Billed To:\n', bold: true, color: '#64748B' },
              { text: `${customer.name || 'Walk-in Customer'}\n`, bold: true },
              `${customer.address || ''}\n`,
              `GSTIN: ${customer.gstin || 'URD'}\n`,
              `State Code: ${customer.stateCode || ''}`
            ],
            fontSize: 10,
          },
          {
            text: [
              { text: 'Invoice Details:\n', bold: true, color: '#64748B' },
              { text: 'Invoice No: ', bold: true }, `${invoice.invoiceNumber}\n`,
              { text: 'Invoice Date: ', bold: true }, `${new Date(invoice.issueDate).toLocaleDateString()}\n`,
            ],
            alignment: 'right',
            fontSize: 10,
          }
        ]
      },
      { text: '', margin: [0, 10] }, // Spacer
      
      // Items Table
      {
        table: {
          headerRows: 1,
          widths: ['*', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto'],
          body: [
            // Table Header
            [
              { text: 'Item Description', bold: true, fillColor: '#F8FAFC', color: '#64748B', fontSize: 10, border: [false, true, false, true] },
              { text: 'HSN/SAC', bold: true, fillColor: '#F8FAFC', color: '#64748B', fontSize: 10, border: [false, true, false, true] },
              { text: 'Qty', bold: true, fillColor: '#F8FAFC', color: '#64748B', fontSize: 10, alignment: 'right', border: [false, true, false, true] },
              { text: 'Rate', bold: true, fillColor: '#F8FAFC', color: '#64748B', fontSize: 10, alignment: 'right', border: [false, true, false, true] },
              { text: 'Amount', bold: true, fillColor: '#F8FAFC', color: '#64748B', fontSize: 10, alignment: 'right', border: [false, true, false, true] },
              { text: 'CGST', bold: true, fillColor: '#F8FAFC', color: '#64748B', fontSize: 10, alignment: 'right', border: [false, true, false, true] },
              { text: 'SGST', bold: true, fillColor: '#F8FAFC', color: '#64748B', fontSize: 10, alignment: 'right', border: [false, true, false, true] },
            ],
            // Map Invoice Items
            ...(invoice.items || []).map((item: any) => [
              { text: item.description, fontSize: 10, border: [false, false, false, true], borderColor: ['#E2E8F0', '#E2E8F0', '#E2E8F0', '#E2E8F0'] },
              { text: item.item?.hsnCode || '-', fontSize: 10, border: [false, false, false, true], borderColor: ['#E2E8F0', '#E2E8F0', '#E2E8F0', '#E2E8F0'] },
              { text: item.quantity, fontSize: 10, alignment: 'right', border: [false, false, false, true], borderColor: ['#E2E8F0', '#E2E8F0', '#E2E8F0', '#E2E8F0'] },
              { text: Number(item.unitPrice).toFixed(2), fontSize: 10, alignment: 'right', border: [false, false, false, true], borderColor: ['#E2E8F0', '#E2E8F0', '#E2E8F0', '#E2E8F0'] },
              { text: (item.quantity * item.unitPrice).toFixed(2), fontSize: 10, alignment: 'right', border: [false, false, false, true], borderColor: ['#E2E8F0', '#E2E8F0', '#E2E8F0', '#E2E8F0'] },
              { text: (Number(item.taxAmount) / 2).toFixed(2), fontSize: 10, alignment: 'right', border: [false, false, false, true], borderColor: ['#E2E8F0', '#E2E8F0', '#E2E8F0', '#E2E8F0'] },
              { text: (Number(item.taxAmount) / 2).toFixed(2), fontSize: 10, alignment: 'right', border: [false, false, false, true], borderColor: ['#E2E8F0', '#E2E8F0', '#E2E8F0', '#E2E8F0'] },
            ])
          ]
        },
        layout: {
          defaultBorder: false,
        }
      },
      
      { text: '', margin: [0, 10] }, // Spacer

      // Totals
      {
        columns: [
          {
            text: [
              { text: 'Bank Details:\n', bold: true, fontSize: 10, color: '#64748B' },
              { text: `Bank Name: ${company.bankName || 'HDFC Bank'}\n`, fontSize: 10 },
              { text: `A/C No: ${company.accountNo || 'XXXXXXXX1234'}\n`, fontSize: 10 },
              { text: `IFSC Code: ${company.ifsc || 'HDFC0001234'}\n`, fontSize: 10 }
            ],
            width: '*'
          },
          {
            table: {
              widths: ['*', 'auto'],
              body: [
                [{ text: 'Subtotal:', fontSize: 10, border: [false, false, false, false] }, { text: `Rs. ${Number(invoice.subTotal).toFixed(2)}`, fontSize: 10, alignment: 'right', border: [false, false, false, false] }],
                [{ text: 'Total Tax:', fontSize: 10, border: [false, false, false, false] }, { text: `Rs. ${Number(invoice.taxTotal).toFixed(2)}`, fontSize: 10, alignment: 'right', border: [false, false, false, false] }],
                [{ text: 'Grand Total:', bold: true, fontSize: 12, border: [false, true, false, false] }, { text: `Rs. ${Number(invoice.grandTotal).toFixed(2)}`, bold: true, fontSize: 12, alignment: 'right', border: [false, true, false, false] }]
              ]
            },
            width: 200,
            layout: {
              hLineWidth: function (i: number, node: any) { return (i === 2) ? 1 : 0; },
              vLineWidth: function (i: number, node: any) { return 0; },
              hLineColor: function (i: number, node: any) { return '#E2E8F0'; },
            }
          }
        ]
      },

      { text: '', margin: [0, 30] }, // Spacer

      // Footer Signatures
      {
        columns: [
          { text: 'Customer Signatory\n(Accepted By)', fontSize: 10, alignment: 'center', margin: [0, 40, 0, 0] },
          { text: `For ${company.name || 'Ekcero GST ERP'}\n\n\nAuthorized Signatory`, fontSize: 10, alignment: 'center', bold: true }
        ]
      },
      
      {
        text: 'This is a computer generated invoice.',
        fontSize: 8,
        color: '#94A3B8',
        alignment: 'center',
        margin: [0, 40, 0, 0]
      }
    ],
    defaultStyle: {
      font: 'Roboto'
    }
  }

  pdfMake.createPdf(documentDefinition).download(`Invoice_${invoice.invoiceNumber}.pdf`)
}
