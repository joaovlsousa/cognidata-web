import { api } from '@/lib/axios'

export interface SignInRequest {
  email: string
  password: string
}

export interface SignInResponse {
  token: string
}

export async function signIn(payload: SignInRequest): Promise<SignInResponse> {
  const response = await api.post<SignInResponse>('/auth', payload)

  return response.data
}
