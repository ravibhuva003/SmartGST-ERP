import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">GST Reports</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>GSTR-1 Report</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Details of outward supplies of goods or services. Generate the JSON payload ready for the GST Portal.
            </p>
            <div className="flex space-x-4">
              <Button>Generate JSON</Button>
              <Button variant="outline">View Summary</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>GSTR-3B Report</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Monthly self-declaration of summary GST returns. Computes ITC and Net Tax Liability.
            </p>
            <div className="flex space-x-4">
              <Button>Generate Report</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
