import { createFileRoute, Link } from '@tanstack/react-router'
import {
  ChartNoAxesCombinedIcon,
  ClipboardCheckIcon,
  FlaskConicalIcon,
  Gamepad2Icon,
  LockIcon,
  ShieldCheckIcon,
  UsersIcon,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export const Route = createFileRoute('/_public/')({
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
          <p className="font-medium text-muted-foreground leading-relaxed text-justify">
            O PsicoHub centraliza avaliações, jogos educativos, indicadores
            psicométricos e relatórios completos para psicólogos que buscam
            precisão, eficiência e mais segurança em suas decisões.
          </p>

          <div className="space-x-3">
            <Link to="/sign-up">
              <Button size="lg" className="px-6">
                Solicitar acesso
              </Button>
            </Link>
            <Link to="/explore">
              <Button variant="outline" size="lg">
                Conheça a plataforma
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

      <section className="grid grid-cols-4 gap-x-10">
        <Card className="w-full shadow-md">
          <CardHeader className="gap-3">
            <div className="size-10 grid place-items-center rounded-md ring ring-primary bg-primary/10">
              <UsersIcon className="size-6 text-primary" />
            </div>
            <CardTitle className="text-lg">Gestão de pacientes</CardTitle>
            <CardDescription>
              Cadastre, organize e acompanhe seus pacientes de forma prática e
              segura.
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className="w-full shadow-md">
          <CardHeader className="gap-3">
            <div className="size-10 grid place-items-center rounded-md ring ring-primary bg-primary/10">
              <ClipboardCheckIcon className="size-6 text-primary" />
            </div>
            <CardTitle className="text-lg">Avaliações psicométricas</CardTitle>
            <CardDescription>
              Aplique avaliações validadas e obtenha dados precisos e
              confiáveis.
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className="w-full shadow-md">
          <CardHeader className="gap-3">
            <div className="size-10 grid place-items-center rounded-md ring ring-primary bg-primary/10">
              <Gamepad2Icon className="size-6 text-primary" />
            </div>
            <CardTitle className="text-lg">Jogos educativos</CardTitle>
            <CardDescription>
              Utilize jogos baseados em habilidades cognitivas para avaliação e
              intervenção.
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className="w-full shadow-md">
          <CardHeader className="gap-3">
            <div className="size-10 grid place-items-center rounded-md ring ring-primary bg-primary/10">
              <ChartNoAxesCombinedIcon className="size-6 text-primary" />
            </div>
            <CardTitle className="text-lg">Relatórios e indicadores</CardTitle>
            <CardDescription>
              Gere relatórios completos e análise de indicadores para subsidiar
              decisões clínicas.
            </CardDescription>
          </CardHeader>
        </Card>
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
            PsicoHub.
          </p>
          <Link to="/games">
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
    </div>
  )
}
