import { createFileRoute, Outlet } from '@tanstack/react-router'
import { Footer } from './_public/_components/footer'
import { Header } from './_public/_components/header'

export const Route = createFileRoute('/_public')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <Header />

      <div className="flex flex-col min-h-[calc(100vh-4.5rem)] mt-18 bg-linear-to-b from-primary/5">
        <main className="flex-1 w-full max-w-7xl mx-auto py-10">
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  )
}
