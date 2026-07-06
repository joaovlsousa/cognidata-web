import { Link, useLocation } from '@tanstack/react-router'
import { HomeIcon, UsersIcon } from 'lucide-react'
import { Suspense } from 'react'
import { Logo } from '@/components/logo'
import { Button } from '@/components/ui/button'
import { UserButton } from './user-button'
import { UserButtonSkeleton } from './user-button-skeleton'

const links = [
  {
    label: 'Visão geral',
    href: '/dashboard',
    icon: HomeIcon,
  },
  {
    label: 'Pacientes',
    href: '/patients',
    icon: UsersIcon,
  },
]

export function Sidebar() {
  const { pathname } = useLocation()

  return (
    <aside className="fixed inset-0 w-72 p-4 flex flex-col gap-y-10 justify-between border-r">
      <Logo />

      <nav className="flex-1 flex flex-col gap-y-2">
        {links.map((link) => (
          <Link key={link.href} to={link.href}>
            <Button
              variant={link.href === pathname ? 'default' : 'ghost'}
              size="lg"
              className="w-full justify-start gap-3"
            >
              <link.icon />
              <span>{link.label}</span>
            </Button>
          </Link>
        ))}
      </nav>

      <section className="h-16 grid grid-rows-1 place-items-center">
        <Suspense fallback={<UserButtonSkeleton />}>
          <UserButton />
        </Suspense>
      </section>
    </aside>
  )
}
