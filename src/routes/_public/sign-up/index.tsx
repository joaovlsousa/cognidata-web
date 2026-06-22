import { createFileRoute, Link } from '@tanstack/react-router'
import { HospitalIcon, UserIcon } from 'lucide-react'
import { useState } from 'react'
import { Logo } from '@/components/logo'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { SignUpForm } from './-components/sign-up-form'
import { SuccessDialog } from './-components/success-dialog'

export const Route = createFileRoute('/_public/sign-up/')({
  component: RouteComponent,
})

function RouteComponent() {
  const [showSuccessDialog, setShowSuccessDialog] = useState(false)

  return (
    <section className="grid grid-cols-2 gap-x-10">
      {showSuccessDialog && <SuccessDialog />}

      <div className="space-y-6">
        <h2 className="text-5xl font-bold leading-tight">
          Solicite acesso a plataforma
        </h2>
        <p className="pr-16 font-medium text-muted-foreground leading-relaxed text-justify">
          O PsicoHub é uma plataforma para psicólogos e clinicas psicológicas
          que utilizam avaliações psicométricas e jogos educativos com
          embasamento cientifico, segurança e praticidade.
        </p>
        <h3 className="text-2xl font-bold">Quem pode solicitar acesso?</h3>

        <div className="grid grid-cols-2 gap-x-3">
          <Card>
            <CardHeader className="gap-3">
              <div className="size-10 grid place-items-center rounded-md ring ring-primary bg-primary/10">
                <UserIcon className="size-6 text-primary" />
              </div>
              <CardTitle className="text-lg">Psicólogos clínicos</CardTitle>
              <CardDescription>
                Profissionais que realizam avaliações e intervenções em seus
                atendimentos.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="gap-3">
              <div className="size-10 grid place-items-center rounded-md ring ring-primary bg-primary/10">
                <HospitalIcon className="size-6 text-primary" />
              </div>
              <CardTitle className="text-lg">Clínicas e consultórios</CardTitle>
              <CardDescription>
                Instituições que buscam mais eficiência e organização em seus
                processos.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>

      <Card>
        <CardHeader className="justify-center">
          <Logo />
        </CardHeader>
        <CardContent>
          <SignUpForm onSubmitSuccess={() => setShowSuccessDialog(true)} />
        </CardContent>
        <CardFooter className="justify-center">
          <p className="text-sm font-medium text-muted-foreground">
            Já possui uma conta?{' '}
            <Link to="/sign-in" className="text-primary">
              Entrar
            </Link>
          </p>
        </CardFooter>
      </Card>
    </section>
  )
}
