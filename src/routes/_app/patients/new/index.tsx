import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { toast } from 'sonner'
import { useCreatePatient } from '@/hooks/http/patient/use-create-patient'
import { AppHeader } from '../../-components/app-header'
import { SavePatientForm } from '../-components/save-patient-form'

export const Route = createFileRoute('/_app/patients/new/')({
  component: RouteComponent,
})

function RouteComponent() {
  const navigate = useNavigate()
  const createPatientMutation = useCreatePatient()

  return (
    <div className="space-y-10">
      <AppHeader
        title="Novo paciente"
        description="Cadastre uma criança para iniciar avaliações e acompanhamento clínico."
      />

      <SavePatientForm
        onSubmit={async (values) => {
          const dateOfBirth = values.dateOfBirth.toISOString().split('T')[0]

          await createPatientMutation.mutateAsync({
            ...values,
            dateOfBirth,
          })

          toast.success('Paciente salvo com sucesso')

          navigate({ to: '/patients' })
        }}
      />
    </div>
  )
}
