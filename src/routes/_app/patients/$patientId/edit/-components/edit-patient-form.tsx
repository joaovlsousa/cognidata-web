import { useNavigate, useParams } from '@tanstack/react-router'
import { toast } from 'sonner'
import { useEditPatient } from '@/hooks/http/patient/use-edit-patient'
import { useGetPatient } from '@/hooks/http/patient/use-get-patient'
import { compareObjectValues, maskPhone } from '@/lib/utils'
import { SavePatientForm } from '../../../-components/save-patient-form'

export function EditPatientForm() {
  const { patientId } = useParams({ from: '/_app/patients/$patientId/edit/' })
  const navigate = useNavigate()
  const editPatientMutation = useEditPatient()

  const {
    data: { patient },
  } = useGetPatient({ patientId })

  return (
    <SavePatientForm
      onSubmit={async (values) => {
        const dateOfBirth = values.dateOfBirth.toISOString().split('T')[0]

        const newValues = {
          ...values,
          dateOfBirth,
        }

        const { id, applicatorId, createdAt, ...oldValues } = patient

        if (compareObjectValues(oldValues, newValues)) {
          toast.info('Não há nada para ser atualizado')

          return
        }

        await editPatientMutation.mutateAsync({
          ...values,
          patientId,
          dateOfBirth,
        })

        toast.success('Dados do paciente atualizados com sucesso')

        navigate({ to: '/patients' })
      }}
      defaultValues={{
        dateOfBirth: new Date(`${patient.dateOfBirth}T00:00:00`),
        patientResponsiblePhone: maskPhone(patient.patientResponsiblePhone),
        name: patient.name,
        gender: patient.gender,
        patientResponsibleName: patient.patientResponsibleName,
        patientResponsibleEmail: patient.patientResponsibleEmail,
        patientResponsibleKinship: patient.patientResponsibleKinship,
        schoolName: patient.schoolName,
        schoolYear: patient.schoolYear,
        schoolSchedule: patient.schoolSchedule,
        medicalChiefComplaint: patient.medicalChiefComplaint,
        medicalObservations: patient.medicalObservations ?? '',
      }}
    />
  )
}
