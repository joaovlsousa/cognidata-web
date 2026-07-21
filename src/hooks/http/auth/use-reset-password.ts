import { useMutation } from '@tanstack/react-query'
import {
  type ResetPasswordRequest,
  resetPassword,
} from '@/http/auth/reset-password'
import { handleHttpError } from '../_errors/handle-http-error'

export function useResetPassword() {
  return useMutation({
    mutationFn: (payload: ResetPasswordRequest) => resetPassword(payload),
    onError: handleHttpError,
  })
}
