import { useMutation } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import cookies from 'js-cookie'
import { signOut } from '@/http/auth/sign-out'
import { handleHttpError } from '../_errors/handle-http-error'

export function useSignOut() {
  const navigate = useNavigate()

  return useMutation({
    mutationFn: signOut,
    onSuccess: () => {
      cookies.remove('role', {
        path: '/',
      })

      navigate({ to: '/sign-in' })
    },
    onError: handleHttpError,
  })
}
