import { useSuspenseQuery } from '@tanstack/react-query'
import { getPatients } from '@/http/patient/get-patients'

export function useGetPatients() {
  return useSuspenseQuery({
    queryKey: ['patients'],
    queryFn: getPatients,
  })
}
