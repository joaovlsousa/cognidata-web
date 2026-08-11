import { api } from '@/lib/axios'

export interface VerifyOtpCodeRequest {
  email: string
  code: string
}

export async function verifyOtpCode(
  payload: VerifyOtpCodeRequest
): Promise<void> {
  await api.post('/auth/otp-code/verify', payload)
}
