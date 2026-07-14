import { QueryClientProvider } from '@tanstack/react-query'
import { createRootRoute, Outlet } from '@tanstack/react-router'
import { NuqsAdapter } from 'nuqs/adapters/tanstack-router'
import { Toaster } from 'sonner'
import { queryClient } from '@/lib/query-client'

const RootLayout = () => (
  <QueryClientProvider client={queryClient}>
    <NuqsAdapter>
      <div className="min-h-full flex flex-col antialiased">
        <Outlet />
      </div>

      <Toaster richColors />
    </NuqsAdapter>
  </QueryClientProvider>
)

export const Route = createRootRoute({ component: RootLayout })
