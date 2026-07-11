import { useMutation } from '@tanstack/react-query'
import {
  type DeletePatientRequest,
  deletePatient,
} from '@/http/patient/delete-patient'
import { handleHttpError } from '../_errors/handle-http-error'

export function useDeletePatient() {
  return useMutation({
    mutationFn: (payload: DeletePatientRequest) => deletePatient(payload),
    onSuccess: (_data, variables, _onMutateResult, context) => {
      context.client.invalidateQueries({
        queryKey: ['patients'],
        exact: true,
      })

      context.client.invalidateQueries({
        queryKey: ['patients', variables.patientId],
      })
    },
    onError: handleHttpError,
  })
}
