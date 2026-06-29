import type { LucideIcon } from 'lucide-react'
import type { PropsWithChildren } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

interface InfoCardProps extends PropsWithChildren {
  icon: LucideIcon
  title: string
  description: string
}

export function InfoCard({
  title,
  description,
  children,
  icon: Icon,
}: InfoCardProps) {
  return (
    <Card className="w-full shadow-md">
      <CardHeader className="gap-3">
        <div className="size-10 grid place-items-center rounded-md ring ring-primary bg-primary/10">
          <Icon className="size-6 text-primary" />
        </div>
        <CardTitle className="text-lg">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>

      {children && <CardContent>{children}</CardContent>}
    </Card>
  )
}
