import { useMutation } from '@tanstack/react-query'
import { type SignInRequest, signIn } from '@/http/auth/sign-in'
import { handleHttpError } from '../_errors/handle-http-error'

export function useSignIn() {
  return useMutation({
    mutationFn: (payload: SignInRequest) => signIn(payload),
    onError: handleHttpError,
  })
}
