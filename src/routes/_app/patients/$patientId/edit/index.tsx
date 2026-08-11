import { createFileRoute } from '@tanstack/react-router'
import { Suspense } from 'react'
import { AppHeader } from '@/routes/_app/-components/app-header'
import { EditPatientFormSkeleton } from './-components/edit-patient-form-skeleton'
import { EditPatientFormTrigger } from './-components/edit-patient-form-trigger'

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

      <Suspense fallback={<EditPatientFormSkeleton />}>
        <EditPatientFormTrigger />
      </Suspense>
    </div>
  )
}
