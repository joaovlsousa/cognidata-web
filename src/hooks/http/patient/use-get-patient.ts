import { useSuspenseQuery } from '@tanstack/react-query'
import { type GetPatientRequest, getPatient } from '@/http/patient/get-patient'

export function useGetPatient(params: GetPatientRequest) {
  return useSuspenseQuery({
    queryKey: ['patients', params.patientId],
    queryFn: () => getPatient(params),
  })
}
