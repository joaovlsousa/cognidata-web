import { api } from '@/lib/axios'

export interface SignInRequest {
  email: string
  password: string
}

export async function signIn(payload: SignInRequest): Promise<void> {
  await api.post('/auth', payload)
}
