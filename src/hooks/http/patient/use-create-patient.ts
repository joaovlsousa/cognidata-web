import { useMutation } from '@tanstack/react-query'
import { useGetPatientsFilters } from '@/hooks/use-get-patients-filters'
import {
  type CreatePatientRequest,
  createPatient,
} from '@/http/patient/create-patient'
import type { GetTotalOfPatientsResponse } from '@/http/patient/get-total-of-patients'
import { handleHttpError } from '../_errors/handle-http-error'

export function useCreatePatient() {
  const { filters } = useGetPatientsFilters()

  return useMutation({
    mutationFn: (payload: CreatePatientRequest) => createPatient(payload),
    onSuccess: (_data, _variables, _onMutateResult, context) => {
      context.client.invalidateQueries({
        queryKey: ['patients', filters],
      })

      context.client.setQueryData<GetTotalOfPatientsResponse>(
        ['patients', 'total'],
        (oldData) => {
          if (!oldData) {
            return oldData
          }

          return {
            totalOfPatients: oldData.totalOfPatients + 1,
            thisMonth: oldData.thisMonth + 1,
          }
        }
      )
    },
    onError: handleHttpError,
  })
}
