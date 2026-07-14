import { createFileRoute } from '@tanstack/react-router'
import { Suspense } from 'react'
import { AppHeader } from '../-components/app-header'
import { MetadataSection } from '../-components/metadata-section'
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
