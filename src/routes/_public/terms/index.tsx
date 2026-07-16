import { createFileRoute, Link } from '@tanstack/react-router'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale/pt-BR'
import {
  CalendarSyncIcon,
  ListIcon,
  ShieldCheckIcon,
  UsersIcon,
} from 'lucide-react'
import { Fragment } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { terms } from './-data'

export const Route = createFileRoute('/_public/terms/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="space-y-10">
      <section className="text-center">
        <h2 className="text-4xl font-bold">Termos de Uso</h2>
        <p className="max-w-xl mx-auto leading-relaxed text-muted-foreground">
          Estes termos estabelecem as regras, responsabilidades e condições para
          o uso da plataforma CognitDataHub. Leia com atenção antes de utilizar
          nossos serviços.
        </p>
      </section>

      <section className="flex justify-between gap-x-6">
        <div className="relative space-y-6">
          <Card className="sticky top-28 max-w-72">
            <CardContent className="space-y-6">
              <div className="flex items-center gap-x-3">
                <ListIcon className="size-4 text-primary" />
                <h5 className="text-base font-bold">Neste documento</h5>
              </div>

              {terms.map((term, index) => (
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
            {terms.map((term, index) => (
              <Fragment key={term.title}>
                <div id={`item-${index + 1}`} className="flex gap-x-3">
                  <div className="grid place-items-center size-14 shrink-0 rounded-full bg-primary/10">
                    <term.icon className="size-7 text-primary" />
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

                {index !== terms.length - 1 && <Separator />}
              </Fragment>
            ))}
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="max-w-72">
            <CardContent className="space-y-3">
              <div className="flex gap-x-3">
                <div className="grid place-items-center size-12 shrink-0 rounded-full bg-primary/10">
                  <CalendarSyncIcon className="size-6 text-primary" />
                </div>

                <div>
                  <h5 className="text-base font-bold">Última atualização</h5>
                  <p className="text-sm font-medium text-primary">
                    {format(new Date('2026-07-16'), `dd 'de' MMMM 'de' yyyy`, {
                      locale: ptBR,
                    })}
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

          <Card className="max-w-72">
            <CardContent className="flex flex-col items-center justify-center gap-y-3">
              <div className="grid place-items-center size-14 shrink-0 rounded-full bg-primary/10">
                <ShieldCheckIcon className="size-7 text-primary" />
              </div>

              <h5 className="text-lg font-bold text-center">
                Compromisso com a ética e a segurança
              </h5>
              <p className="text-justify leading-relaxed text-muted-foreground">
                Nosso compromisso é oferecer tecnologia confiável e segura para
                apoiar decisões clínicas responsáveis e centradas nas pessoas.
                Conte com a gente para impulsionar sua prática com ética,
                eficiência e respeito.
              </p>
            </CardContent>
          </Card>

          <Card className="max-w-72">
            <CardContent className="flex flex-col items-center justify-center gap-y-3">
              <div className="grid place-items-center size-14 shrink-0 rounded-full bg-primary/10">
                <UsersIcon className="size-7 text-primary" />
              </div>

              <h5 className="text-lg font-bold text-center">
                Uso responsável e profissional
              </h5>
              <p className="text-justify leading-relaxed text-muted-foreground">
                O CognitDataHub é uma plataforma desenvolvida exclusivamente
                para psicólogos e clínicas. Seu uso deve ser ético, responsável
                e alinhado às boas práticas da Psicologia e à legislação
                vigente.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
