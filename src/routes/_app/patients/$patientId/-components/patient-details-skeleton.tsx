import { Skeleton } from '@/components/ui/skeleton'

export function PatientDetailsSkeleton() {
  return (
    <section className="space-y-10">
      <div className="flex items-center justify-between">
        <Skeleton className="h-10 w-2/4" />

        <Skeleton className="h-10 w-1/4" />
      </div>

      <div className="grid grid-cols-3 gap-6">
        <Skeleton className="h-64" />
        <Skeleton className="h-64" />
        <Skeleton className="h-64" />
      </div>

      <Skeleton className="h-48" />
    </section>
  )
}
