import { useLocation } from '@tanstack/react-router'
import { cn } from '@/lib/utils'
import { NavLink } from './nav-link'

const links = [
  {
    href: '/',
    label: 'Início',
  },
  {
    href: '/explore',
    label: 'Conheça a plataforma',
  },
  {
    href: '/operation',
    label: 'Como funciona',
  },
  {
    href: '/resources',
    label: 'Recursos',
  },
  {
    href: '/games',
    label: 'Jogos',
  },
  {
    href: '/contact',
    label: 'Contato',
  },
]

interface NavbarProps {
  showActiveTab?: boolean
  orientation?: 'horizontal' | 'vertical'
}

export function Navbar({
  orientation = 'horizontal',
  showActiveTab = true,
}: NavbarProps) {
  const { pathname } = useLocation()

  return (
    <nav
      className={cn(
        'flex items-center gap-x-4',
        orientation === 'vertical' && 'flex-col items-start'
      )}
    >
      {links.map((link) => (
        <NavLink
          key={link.href}
          href={link.href}
          label={link.label}
          isActive={showActiveTab && link.href === pathname}
        />
      ))}
    </nav>
  )
}
