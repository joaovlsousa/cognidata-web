import { Link } from '@tanstack/react-router'
import { BrainIcon } from 'lucide-react'

export function Logo() {
  return (
    <Link to="/" className="w-fit flex items-center gap-x-1">
      <BrainIcon className="size-10 text-primary stroke-[1.75px]" />
      <div>
        <h1 className="text-2xl font-bold">
          Cogni<span className="text-primary">Data</span>
        </h1>
        <p className="-mt-1 text-xs text-muted-foreground font-medium">
          Plataforma Psicométrica
        </p>
      </div>
    </Link>
  )
}
