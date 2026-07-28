import { useMutation } from '@tanstack/react-query'
import {
  type CreatePatientsFromCsvRequest,
  createPatientsFromCsv,
} from '@/http/patient/create-patients-from-csv'
import { handleHttpError } from '../_errors/handle-http-error'

export function useCreatePatientsFromCsv() {
  return useMutation({
    mutationFn: (payload: CreatePatientsFromCsvRequest) =>
      createPatientsFromCsv(payload),
    onSuccess: (_data, _variables, _onMutateResult, context) => {
      context.client.invalidateQueries({
        queryKey: ['patients'],
        exact: true,
      })

      context.client.invalidateQueries({
        queryKey: ['patients', 'total'],
      })
    },
    onError: handleHttpError,
  })
}
