import { Skeleton } from '@/components/ui/skeleton'

export function PatientDetailsSkeleton() {
  return (
    <section className="space-y-10">
      <div className="flex items-center justify-between">
        <Skeleton className="h-10 w-2/4" />

        <Skeleton className="h-10 w-1/4" />
      </div>

      <Skeleton className="h-48" />

      <div className="flex items-center gap-10">
        <Skeleton className="h-52 w-1/2" />
        <Skeleton className="h-52 w-1/2" />
      </div>

      <Skeleton className="h-48" />
    </section>
  )
}
