import { createFileRoute } from '@tanstack/react-router'
import { AppHeader } from './-components/app-header'
import { MetadataSection } from './-components/metadata-section'

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
    </div>
  )
}
