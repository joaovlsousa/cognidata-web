import { Suspense } from 'react'
import { Logo } from '@/components/logo'
import { UserButton } from './user-button'
import { UserButtonSkeleton } from './user-button-skeleton'

export function Sidebar() {
  return (
    <aside className="fixed inset-0 w-72 p-4 flex flex-col gap-y-6 justify-between border-r">
      <Logo />

      <section className="flex-1 bg-primary"></section>

      <section className="h-16 grid grid-rows-1 place-items-center">
        <Suspense fallback={<UserButtonSkeleton />}>
          <UserButton />
        </Suspense>
      </section>
    </aside>
  )
}
