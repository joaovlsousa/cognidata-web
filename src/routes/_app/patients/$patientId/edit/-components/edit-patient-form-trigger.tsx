import { useParams } from '@tanstack/react-router'
import { useGetPatient } from '@/hooks/http/patient/use-get-patient'
import { EditPatientForm } from './edit-patient-form'

export function EditPatientFormTrigger() {
  const { patientId } = useParams({ from: '/_app/patients/$patientId/edit/' })

  const {
    data: { patient },
  } = useGetPatient({ patientId })

  return <EditPatientForm patient={patient} />
}
