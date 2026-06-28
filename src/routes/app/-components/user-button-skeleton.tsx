import { Skeleton } from '@/components/ui/skeleton'

export function UserButtonSkeleton() {
  return (
    <div className="w-full flex items-center gap-x-2">
      <Skeleton className="size-10 shrink-0 rounded-full" />
      <Skeleton className="w-full h-9" />
    </div>
  )
}
