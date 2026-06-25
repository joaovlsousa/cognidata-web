import { useMutation } from '@tanstack/react-query'
import cookies from 'js-cookie'
import { type SignInRequest, signIn } from '@/http/auth/sign-in'
import { handleHttpError } from '../_errors/handle-http-error'

export function useSignIn() {
  return useMutation({
    mutationFn: (payload: SignInRequest) => signIn(payload),
    onSuccess: (data) => {
      cookies.set('role', data.userRole, {
        path: '/',
        expires: 60 * 60 * 24 * 7, //7 days
      })
    },
    onError: handleHttpError,
  })
}
