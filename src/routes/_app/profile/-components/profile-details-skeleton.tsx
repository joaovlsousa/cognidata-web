import { Skeleton } from '@/components/ui/skeleton'

export function ProfileDetailsSkeleton() {
  return (
    <div className="max-w-2/3 mx-auto space-y-10">
      <div className="grid place-items-center">
        <Skeleton className="size-32 rounded-full" />
      </div>

      <div className="space-y-7">
        <Skeleton className="w-full h-10" />

        <div className="flex items-center gap-7">
          <Skeleton className="flex-1 h-10" />
          <Skeleton className="w-1/4 h-10" />
        </div>

        <Skeleton className="w-1/3 h-10" />
      </div>
    </div>
  )
}
