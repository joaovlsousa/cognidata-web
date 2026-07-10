import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { useAuth } from '@/hooks/use-auth'
import { handleHttpError } from '../_errors/handle-http-error'

export function useSignOut() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { clearToken } = useAuth()

  return useMutation({
    mutationFn: async () => {
      clearToken()
      queryClient.invalidateQueries({ queryKey: ['profile'] })
      navigate({ to: '/sign-in' })
    },
    onError: handleHttpError,
  })
}
