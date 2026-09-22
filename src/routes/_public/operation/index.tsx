import { createFileRoute, Link } from '@tanstack/react-router'
import {
  ChartSplineIcon,
  FileUserIcon,
  ListIcon,
  TrendingUpIcon,
  UserIcon,
} from 'lucide-react'
import { Fragment } from 'react'
import { SkillsChart } from '@/components/skills-chart'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { InfoCard } from '../-components/info-card'
import { ExampleChart } from './-components/example-chart'
import { hablitiesChartValues, platformRecords, stepByStep } from './-data'

export const Route = createFileRoute('/_public/operation/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="space-y-10">
      <section className="grid grid-cols-[40%_1fr] gap-x-6">
        <div className="space-y-6">
          <h2 className="text-5xl font-bold leading-tight">
            Como o CogniData transforma dados em acompanhamento clínico
          </h2>
          <p className="pr-7 font-medium text-muted-foreground leading-relaxed text-justify">
            A plataforma conecta o cadastro do paciente, aplicação de avaliação
            ou jogo, processamento psicométrico, indicadores e relatórios para
            apoiar decisões clínicas com clareza e segurança.
          </p>

          <div className="space-x-3">
            <Link to="/sign-up">
              <Button size="lg" className="w-1/2">
                Solicitar acesso
              </Button>
            </Link>
          </div>
        </div>

        <Card className="p-6 shadow-md">
          <div className="grid grid-cols-3 gap-x-6 gap-y-10">
            {stepByStep.map((step) => (
              <Fragment key={step.id}>
                <div className="flex flex-col items-center gap-y-3">
                  <div className="relative size-16 grid place-items-center rounded-full bg-primary/5 ring ring-primary">
                    <step.icon className="size-8 text-primary" />

                    <div className="absolute size-5 -bottom-2 left-1/2 -translate-x-1/2 rounded-full bg-primary font-medium text-sm text-center text-background">
                      {step.id}
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-center">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground text-center -mt-2">
                    {step.description}
                  </p>
                </div>
              </Fragment>
            ))}
          </div>
        </Card>
      </section>

      <section className="space-y-3">
        <h3 className="text-2xl font-bold">O que a plataforma registra</h3>

        <div className="grid grid-cols-4 gap-10">
          {platformRecords.map((record) => (
            <InfoCard
              key={record.title}
              icon={record.icon}
              title={record.title}
              description={record.description}
            />
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <h3 className="text-2xl font-bold">O que o psicólogo recebe</h3>

        <div className="grid grid-cols-3 gap-10">
          <InfoCard
            icon={ListIcon}
            title="Resultados por habilidade"
            description="Visão clara das habilidades em aliteração, segmentação, memória visual, rima e coordenação viso-motora."
          >
            <SkillsChart values={hablitiesChartValues} />
          </InfoCard>

          <InfoCard
            icon={ChartSplineIcon}
            title="Gráficos de evolução"
            description="Acompanhe a evolução dos habilidades ao longo das sessões com gráficos intuitivos."
          >
            <ExampleChart />
          </InfoCard>

          <InfoCard
            icon={FileUserIcon}
            title="Relatórios individuais"
            description="Relatórios completos e objetivos para comunicar resultados e embasar decisões clinicas."
          >
            <div className="space-y-6">
              <Card className="p-3 flex-row gap-x-3">
                <div className="size-10 grid place-items-center shrink-0 rounded-full ring ring-primary bg-primary/5">
                  <UserIcon className="size-5 text-primary" />
                </div>

                <div className="flex-1 grid grid-cols-2 gap-3">
                  <span className="text-sm font-bold col-span-2">
                    Resumo do paciente
                  </span>

                  <div className="w-full h-3 rounded-full bg-muted" />
                  <div className="w-full h-3 rounded-full bg-muted" />
                  <div className="w-full h-3 rounded-full bg-muted" />
                  <div className="w-full h-3 rounded-full bg-muted" />
                </div>
              </Card>

              <Card className="p-3">
                <div className="w-full grid grid-cols-2 gap-3">
                  <span className="text-sm font-bold col-span-2">
                    Indicadores principais
                  </span>

                  <div className="flex items-center gap-x-3">
                    <div className="size-10 grid place-items-center shrink-0 rounded-full ring ring-primary bg-primary/5">
                      <TrendingUpIcon className="size-5 text-primary" />
                    </div>
                    <div className="flex-1 space-y-1.5">
                      <div className="flex-1 h-3 rounded-full bg-muted" />
                      <div className="flex-1 h-3 rounded-full bg-muted" />
                    </div>
                  </div>
                  <div className="flex items-center gap-x-3">
                    <div className="size-10 grid place-items-center shrink-0 rounded-full ring ring-primary bg-primary/5">
                      <ListIcon className="size-5 text-primary" />
                    </div>
                    <div className="flex-1 space-y-1.5">
                      <div className="flex-1 h-3 rounded-full bg-muted" />
                      <div className="flex-1 h-3 rounded-full bg-muted" />
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </InfoCard>
        </div>
      </section>
    </div>
  )
}
