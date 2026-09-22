import { createFileRoute, Link } from '@tanstack/react-router'
import { DownloadIcon, UserPlusIcon } from 'lucide-react'
import { SkillsChart } from '@/components/skills-chart'
import { ThetaLineChart } from '@/components/theta-line-chart'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { AppHeader } from '../-components/app-header'
import { MetadataSection } from '../-components/metadata-section'

export const Route = createFileRoute('/_app/dashboard/')({
  component: RouteComponent,
})

const data = [
  { session: '01/01', theta: -1.2 },
  { session: '02/01', theta: 0.2 },
  { session: '03/01', theta: 2.2 },
  { session: '04/01', theta: 1.2 },
  { session: '05/01', theta: 1.75 },
  { session: '06/01', theta: 3 },
  { session: '07/01', theta: 2.5 },
]

function RouteComponent() {
  return (
    <div className="space-y-10">
      <AppHeader title="Olá! Bem-vindo(a) ao seu painel clínico." />

      <section className="grid grid-cols-3 items-start gap-6">
        <div className="col-span-2 space-y-6">
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle>
                Evolução da habilidade estimada &theta; (theta)
              </CardTitle>
              <CardDescription>
                Evolução média dos pacientes de forma geral nos últimos 30 dias.
              </CardDescription>
            </CardHeader>

            <CardContent>
              <ThetaLineChart data={data} />
            </CardContent>
          </Card>

          <Card className="shadow-md">
            <CardHeader>
              <CardTitle>Habilidades avaliadas</CardTitle>
              <CardDescription>
                Média das habilidades avaliadas de todos os pacientes.
              </CardDescription>
            </CardHeader>

            <CardContent>
              <SkillsChart
                values={{
                  alliteration: 0.72,
                  segmentation: 0.58,
                  visualMemory: 1.2,
                  rhyme: 0.87,
                  visualMotorCoordination: 2.3,
                }}
              />
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle>Acesso rápido</CardTitle>
            </CardHeader>

            <CardContent className="grid auto-rows-auto gap-3">
              <Link to="/patients/new">
                <Button variant="outline" size="lg" className="w-full">
                  <UserPlusIcon />
                  <span>Novo paciente</span>
                </Button>
              </Link>

              <Link to="/patients/import">
                <Button variant="outline" size="lg" className="w-full">
                  <DownloadIcon />
                  <span>Importar pacientes</span>
                </Button>
              </Link>
            </CardContent>
          </Card>

          <MetadataSection orientation="vertical" className="gap-6" />
        </div>
      </section>
    </div>
  )
}
