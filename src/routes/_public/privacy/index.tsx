import { createFileRoute } from '@tanstack/react-router'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale/pt-BR'
import { CalendarSyncIcon, CheckIcon, ShieldCheckIcon } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { InfoCard } from '../-components/info-card'
import { privacyPolicies } from './-data'

export const Route = createFileRoute('/_public/privacy/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="space-y-10">
      <section className="flex items-center gap-x-6">
        <img src="/privacy-illustration.svg" alt="" className="max-h-32" />

        <div>
          <h2 className="text-4xl font-bold">Política de Privacidade</h2>
          <p className="max-w-xl mx-auto leading-relaxed text-muted-foreground">
            No CogniData, a proteção dos seus dados pessoais e clínicos é uma
            prioridade. Atuamos em conformidade com a Lei Geral de Proteção de
            Dados (LGPD) para garantir transparência, segurança e respeito à sua
            privacidade.
          </p>
        </div>
      </section>

      <section className="flex justify-between gap-x-6">
        <div className="flex-1 grid grid-cols-2 gap-6">
          {privacyPolicies.map((privacyPolicy, index) => (
            <InfoCard
              key={privacyPolicy.title}
              title={`${index + 1}. ${privacyPolicy.title}`}
              description={privacyPolicy.description}
              icon={privacyPolicy.icon}
            />
          ))}
        </div>

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
                    {format(new Date('2026-07-16'), `dd 'de' MMMM 'de' yyyy`, {
                      locale: ptBR,
                    })}
                  </p>
                </div>
              </div>

              <Separator />

              <p className="leading-relaxed text-muted-foreground">
                Esta Política pode ser atualizada periodicamente para refletir
                mudanças legais ou melhorias nos nossos serviços. Recomendamos
                que você consulte esta página regularmente.
              </p>
            </CardContent>
          </Card>

          <InfoCard
            icon={ShieldCheckIcon}
            title="Seus direitos garantidos"
            description="Você tem o controle sobre os seus dados. A CogniData está comprometida em garantir transparência, segurança e respeito aos seus direitos de privacidade."
          >
            <div className="space-y-3 text-primary">
              <div className="flex items-center gap-x-2">
                <CheckIcon className="size-4" />
                <span className="text-sm">Acesso aos seus dados</span>
              </div>
              <div className="flex items-center gap-x-2">
                <CheckIcon className="size-4" />
                <span className="text-sm">Correção de dados incompletos</span>
              </div>
              <div className="flex items-center gap-x-2">
                <CheckIcon className="size-4" />
                <span className="text-sm">Exclusão de dados pessoais</span>
              </div>
              <div className="flex items-center gap-x-2">
                <CheckIcon className="size-4" />
                <span className="text-sm">Portabilidade dos dados</span>
              </div>
              <div className="flex items-center gap-x-2">
                <CheckIcon className="size-4" />
                <span className="text-sm">Revogação de consentimento</span>
              </div>
            </div>
          </InfoCard>
        </div>
      </section>
    </div>
  )
}
