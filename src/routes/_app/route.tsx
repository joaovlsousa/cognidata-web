import { createFileRoute, Outlet, useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react'
import { useAuth } from '@/hooks/use-auth'
import { Sidebar } from './-components/sidebar'

export const Route = createFileRoute('/_app')({
  component: RouteComponent,
})

function RouteComponent() {
  const { token } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!token) {
      navigate({ to: '/sign-in' })
    }
  }, [token, navigate])

  return (
    <>
      <Sidebar />
      <div className="ml-72 w-full max-w-[calc(100%-18rem)]">
        <main className="max-w-5xl mx-auto py-6">
          <Outlet />
        </main>
      </div>
    </>
  )
}
