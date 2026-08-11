import { Link } from '@tanstack/react-router'
import { CheckCircleIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function ForgotPasswordStepSuccess() {
  return (
    <div className="flex flex-col items-center justify-center gap-y-3">
      <CheckCircleIcon
        className="size-6 text-primary animate-bounce"
        aria-hidden="true"
      />

      <div className="text-center">
        <h2 className="text-lg font-semibold">Senha redefinida</h2>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Sua senha foi alterada com sucesso! <br /> Você já pode entrar com a
          nova senha.
        </p>
      </div>

      <Link to="/sign-in">
        <Button size="lg" className="px-10">
          Fazer login
        </Button>
      </Link>
    </div>
  )
}
