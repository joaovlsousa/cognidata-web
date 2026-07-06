import { createFileRoute, Outlet } from '@tanstack/react-router'
import { useEffect } from 'react'
import { useSignOut } from '@/hooks/http/auth/use-sign-out'
import { useAuth } from '@/hooks/use-auth'
import { Sidebar } from './-components/sidebar'

export const Route = createFileRoute('/_app')({
  component: RouteComponent,
})

function RouteComponent() {
  const { user } = useAuth()
  const signOutMutation = useSignOut()

  useEffect(() => {
    if (!user.isAuthenticated) {
      signOutMutation.mutate()
    }
  }, [user, signOutMutation])

  return (
    <>
      <Sidebar />
      <div className="ml-72 w-full max-w-[calc(100%-18rem)]">
        <main className="max-w-5xl mx-auto bg-primary/20">
          <Outlet />
        </main>
      </div>
    </>
  )
}
