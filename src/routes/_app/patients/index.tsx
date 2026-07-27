import { createFileRoute, Link } from '@tanstack/react-router'
import { UserPlusIcon } from 'lucide-react'
import { Suspense } from 'react'
import { Button } from '@/components/ui/button'
import { AppHeader } from '../-components/app-header'
import { MetadataSection } from '../-components/metadata-section'
import { PatientsPopoverFilters } from './-components/patients-popover-filters'
import { PatientsTable } from './-components/patients-table'
import { PatientsTableFilters } from './-components/patients-table-filters'
import { PatientsTableFiltersDisabled } from './-components/patients-table-filters-disabled'
import { PatientsTableSkeleton } from './-components/patients-table-skeleton'

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

      <section className="flex items-center gap-x-6">
        <Link to="/patients/new">
          <Button type="button" size="lg" className="px-6">
            <UserPlusIcon />
            <span>Novo paciente</span>
          </Button>
        </Link>

        <PatientsPopoverFilters />
      </section>

      <section className="rounded-xl border shadow-md">
        <Suspense
          fallback={
            <>
              <PatientsTableFiltersDisabled />
              <PatientsTableSkeleton />
            </>
          }
        >
          <PatientsTableFilters />

          <PatientsTable />
        </Suspense>
      </section>
    </div>
  )
}
