import { createFileRoute } from '@tanstack/react-router'
import { Suspense } from 'react'
import { AppHeader } from '@/routes/_app/-components/app-header'
import { SavePatientFormSkeleton } from '../../-components/save-patient-form-skeleton'
import { EditPatientForm } from './-components/edit-patient-form'

export const Route = createFileRoute('/_app/patients/$patientId/edit/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="space-y-10">
      <AppHeader
        title="Atualizar dados do paciente"
        description="Atualize os dados do paciente para usufruir o máximo do acompanhamento clínico da plataforma."
      />

      <Suspense fallback={<SavePatientFormSkeleton />}>
        <EditPatientForm />
      </Suspense>
    </div>
  )
}
