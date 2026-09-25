import { AlertTriangleIcon, ClipboardCheckIcon, UsersIcon } from 'lucide-react'
import { Suspense } from 'react'
import { cn } from '@/lib/utils'
import {
  MetadataCardSkeleton,
  type MetadataCardSkeletonProps,
} from './metadata-card-skeleton'
import { TotalOfPatientsMetadataCard } from './total-of-patients-metadata-card'

type MetadataKeys = 'users' | 'applications' | 'alerts'

const metadata: Record<MetadataKeys, MetadataCardSkeletonProps> = {
  users: {
    icon: UsersIcon,
    title: 'Pacientes',
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

interface MetadataSectionProps {
  orientation?: 'vertical' | 'horizontal'
  className?: string
}

export function MetadataSection({
  orientation = 'horizontal',
  className,
}: MetadataSectionProps) {
  return (
    <section
      className={cn(
        'grid gap-10',
        orientation === 'vertical' ? 'grid-rows-3' : 'grid-cols-3',
        className
      )}
    >
      <Suspense fallback={<MetadataCardSkeleton {...metadata.users} />}>
        <TotalOfPatientsMetadataCard {...metadata.users} />
      </Suspense>

      <MetadataCardSkeleton {...metadata.alerts} />
      <MetadataCardSkeleton {...metadata.applications} />
    </section>
  )
}
