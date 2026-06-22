import { useMutation } from '@tanstack/react-query'
import { type SignUpRequest, signUp } from '@/http/applicator/sign-up'
import { handleHttpError } from '../errors/handle-http-error'

export function useSignUp() {
  return useMutation({
    mutationFn: (payload: SignUpRequest) => signUp(payload),
    onError: handleHttpError,
  })
}
