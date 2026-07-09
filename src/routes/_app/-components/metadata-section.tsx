import { AlertTriangleIcon, ClipboardCheckIcon, UsersIcon } from 'lucide-react'
import { MetadataCard, type MetadataCardProps } from './metadata-card'

const metadata: MetadataCardProps[] = [
  {
    icon: UsersIcon,
    title: 'Pacientes ativos',
    value: 128,
    description: '+12 este mês',
    color: 'primary',
  },
  {
    icon: ClipboardCheckIcon,
    title: 'Aplicações realizadas',
    value: 356,
    description: '+18 este mês',
    color: 'indigo',
  },
  {
    icon: AlertTriangleIcon,
    title: 'Sinais de atenção',
    value: 24,
    description: '+3 este mês',
    color: 'amber',
  },
]

export function MetadataSection() {
  return (
    <section className="grid grid-cols-3 gap-10">
      {metadata.map((meta) => (
        <MetadataCard key={meta.title} {...meta} />
      ))}
    </section>
  )
}
