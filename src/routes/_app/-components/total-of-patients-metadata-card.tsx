import { useGetTotalOfGetPatients } from '@/hooks/http/patient/use-get-total-of-patients'
import { MetadataCard } from './metadata-card'
import type { MetadataCardSkeletonProps } from './metadata-card-skeleton'

export function TotalOfPatientsMetadataCard(props: MetadataCardSkeletonProps) {
  const { data } = useGetTotalOfGetPatients()

  return (
    <MetadataCard
      {...props}
      value={data.totalOfPatients}
      description={
        data.thisMonth > 0 ? `+${data.thisMonth} este mês` : undefined
      }
    />
  )
}
