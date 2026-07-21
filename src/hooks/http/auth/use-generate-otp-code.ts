import { useMutation } from '@tanstack/react-query'
import {
  type GenerateOtpCodeRequest,
  generateOtpCode,
} from '@/http/auth/generate-otp-code'
import { handleHttpError } from '../_errors/handle-http-error'

export function useGenerateOtpCode() {
  return useMutation({
    mutationFn: (payload: GenerateOtpCodeRequest) => generateOtpCode(payload),
    onError: handleHttpError,
  })
}
