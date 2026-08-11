import { createFileRoute, Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { InfoCard } from '../-components/info-card'
import { habilities, reportFeatures, steps } from './-data'

export const Route = createFileRoute('/_public/games/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="space-y-10">
      <section className="grid grid-cols-[40%_1fr] gap-x-6">
        <div className="space-y-6">
          <h2 className="text-5xl font-bold leading-tight">
            Jogos educativos que engajam e geram indicadores confiáveis.
          </h2>
          <p className="pr-7 font-medium text-muted-foreground leading-relaxed text-justify">
            O CogniData integra jogos baseados em evidências com coleta de dados
            psicométricos, oferecendo avaliações lúdicas, precisas e confiáveis
            para apoiar a prática clinica e o acompanhamento de resultados.
          </p>

          <div className="space-x-3">
            <Link to="/sign-up">
              <Button size="lg" className="px-10">
                Solicitar acesso
              </Button>
            </Link>
          </div>
        </div>

        <img
          src="/game-image.png"
          alt="Imagem da plataforma"
          loading="eager"
          className="aspect-video rounded-xl shadow-md"
        />
      </section>

      <section className="space-y-3">
        <h3 className="text-2xl font-bold">Habilidades avaliadas no jogo</h3>

        <div className="grid grid-cols-5 gap-x-6">
          {habilities.map((hability) => (
            <InfoCard
              key={hability.title}
              icon={hability.icon}
              title={hability.title}
              description={hability.description}
            />
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <h3 className="text-2xl font-bold">
          Como os dados chegam no CogniData
        </h3>

        <div className="grid grid-cols-4 gap-x-6">
          {steps.map((step) => (
            <InfoCard
              key={step.title}
              icon={step.icon}
              title={step.title}
              description={step.description}
            />
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <h3 className="text-2xl font-bold">Galeria da experiência</h3>

        <div className="grid grid-cols-3 gap-x-6">
          <img
            src="/gallery-1.jpeg"
            alt="Imagem do jogo"
            className="w-full aspect-video rounded-xl shadow-md"
          />
          <img
            src="/gallery-2.jpeg"
            alt="Imagem do jogo"
            className="w-full aspect-video rounded-xl shadow-md"
          />
          <img
            src="/gallery-3.jpeg"
            alt="Imagem do jogo"
            className="w-full aspect-video rounded-xl shadow-md"
          />
        </div>
      </section>

      <section className="space-y-3">
        <h3 className="text-2xl font-bold">
          O que o psicólogo recebe ao final
        </h3>

        <div className="grid grid-cols-4 gap-x-6">
          {reportFeatures.map((reportFeature) => (
            <InfoCard
              key={reportFeature.title}
              icon={reportFeature.icon}
              title={reportFeature.title}
              description={reportFeature.description}
            />
          ))}
        </div>
      </section>
    </div>
  )
}
