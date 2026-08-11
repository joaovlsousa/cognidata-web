import { AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ForgotPasswordExpiredStateProps {
  title: string
  description: string
  onRestart: () => void
}

export function ForgotPasswordExpiredState({
  title,
  description,
  onRestart,
}: ForgotPasswordExpiredStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-y-3">
      <AlertCircle className="size-6 text-destructive" />

      <div className="text-center">
        <h2 className="text-lg font-bold">{title}</h2>

        <p className="text-sm text-muted-foreground">{description}</p>
      </div>

      <Button onClick={onRestart} size="lg" className="px-6">
        Solicitar novo código
      </Button>
    </div>
  )
}
