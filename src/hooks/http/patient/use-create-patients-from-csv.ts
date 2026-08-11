import { useMutation } from '@tanstack/react-query'
import { useGetPatientsFilters } from '@/hooks/use-get-patients-filters'
import {
  type CreatePatientsFromCsvRequest,
  createPatientsFromCsv,
} from '@/http/patient/create-patients-from-csv'
import { handleHttpError } from '../_errors/handle-http-error'

export function useCreatePatientsFromCsv() {
  const { filters } = useGetPatientsFilters()

  return useMutation({
    mutationFn: (payload: CreatePatientsFromCsvRequest) =>
      createPatientsFromCsv(payload),
    onSuccess: (_data, _variables, _onMutateResult, context) => {
      context.client.invalidateQueries({
        queryKey: ['patients', filters],
      })

      context.client.invalidateQueries({
        queryKey: ['patients', 'total'],
      })
    },
    onError: handleHttpError,
  })
}
