import { useMutation } from '@tanstack/react-query'
import {
  type VerifyOtpCodeRequest,
  verifyOtpCode,
} from '@/http/auth/verify-otp-code'
import { handleHttpError } from '../_errors/handle-http-error'

export function useVerifyOtpCode() {
  return useMutation({
    mutationFn: (payload: VerifyOtpCodeRequest) => verifyOtpCode(payload),
    onError: handleHttpError,
  })
}
