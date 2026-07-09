import type { LucideIcon } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'

export interface MetadataCardProps {
  icon: LucideIcon
  title: string
  value: string | number
  description?: string
  color?: 'primary' | 'amber' | 'indigo'
}

export function MetadataCard({
  title,
  value,
  icon: Icon,
  description = '',
  color = 'primary',
}: MetadataCardProps) {
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

      <CardContent>
        <span className="text-2xl font-semibold">{value}</span>
        <p
          className={cn(
            'text-sm font-medium text-green-600',
            color === 'amber' && 'text-amber-500'
          )}
        >
          {description}
        </p>
      </CardContent>
    </Card>
  )
}
