import { Skeleton } from "@/components/ui/skeleton"

export default function AdminLoading() {
  return (
    <div className="space-y-6 animate-pulse p-8">
      <div className="flex items-center justify-between">
        <div>
          <Skeleton className="h-9 w-64 mb-2 bg-slate-200 dark:bg-slate-800" />
          <Skeleton className="h-5 w-48 bg-slate-200 dark:bg-slate-800" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Skeleton className="h-32 rounded-xl bg-slate-200 dark:bg-slate-800" />
        <Skeleton className="h-32 rounded-xl bg-slate-200 dark:bg-slate-800" />
        <Skeleton className="h-32 rounded-xl bg-slate-200 dark:bg-slate-800" />
        <Skeleton className="h-32 rounded-xl bg-slate-200 dark:bg-slate-800" />
      </div>

      <div className="space-y-4 mt-8">
        <Skeleton className="h-[400px] w-full rounded-xl bg-slate-200 dark:bg-slate-800" />
      </div>
    </div>
  )
}
