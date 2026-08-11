import { AlertTriangleIcon, ClipboardCheckIcon, UsersIcon } from 'lucide-react'
import { Suspense } from 'react'
import {
  MetadataCardSkeleton,
  type MetadataCardSkeletonProps,
} from './metadata-card-skeleton'
import { TotalOfPatientsMetadataCard } from './total-of-patients-metadata-card'

type MetadataKeys = 'users' | 'applications' | 'alerts'

const metadata: Record<MetadataKeys, MetadataCardSkeletonProps> = {
  users: {
    icon: UsersIcon,
    title: 'Pacientes ativos',
    color: 'primary',
  },
  applications: {
    icon: ClipboardCheckIcon,
    title: 'Aplicações realizadas',
    color: 'indigo',
  },
  alerts: {
    icon: AlertTriangleIcon,
    title: 'Sinais de atenção',
    color: 'amber',
  },
}

export function MetadataSection() {
  return (
    <section className="grid grid-cols-3 gap-10">
      <Suspense fallback={<MetadataCardSkeleton {...metadata.users} />}>
        <TotalOfPatientsMetadataCard {...metadata.users} />
      </Suspense>

      <MetadataCardSkeleton {...metadata.applications} />
      <MetadataCardSkeleton {...metadata.alerts} />
    </section>
  )
}
