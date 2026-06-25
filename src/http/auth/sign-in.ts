import { api } from '@/lib/axios'

export interface SignInRequest {
  email: string
  password: string
}

export interface SignInResponse {
  userRole: 'admin' | 'applicator'
}

export async function signIn(payload: SignInRequest): Promise<SignInResponse> {
  const response = await api.post<SignInResponse>('/auth', payload)

  return response.data
}
