import { useMutation } from '@tanstack/react-query'
import { useGetPatientsFilters } from '@/hooks/use-get-patients-filters'
import {
  type EditPatientRequest,
  editPatient,
} from '@/http/patient/edit-patient'
import { handleHttpError } from '../_errors/handle-http-error'

export function useEditPatient() {
  const { filters } = useGetPatientsFilters()

  return useMutation({
    mutationFn: (payload: EditPatientRequest) => editPatient(payload),
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
