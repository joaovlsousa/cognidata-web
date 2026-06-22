import { Loader2Icon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface LoaderProps {
  className?: string
}

export function Loader({ className }: LoaderProps) {
  return <Loader2Icon className={cn('size-4 animate-spin', className)} />
}
