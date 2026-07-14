import { createFileRoute } from '@tanstack/react-router'
import { AppHeader } from '../../-components/app-header'
import { PatientDetails } from './-components/patient-details'

export const Route = createFileRoute('/_app/patients/$patientId/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="space-y-10">
      <AppHeader
        title="Detalhes do paciente"
        description="Veja todos os dados de um paciente."
      />

      <PatientDetails />
    </div>
  )
}
