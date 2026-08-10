import { useMutation } from '@tanstack/react-query'
import { useGetPatientsFilters } from '@/hooks/use-get-patients-filters'
import {
  type DeletePatientsByIdListRequest,
  deletePatientsByIdList,
} from '@/http/patient/delete-patients-by-id-list'
import { handleHttpError } from '../_errors/handle-http-error'

export function useDeletePatientsByIdList() {
  const { filters } = useGetPatientsFilters()

  return useMutation({
    mutationFn: (payload: DeletePatientsByIdListRequest) =>
      deletePatientsByIdList(payload),
    onSuccess: (_data, _variables, _onMutateResult, context) => {
      context.client.invalidateQueries({
        queryKey: ['patients', 'total'],
      })

      context.client.invalidateQueries({
        queryKey: ['patients', filters],
      })
    },
    onError: handleHttpError,
  })
}
