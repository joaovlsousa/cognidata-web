import { useMutation } from '@tanstack/react-query'
import { isSameMonth } from 'date-fns'
import { useGetPatientsFilters } from '@/hooks/use-get-patients-filters'
import {
  type DeletePatientRequest,
  deletePatient,
} from '@/http/patient/delete-patient'
import type { GetPatientsResponse } from '@/http/patient/get-patients'
import type { GetTotalOfPatientsResponse } from '@/http/patient/get-total-of-patients'
import { handleHttpError } from '../_errors/handle-http-error'

export function useDeletePatient() {
  const { filters } = useGetPatientsFilters()

  return useMutation({
    mutationFn: (payload: DeletePatientRequest) => deletePatient(payload),
    onSuccess: (_data, variables, _onMutateResult, context) => {
      context.client.setQueryData<GetTotalOfPatientsResponse>(
        ['patients', 'total'],
        (oldData) => {
          if (!oldData) {
            return oldData
          }

          const patientsCache =
            context.client.getQueryData<GetPatientsResponse>([
              'patients',
              filters,
            ])

          const deletedPatient = patientsCache?.patients.find(
            (p) => p.id === variables.patientId
          )

          const wasCreatedThisMonth = deletedPatient
            ? isSameMonth(new Date(deletedPatient.createdAt), new Date())
            : false

          return {
            totalOfPatients: Math.max(0, oldData.totalOfPatients - 1),
            thisMonth: wasCreatedThisMonth
              ? Math.max(0, oldData.thisMonth - 1)
              : oldData.thisMonth,
          }
        }
      )

      context.client.invalidateQueries({
        queryKey: ['patients', filters],
      })

      context.client.invalidateQueries({
        queryKey: ['patients', variables.patientId],
      })
    },
    onError: handleHttpError,
  })
}
