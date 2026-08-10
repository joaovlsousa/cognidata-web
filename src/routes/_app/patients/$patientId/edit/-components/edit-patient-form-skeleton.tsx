import { Skeleton } from '@/components/ui/skeleton'

export function EditPatientFormSkeleton() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-48" />
      <Skeleton className="h-48" />
      <Skeleton className="h-48" />
    </div>
  )
}
