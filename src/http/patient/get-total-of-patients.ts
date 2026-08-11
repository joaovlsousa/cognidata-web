import { api } from '@/lib/axios'

export interface GetTotalOfPatientsResponse {
  totalOfPatients: number
  thisMonth: number
}

export async function getTotalOfPatients(): Promise<GetTotalOfPatientsResponse> {
  const response = await api.get<GetTotalOfPatientsResponse>('/patients/total')

  return response.data
}
