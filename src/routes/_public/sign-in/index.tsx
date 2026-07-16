import { createFileRoute, Link } from '@tanstack/react-router'
import { FlaskConicalIcon, LockIcon, ShieldCheckIcon } from 'lucide-react'
import { Logo } from '@/components/logo'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { SignInForm } from './-components/sign-in-form'

export const Route = createFileRoute('/_public/sign-in/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <section className="grid grid-cols-2 gap-x-10">
      <div className="space-y-6">
        <h2 className="text-5xl font-bold leading-tight">
          Acesse sua conta no CogniDataHub
        </h2>
        <p className="pr-48 font-medium text-muted-foreground leading-relaxed text-justify">
          Faça login para gerenciar seus pacientes, aplicar avaliações,
          acompanhar resultados e indicadores com segurança e base cientifica.
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
          <SignInForm />
        </CardContent>
        <CardFooter className="justify-center">
          <p className="text-sm font-medium text-muted-foreground">
            Ainda não possui acesso?{' '}
            <Link to="/sign-up" className="text-primary">
              Solicitar acesso
            </Link>
          </p>
        </CardFooter>
      </Card>
    </section>
  )
}
