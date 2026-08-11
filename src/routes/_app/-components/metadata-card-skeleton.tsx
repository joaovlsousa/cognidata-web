import type { LucideIcon } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'

export interface MetadataCardSkeletonProps {
  icon: LucideIcon
  title: string
  color: 'primary' | 'amber' | 'indigo'
}

export function MetadataCardSkeleton({
  title,
  icon: Icon,
  color,
}: MetadataCardSkeletonProps) {
  const colors = {
    primary: {
      text: 'text-primary',
      ring: 'ring-primary',
      bg: 'bg-primary/10',
    },
    indigo: {
      text: 'text-indigo-500',
      ring: 'ring-indigo-500',
      bg: 'bg-indigo-500/10',
    },
    amber: {
      text: 'text-amber-500',
      ring: 'ring-amber-500',
      bg: 'bg-amber-500/10',
    },
  }

  return (
    <Card className="w-full gap-3 shadow-md">
      <CardHeader className="gap-3">
        <div
          className={cn(
            'size-10 grid place-items-center rounded-md ring',
            colors[color].bg,
            colors[color].ring
          )}
        >
          <Icon className={cn('size-6', colors[color].text)} />
        </div>
        <CardTitle className="text-base">{title}</CardTitle>
      </CardHeader>

      <CardContent className="space-y-2">
        <Skeleton className="w-1/2 p-4" />
        <Skeleton className="w-2/3 p-2.5" />
      </CardContent>
    </Card>
  )
}
