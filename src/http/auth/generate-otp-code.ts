import { api } from '@/lib/axios'

export interface GenerateOtpCodeRequest {
  email: string
}

export async function generateOtpCode(
  payload: GenerateOtpCodeRequest
): Promise<void> {
  await api.post('/auth/otp-code/generate', payload)
}
