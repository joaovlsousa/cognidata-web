import type { LucideIcon } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface PatientCardDetailsProps {
  icon: LucideIcon
  title: string
  details: {
    title: string
    description: string
  }[]
}

export function PatientCardDetails({
  title,
  details,
  icon: Icon,
}: PatientCardDetailsProps) {
  return (
    <Card className="w-full shadow-md">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="size-8 grid place-items-center rounded-md ring ring-primary bg-primary/10">
            <Icon className="size-5 text-primary" />
          </div>
          <CardTitle className="text-xl">{title}</CardTitle>
        </div>
      </CardHeader>

      <CardContent>
        <div className="flex flex-wrap items-center gap-x-20 gap-y-8">
          {details.map((detail) => (
            <div key={detail.title} className="space-y-1">
              <h4 className="text-sm text-muted-foreground">{detail.title}</h4>
              <p className="text-base font-medium">{detail.description}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
