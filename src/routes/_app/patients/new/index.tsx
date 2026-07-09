import { createFileRoute } from '@tanstack/react-router'
import { AppHeader } from '../../-components/app-header'
import { NewPatientForm } from './-components/new-patient-form'

export const Route = createFileRoute('/_app/patients/new/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="space-y-10">
      <AppHeader
        title="Novo paciente"
        description="Cadastre uma criança para iniciar avaliações e acompanhamento clínico."
      />

      <NewPatientForm />
    </div>
  )
}
