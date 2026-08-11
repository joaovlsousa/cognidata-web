import { useMutation } from '@tanstack/react-query'
import { useAuth } from '@/hooks/use-auth'
import { type SignInRequest, signIn } from '@/http/auth/sign-in'
import { handleHttpError } from '../_errors/handle-http-error'

export function useSignIn() {
  const { saveToken } = useAuth()

  return useMutation({
    mutationFn: (payload: SignInRequest) => signIn(payload),
    onSuccess: ({ token }) => {
      saveToken(token)
    },
    onError: handleHttpError,
  })
}
