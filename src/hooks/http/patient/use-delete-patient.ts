import { useMutation } from '@tanstack/react-query'
import { useGetPatientsFilters } from '@/hooks/use-get-patients-filters'
import {
  type DeletePatientRequest,
  deletePatient,
} from '@/http/patient/delete-patient'
import { handleHttpError } from '../_errors/handle-http-error'

export function useDeletePatient() {
  const { filters } = useGetPatientsFilters()

  return useMutation({
    mutationFn: (payload: DeletePatientRequest) => deletePatient(payload),
    onSuccess: (_data, variables, _onMutateResult, context) => {
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
