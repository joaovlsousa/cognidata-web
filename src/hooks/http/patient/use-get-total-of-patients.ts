import { useSuspenseQuery } from '@tanstack/react-query'
import { getTotalOfPatients } from '@/http/patient/get-total-of-patients'

export function useGetTotalOfGetPatients() {
  return useSuspenseQuery({
    queryKey: ['patients', 'total'],
    queryFn: () => getTotalOfPatients(),
  })
}
