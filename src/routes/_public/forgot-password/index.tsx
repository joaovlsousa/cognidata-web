import { createFileRoute } from '@tanstack/react-router'
import { FlaskConicalIcon, LockIcon, ShieldCheckIcon } from 'lucide-react'
import { Logo } from '@/components/logo'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { ForgotPasswordForm } from './-components/forgot-password-form'

export const Route = createFileRoute('/_public/forgot-password/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <section className="grid grid-cols-2 gap-x-10">
      <div className="space-y-6">
        <h2 className="text-5xl font-bold leading-tight">
          Recupere seu acesso no CogniDataHub
        </h2>
        <p className="pr-48 font-medium text-muted-foreground leading-relaxed text-justify">
          Recupere seu acesso e faça login para gerenciar seus pacientes,
          aplicar avaliações, acompanhar resultados e indicadores com segurança
          e base cientifica.
        </p>

        <div className="flex items-center gap-x-6">
          <div className="flex items-center gap-x-1">
            <ShieldCheckIcon className="size-4 text-primary" />
            <p className="text-xs font-medium text-muted-foreground">
              Dados seguros
            </p>
          </div>
          <div className="flex items-center gap-x-1">
            <FlaskConicalIcon className="size-4 text-primary" />
            <p className="text-xs font-medium text-muted-foreground">
              Base científica
            </p>
          </div>
          <div className="flex items-center gap-x-1">
            <LockIcon className="size-4 text-primary" />
            <p className="text-xs font-medium text-muted-foreground">
              Conformidade com a LGPD
            </p>
          </div>
        </div>
      </div>

      <Card className="w-full max-w-lg mx-auto">
        <CardHeader className="justify-center">
          <Logo />
        </CardHeader>
        <CardContent>
          <ForgotPasswordForm />
        </CardContent>
      </Card>
    </section>
  )
}
