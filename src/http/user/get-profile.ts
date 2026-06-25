import { api } from '@/lib/axios'

export interface GetProfileResponse {
  user: {
    id: string
    role: 'admin' | 'applicator'
    name: string
    email: string
    crp: null
    isActive: boolean
    createdAt: Date
  }
}

export async function getProfile(): Promise<GetProfileResponse> {
  const response = await api.get<GetProfileResponse>('/users/profile')

  return response.data
}
