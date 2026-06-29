import { createFileRoute } from '@tanstack/react-router'
import {
  HeadsetIcon,
  MessageCircleQuestionMarkIcon,
  MonitorPlayIcon,
} from 'lucide-react'
import { Logo } from '@/components/logo'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { InfoCard } from '../-components/info-card'
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
          <InfoCard
            icon={MonitorPlayIcon}
            title="Demonstração da plataforma"
            description="Conheça de perto os recursos do PsicoHub com um especialista"
          />
          <InfoCard
            icon={HeadsetIcon}
            title="Suporte técnico"
            description="Apoio para uso da plataforma e resolução de questões técnicas."
          />
          <InfoCard
            icon={MessageCircleQuestionMarkIcon}
            title="Dúvidas sobre a plataforma"
            description="Informações sobre acesso, planos e como começar."
          />
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
