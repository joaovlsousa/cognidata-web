import { useMutation } from '@tanstack/react-query'
import {
  type EditPatientRequest,
  editPatient,
} from '@/http/patient/edit-patient'
import { handleHttpError } from '../_errors/handle-http-error'

export function useEditPatient() {
  return useMutation({
    mutationFn: (payload: EditPatientRequest) => editPatient(payload),
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
