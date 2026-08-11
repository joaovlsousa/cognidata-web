import { api } from '@/lib/axios'

export interface ResetPasswordRequest {
  email: string
  password: string
}

export async function resetPassword(
  payload: ResetPasswordRequest
): Promise<void> {
  await api.post('/auth/reset-password', payload)
}
