import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { fetchAPI } from '@/lib/api'

export default async function ReportsPage() {
  let gstr1 = null
  let gstr3b = null

  try {
    const month = new Date().getMonth() + 1
    const year = new Date().getFullYear()
    
    gstr1 = await fetchAPI(`/reports/gstr1?month=${month}&year=${year}`, { cache: 'no-store' })
    gstr3b = await fetchAPI(`/reports/gstr3b?month=${month}&year=${year}`, { cache: 'no-store' })
  } catch (error) {
    console.error('Failed to fetch reports:', error)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">GST Reports</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>GSTR-1 Report</CardTitle>
            <CardDescription>Details of outward supplies (Sales)</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {gstr1 ? (
              <div className="space-y-4">
                <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg space-y-2">
                  <h3 className="font-semibold text-slate-700 dark:text-slate-300">B2B Supplies</h3>
                  <div className="flex justify-between text-sm">
                    <span>Taxable Value:</span>
                    <span className="font-medium">₹ {Number(gstr1.summary.b2b.taxableValue).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Tax Amount:</span>
                    <span className="font-medium">₹ {Number(gstr1.summary.b2b.taxAmount).toLocaleString()}</span>
                  </div>
                </div>

                <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg space-y-2">
                  <h3 className="font-semibold text-slate-700 dark:text-slate-300">B2C Supplies</h3>
                  <div className="flex justify-between text-sm">
                    <span>Taxable Value:</span>
                    <span className="font-medium">₹ {Number(gstr1.summary.b2c.taxableValue).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Tax Amount:</span>
                    <span className="font-medium">₹ {Number(gstr1.summary.b2c.taxAmount).toLocaleString()}</span>
                  </div>
                </div>

                <div className="pt-4 border-t flex justify-end gap-3">
                  <Button variant="outline">Download Excel</Button>
                  <Button className="bg-indigo-600">Export JSON (GST Portal)</Button>
                </div>
              </div>
            ) : (
              <p className="text-sm text-slate-500">Failed to load GSTR-1</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>GSTR-3B Report</CardTitle>
            <CardDescription>Monthly self-declaration of summary GST returns</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {gstr3b ? (
              <div className="space-y-4">
                <div className="flex justify-between p-3 border-b text-sm">
                  <span className="text-slate-600 dark:text-slate-400">Total Tax Liability (Sales)</span>
                  <span className="font-medium text-amber-600">₹ {Number(gstr3b.liability.totalLiability).toLocaleString()}</span>
                </div>
                
                <div className="flex justify-between p-3 border-b text-sm">
                  <span className="text-slate-600 dark:text-slate-400">Total Eligible ITC (Purchases)</span>
                  <span className="font-medium text-emerald-600">- ₹ {Number(gstr3b.itc.totalItc).toLocaleString()}</span>
                </div>

                <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-lg">
                  <h3 className="font-semibold mb-2">Net Tax Payable</h3>
                  <div className="space-y-1 text-sm text-slate-600 dark:text-slate-400">
                    <div className="flex justify-between">
                      <span>CGST:</span>
                      <span>₹ {Number(gstr3b.netPayable.cgst).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>SGST:</span>
                      <span>₹ {Number(gstr3b.netPayable.sgst).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>IGST:</span>
                      <span>₹ {Number(gstr3b.netPayable.igst).toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center mt-4 pt-3 border-t border-slate-200 dark:border-slate-700">
                    <span className="font-bold">Total Cash Payable</span>
                    <span className="font-bold text-lg text-indigo-600">₹ {Number(gstr3b.netPayable.totalPayable).toLocaleString()}</span>
                  </div>
                </div>

                <div className="pt-2 flex justify-end gap-3">
                  <Button className="bg-indigo-600">File GSTR-3B</Button>
                </div>
              </div>
            ) : (
              <p className="text-sm text-slate-500">Failed to load GSTR-3B</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
