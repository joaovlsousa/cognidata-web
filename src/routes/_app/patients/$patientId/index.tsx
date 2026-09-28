import { createFileRoute } from '@tanstack/react-router'
import { Suspense } from 'react'
import { AppHeader } from '../../-components/app-header'
import { PatientDetails } from './-components/patient-details'
import { PatientDetailsSkeleton } from './-components/patient-details-skeleton'

export const Route = createFileRoute('/_app/patients/$patientId/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="space-y-10">
      <AppHeader
        title="Informações do paciente"
        description="Veja todas as informações deste paciente."
      />

      <Suspense fallback={<PatientDetailsSkeleton />}>
        <PatientDetails />
      </Suspense>
    </div>
  )
}
