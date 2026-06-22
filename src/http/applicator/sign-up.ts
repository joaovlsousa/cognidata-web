import { api } from '@/lib/axios'

export interface SignUpRequest {
  name: string
  email: string
  crp: string
  password: string
}

export async function signUp(payload: SignUpRequest): Promise<void> {
  await api.post('/users/applicator', payload)
}
