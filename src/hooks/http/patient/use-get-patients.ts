import { useSuspenseQuery } from '@tanstack/react-query'
import { useGetPatientsFilters } from '@/hooks/use-get-patients-filters'
import { getPatients } from '@/http/patient/get-patients'

export function useGetPatients() {
  const { filters } = useGetPatientsFilters()

  return useSuspenseQuery({
    queryKey: ['patients', filters],
    queryFn: () =>
      getPatients({
        ...filters,
        name: filters.name ?? undefined,
      }),
  })
}
