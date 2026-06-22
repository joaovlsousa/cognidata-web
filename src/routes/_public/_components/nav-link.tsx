import { Link } from '@tanstack/react-router'
import { cn } from '@/lib/utils'

interface NavLinkProps {
  isActive: boolean
  href: string
  label: string
}

export function NavLink({ href, isActive, label }: NavLinkProps) {
  return (
    <Link to={href} className="relative px-2">
      <span
        className={cn(
          'text-sm font-medium text-muted-foreground',
          'hover:text-primary',
          isActive && 'text-primary'
        )}
      >
        {label}
      </span>

      {isActive && (
        <div className="absolute -bottom-3 left-0 w-full h-0.5 px-2 rounded-full bg-primary" />
      )}
    </Link>
  )
}
