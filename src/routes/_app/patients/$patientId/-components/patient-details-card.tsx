import { Link, useParams } from '@tanstack/react-router'
import { EditIcon, type LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

interface PatientDetailsCardProps {
  icon: LucideIcon
  title: string
  description?: string
  children: ReactNode
}

export function PatientDetailsCard({
  title,
  description,
  children,
  icon: Icon,
}: PatientDetailsCardProps) {
  const { patientId } = useParams({ from: '/_app/patients/$patientId/' })

  return (
    <Card className="w-full shadow-md">
      <CardHeader className="gap-3">
        <div className="size-10 grid place-items-center rounded-md ring ring-primary bg-primary/10">
          <Icon className="size-6 text-primary" />
        </div>
        <CardTitle className="col-span-full text-lg">{title}</CardTitle>
        {description && (
          <CardDescription className="leading-relaxed">
            {description}
          </CardDescription>
        )}

        <CardAction>
          <Link to="/patients/$patientId/edit" params={{ patientId }}>
            <Button variant="secondary" size="sm">
              <EditIcon />
              <span>Editar</span>
            </Button>
          </Link>
        </CardAction>
      </CardHeader>

      <CardContent>{children}</CardContent>
    </Card>
  )
}
