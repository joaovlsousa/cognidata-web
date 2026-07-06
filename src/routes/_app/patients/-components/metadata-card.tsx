import type { LucideIcon } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface MetadataCardProps {
  icon: LucideIcon
  title: string
  description?: string
  value: string | number
}

export function MetadataCard({
  title,
  value,
  description = '',
  icon: Icon,
}: MetadataCardProps) {
  return (
    <Card className="w-full gap-3 shadow-md">
      <CardHeader className="gap-3">
        <div className="size-10 grid place-items-center rounded-md ring ring-primary bg-primary/10">
          <Icon className="size-6 text-primary" />
        </div>
        <CardTitle className="text-base">{title}</CardTitle>
      </CardHeader>

      <CardContent>
        <span className="text-2xl font-semibold">{value}</span>
        <p className="text-sm font-medium text-primary">{description}</p>
      </CardContent>
    </Card>
  )
}
