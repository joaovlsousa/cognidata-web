import { Link } from '@tanstack/react-router'
import {
  AlertTriangleIcon,
  ClipboardCheckIcon,
  PlusIcon,
  UsersIcon,
} from 'lucide-react'
import { Card } from '@/components/ui/card'
import { MetadataCard } from './metadata-card'

const metadata = [
  {
    icon: UsersIcon,
    title: 'Pacientes ativos',
    value: 128,
    description: '+12 este mês',
  },
  {
    icon: ClipboardCheckIcon,
    title: 'Aplicações realizadas',
    value: 356,
    description: '+18 este mês',
  },
  {
    icon: AlertTriangleIcon,
    title: 'Sinais de atenção',
    value: 24,
    description: '+3 este mês',
  },
]

export function MetadataSection() {
  return (
    <section className="grid grid-cols-4 gap-6">
      <Link to="/patients/new" className="w-full">
        <Card className="w-full h-full shadow-md ring-primary">
          <div className="w-full h-full flex flex-col items-center justify-center gap-y-2">
            <PlusIcon className="size-5 text-primary" />

            <span className="text-base font-semibold text-primary">
              Novo paciente
            </span>
          </div>
        </Card>
      </Link>

      {metadata.map((meta) => (
        <MetadataCard key={meta.title} {...meta} />
      ))}
    </section>
  )
}
