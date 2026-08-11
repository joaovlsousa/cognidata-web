import { createFileRoute, Link } from '@tanstack/react-router'
import {
  CheckCircleIcon,
  FlaskConicalIcon,
  LockIcon,
  ShieldCheckIcon,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { InfoCard } from '../-components/info-card'
import { benefits, resources } from './-data'

export const Route = createFileRoute('/_public/_home/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="space-y-10">
      <section className="grid grid-cols-[40%_1fr] gap-x-6">
        <div className="space-y-6">
          <h2 className="text-5xl font-bold leading-tight">
            Avaliação psicométrica com dados que apoiam decisões clínicas
          </h2>
          <p className="pr-7 font-medium text-muted-foreground leading-relaxed text-justify">
            O CogniData é um ambiente completo que centraliza avaliações, jogos
            educativos, indicadores psicométricos e relatórios completos para
            psicólogos que buscam precisão, eficiência e mais segurança em suas
            decisões.
          </p>

          <div className="space-x-3">
            <Link to="/sign-up">
              <Button size="lg" className="px-6">
                Solicitar acesso
              </Button>
            </Link>
            <Link to="/operation">
              <Button variant="outline" size="lg" className="px-6">
                Veja como funciona
              </Button>
            </Link>
          </div>

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

        <img
          src="/app-image.png"
          alt="Imagem da plataforma"
          loading="eager"
          className="rounded-xl shadow-md"
        />
      </section>

      <section className="space-y-3">
        <h3 className="text-2xl font-bold">
          O que você encontra na plataforma
        </h3>

        <div className="grid grid-cols-4 gap-x-10">
          {resources.map((resource) => (
            <InfoCard
              key={resource.title}
              icon={resource.icon}
              title={resource.title}
              description={resource.description}
            >
              <div className="space-y-3">
                {resource.items.map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-x-1.5 text-primary"
                  >
                    <CheckCircleIcon className="size-4" />
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </InfoCard>
          ))}
        </div>
      </section>

      <section className="relative h-56 ring ring-foreground/10 rounded-lg shadow-md">
        <div className="w-2/5 h-full flex flex-col justify-center px-6 space-y-2.5">
          <h4 className="text-xl font-bold leading-tight">
            Conectado com <br />
            <span className="text-2xl text-primary">
              Os Guardiões de Nirídia
            </span>
          </h4>
          <p className="text-sm font-medium text-muted-foreground">
            O jogo transforma a avaliação em uma jomada envolvente no universo
            de Niridia e envia os dados psicométricos diretamente para o
            CogniData.
          </p>
          <Link to="/games" className="w-fit">
            <Button size="lg" className="px-6">
              Conheça o jogo
            </Button>
          </Link>
        </div>

        <img
          src="/game-hero.png"
          alt="Imagem do jogo Os Guardiões de Nirídia"
          loading="eager"
          className="absolute right-0 top-0 w-3/5 h-full rounded-r-lg"
        />

        <div className="absolute left-[40%] top-0 w-56 h-full bg-linear-to-r from-background via-transparent to-transparent z-10" />
      </section>

      <section className="space-y-3">
        <h3 className="text-2xl font-bold">Benefícios da plataforma</h3>

        <div className="grid grid-cols-4 gap-x-6">
          {benefits.map((benefit) => (
            <InfoCard
              key={benefit.title}
              icon={benefit.icon}
              title={benefit.title}
              description={benefit.description}
            />
          ))}
        </div>
      </section>
    </div>
  )
}
