import { createFileRoute } from '@tanstack/react-router'
import {
  HeadsetIcon,
  MessageCircleQuestionMarkIcon,
  MonitorPlayIcon,
} from 'lucide-react'
import { Logo } from '@/components/logo'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { ContactForm } from './-components/contact-form'

export const Route = createFileRoute('/_public/contact/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <section className="grid grid-cols-2 gap-x-10">
      <div className="space-y-6">
        <h2 className="text-5xl font-bold leading-tight">
          Fale com a equipe do PsicoHub
        </h2>
        <p className="pr-16 font-medium text-muted-foreground leading-relaxed text-justify">
          Estamos aqui para apoiar psicólogos, clínicas e instituições com
          dúvidas, demonstrações, acesso à plataforma e parcerias. Conte com um
          atendimento próximo, ágil e consultivo.
        </p>
        <h3 className="text-2xl font-bold">Como podemos ajudar?</h3>

        <div className="grid grid-cols-2 gap-3">
          <Card>
            <CardHeader className="gap-3">
              <div className="size-10 grid place-items-center rounded-md ring ring-primary bg-primary/10">
                <MonitorPlayIcon className="size-6 text-primary" />
              </div>
              <CardTitle className="text-lg">
                Demonstração da plataforma
              </CardTitle>
              <CardDescription>
                Conheça de perto os recursos do PsicoHub com um especialista
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="gap-3">
              <div className="size-10 grid place-items-center rounded-md ring ring-primary bg-primary/10">
                <HeadsetIcon className="size-6 text-primary" />
              </div>
              <CardTitle className="text-lg">Suporte técnico</CardTitle>
              <CardDescription>
                Apoio para uso da plataforma e resolução de questões técnicas.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="gap-3">
              <div className="size-10 grid place-items-center rounded-md ring ring-primary bg-primary/10">
                <MessageCircleQuestionMarkIcon className="size-6 text-primary" />
              </div>
              <CardTitle className="text-lg">
                Dúvidas sobre a plataforma
              </CardTitle>
              <CardDescription>
                Informações sobre acesso, planos e como começar.
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
          <ContactForm />
        </CardContent>
      </Card>
    </section>
  )
}
