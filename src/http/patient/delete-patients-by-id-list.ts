import { api } from '@/lib/axios'

export interface DeletePatientsByIdListRequest {
  patientsIds: string[]
}

export async function deletePatientsByIdList(
  payload: DeletePatientsByIdListRequest
): Promise<void> {
  await api.delete('/patients', {
    data: payload,
  })
}
