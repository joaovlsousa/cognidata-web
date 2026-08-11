import { HashIcon, LockIcon, type LucideIcon, MailIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { ForgotPasswordFlowStep } from '../../forgot-password/-types'

type VisibleSteps = Array<{
  key: ForgotPasswordFlowStep
  icon: LucideIcon
  label: string
}>

const visibleSteps: VisibleSteps = [
  {
    key: 'email',
    icon: MailIcon,
    label: 'Informar email',
  },
  {
    key: 'otp',
    icon: HashIcon,
    label: 'Verificar código',
  },
  {
    key: 'reset',
    icon: LockIcon,
    label: 'Nova senha',
  },
]

interface ForgotPasswordStepperProps {
  currentStep: ForgotPasswordFlowStep
}

export function ForgotPasswordStepper({
  currentStep,
}: ForgotPasswordStepperProps) {
  const currentIndex = visibleSteps.findIndex(
    (step) => step.key === currentStep
  )

  return (
    <div className="grid place-items-center">
      <div className="flex items-center gap-x-10">
        {visibleSteps.map((step, index) => (
          <div key={step.key} className="flex flex-col items-center gap-y-1">
            <step.icon
              className={cn(
                'size-5 text-muted-foreground',
                index <= currentIndex && 'text-primary',
                index === currentIndex && 'text-foreground'
              )}
            />

            <span
              className={cn(
                'text-xs text-center text-muted-foreground',
                index <= currentIndex && 'font-medium text-primary',
                index === currentIndex && 'font-medium text-foreground'
              )}
            >
              {step.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
