import { createFileRoute, Link } from '@tanstack/react-router'
import { format } from 'date-fns'
import {
  CalendarSyncIcon,
  ListIcon,
  ShieldCheckIcon,
  UsersIcon,
} from 'lucide-react'
import { Fragment } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { InfoCard } from '../-components/info-card'
import { termsOfUse } from './-data'

export const Route = createFileRoute('/_public/terms/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="space-y-10">
      <section className="flex items-center gap-x-6">
        <img src="/terms-illustration.svg" alt="" className="max-h-32" />

        <div>
          <h2 className="text-4xl font-bold">Termos de Uso</h2>
          <p className="max-w-xl mx-auto leading-relaxed text-muted-foreground">
            Estes termos estabelecem as regras, responsabilidades e condições
            para o uso da plataforma CognitDataHub. Leia com atenção antes de
            utilizar nossos serviços.
          </p>
        </div>
      </section>

      <section className="flex justify-between gap-x-6">
        <div className="relative max-w-72 space-y-6">
          <Card className="sticky top-28">
            <CardContent className="space-y-6">
              <div className="flex items-center gap-x-3">
                <ListIcon className="size-4 text-primary" />
                <h5 className="text-base font-bold">Neste documento</h5>
              </div>

              {termsOfUse.map((term, index) => (
                <Link
                  key={term.title}
                  to="."
                  hash={`item-${index + 1}`}
                  className="flex gap-x-3"
                >
                  <div className="mt-1.5 size-2 shrink-0 rounded-full bg-primary" />

                  <h5 className="text-sm font-medium text-muted-foreground hover:text-primary">
                    {term.title}
                  </h5>
                </Link>
              ))}
            </CardContent>
          </Card>
        </div>

        <Card className="flex-1">
          <CardContent className="space-y-6">
            {termsOfUse.map((term, index) => (
              <Fragment key={term.title}>
                <div id={`item-${index + 1}`} className="flex gap-x-3">
                  <div className="mt-0.75 grid place-items-center size-10 shrink-0 rounded-md ring ring-primary bg-primary/10">
                    <term.icon className="size-6 text-primary" />
                  </div>

                  <div>
                    <h4 className="text-lg font-bold">
                      {index + 1}. {term.title}
                    </h4>
                    <p className="leading-relaxed text-muted-foreground">
                      {term.description}
                    </p>
                  </div>
                </div>

                {index !== termsOfUse.length - 1 && <Separator />}
              </Fragment>
            ))}
          </CardContent>
        </Card>

        <div className="max-w-72 space-y-6">
          <Card>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-x-3">
                <div className="grid place-items-center size-10 shrink-0 rounded-md ring ring-primary bg-primary/10">
                  <CalendarSyncIcon className="size-6 text-primary" />
                </div>

                <div>
                  <h5 className="text-base font-medium">Última atualização</h5>
                  <p className="text-sm font-medium text-primary">
                    {format(new Date('2026-07-16'), `dd 'de' MMMM 'de' yyyy`)}
                  </p>
                </div>
              </div>

              <Separator />

              <p className="leading-relaxed text-muted-foreground">
                Estes Termos de Uso podem ser atualizados periodicamente.
                Recomendamos que você os consulte regularmente.
              </p>
            </CardContent>
          </Card>

          <InfoCard
            icon={ShieldCheckIcon}
            title="Compromisso com a ética e a segurança"
            description="Nosso compromisso é oferecer tecnologia confiável e segura para
                apoiar decisões clínicas responsáveis e centradas nas pessoas.
                Conte com a gente para impulsionar sua prática com ética,
                eficiência e respeito."
          />

          <InfoCard
            icon={UsersIcon}
            title="Uso responsável e profissional"
            description="O CognitDataHub é uma plataforma desenvolvida exclusivamente
                para psicólogos e clínicas. Seu uso deve ser ético, responsável
                e alinhado às boas práticas da Psicologia e à legislação
                vigente."
          />
        </div>
      </section>
    </div>
  )
}
