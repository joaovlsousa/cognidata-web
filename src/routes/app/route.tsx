import { createFileRoute } from '@tanstack/react-router'
import { useEffect } from 'react'
import { useSignOut } from '@/hooks/http/auth/use-sign-out'
import { useGetProfile } from '@/hooks/http/user/use-get-profile'
import { useAuth } from '@/hooks/use-auth'

export const Route = createFileRoute('/app')({
  component: RouteComponent,
})

function RouteComponent() {
  const { user } = useAuth()
  const signOutMutation = useSignOut()
  const { data, isLoading } = useGetProfile()

  useEffect(() => {
    if (!user.isAuthenticated) {
      signOutMutation.mutate()
    }
  }, [user, signOutMutation])

  return (
    <div>
      <pre>{JSON.stringify(user, null, 2)}</pre>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      {isLoading && <p>carregando...</p>}
      <button type="button" onClick={() => signOutMutation.mutateAsync()}>
        sair
      </button>
    </div>
  )
}
