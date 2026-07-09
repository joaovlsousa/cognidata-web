import { createFileRoute, Link } from '@tanstack/react-router'
import { UserPlusIcon } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '@/components/ui/input-group'
import { AppHeader } from '../-components/app-header'
import { MetadataSection } from '../-components/metadata-section'
import { PatientsTable } from './-components/patients-table'

export const Route = createFileRoute('/_app/patients/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="space-y-10">
      <AppHeader
        title="Pacientes"
        description="Gerencie cadastros, acompanhe histórico clínico e vizualize sinais de
          atenção."
      />

      <MetadataSection />

      <section className="rounded-xl border shadow-md">
        <div className="p-3 flex items-center justify-between gap-x-10 rounded-t-xl bg-muted">
          <div className="flex items-center gap-x-3 shrink-0">
            <Badge className="p-3 cursor-pointer">Todos</Badge>
            <Badge variant="outline" className="p-3 cursor-pointer">
              Ativos
            </Badge>
            <Badge variant="outline" className="p-3 cursor-pointer">
              Com alerta
            </Badge>
            <Badge variant="outline" className="p-3 cursor-pointer">
              Aguardando
            </Badge>
          </div>

          <InputGroup>
            <InputGroupInput placeholder="Busque um paciente pelo nome" />
            <InputGroupAddon align="inline-end">
              <InputGroupButton variant="default">Buscar</InputGroupButton>
            </InputGroupAddon>
          </InputGroup>

          <Link to="/patients/new">
            <Button type="button" className="px-6">
              <UserPlusIcon />
              <span>Novo paciente</span>
            </Button>
          </Link>
        </div>

        <PatientsTable />
      </section>
    </div>
  )
}
