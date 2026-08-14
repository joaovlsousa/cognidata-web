import { Link, useNavigate, useParams } from '@tanstack/react-router'
import { format } from 'date-fns'
import {
  GraduationCapIcon,
  HospitalIcon,
  PencilLineIcon,
  Trash2Icon,
  UserIcon,
} from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'
import { DeleteAlertDialog } from '@/components/delete-alert-dialog'
import { AlertDialogDescription } from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { useDeletePatient } from '@/hooks/http/patient/use-delete-patient'
import { useGetPatient } from '@/hooks/http/patient/use-get-patient'
import { getNameInitials, maskPhone } from '@/lib/utils'
import { PatientCardDetails } from './patient-card-details'

const kinshipMapper = {
  'father/mother': 'Pai/Mãe',
  'grandfather/grandmother': 'Avô/Avó',
  'uncle/aunt': 'Tio/Tia',
}

const schoolScheduleMapper = {
  morning: 'Manhã',
  afternoon: 'Tarde',
  fullTime: 'Integral',
}

export function PatientDetails() {
  const { patientId } = useParams({ from: '/_app/patients/$patientId/' })
  const [deletePatientDialogOpen, setDeletePatientDialogOpen] = useState(false)
  const navigate = useNavigate()

  const {
    data: { patient },
  } = useGetPatient({ patientId })
  patient.schoolSchedule
  const patientNameInitials = getNameInitials(patient.name)

  const deletePatientMutation = useDeletePatient()

  async function handleDeletePatient() {
    await deletePatientMutation.mutateAsync({ patientId: patient.id })

    toast.success('Paciente excluído com sucesso')
    navigate({ to: '/patients' })
  }

  return (
    <>
      <DeleteAlertDialog
        open={deletePatientDialogOpen}
        onConfirm={handleDeletePatient}
        onCancel={() => setDeletePatientDialogOpen(false)}
      >
        <AlertDialogDescription>
          Ao continuar, você apagará todos os dados do paciente{' '}
          <span className="text-foreground font-medium">{patient.name}</span>.
        </AlertDialogDescription>
      </DeleteAlertDialog>

      <section className="space-y-10">
        <div className="flex items-end justify-between">
          <div className="flex items-center gap-x-3">
            <div className="size-12 grid place-items-center ring text-primary rounded-md text-xl font-semibold bg-primary/10 ring-primary">
              {patientNameInitials}
            </div>

            <div>
              <p className="text-xl font-semibold">{patient.name}</p>

              <p className="text-sm text-muted-foreground">
                Acompanhamento desde{' '}
                {format(patient.createdAt, `dd 'de' MMMM 'de' yyyy`)}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link to="/patients/$patientId/edit" params={{ patientId }}>
              <Button variant="outline" size="lg" className="px-6">
                <PencilLineIcon />
                <span>Atualizar dados do paciente</span>
              </Button>
            </Link>

            <Button
              variant="destructive"
              size="lg"
              className="px-6"
              onClick={() => setDeletePatientDialogOpen(true)}
            >
              <Trash2Icon />
              <span>Excluir paciente</span>
            </Button>
          </div>
        </div>

        <PatientCardDetails
          icon={UserIcon}
          title="Dados do paciente"
          details={[
            {
              title: 'Nome',
              description: patient.name,
            },
            {
              title: 'Data de Nascimento',
              description: format(
                new Date(`${patient.dateOfBirth}T00:00`),
                'dd/MM/yyy'
              ),
            },
            {
              title: 'CPF',
              description: patient.cpf,
            },
            {
              title: 'Gênero',
              description:
                patient.gender === 'female' ? 'Feminino' : 'Masculino',
            },
          ]}
        />

        <div className="flex gap-10">
          <PatientCardDetails
            icon={UserIcon}
            title="Dados do responsável"
            details={[
              {
                title: 'Nome',
                description: patient.patientResponsibleName,
              },
              {
                title: 'Parentesco',
                description: kinshipMapper[patient.patientResponsibleKinship],
              },
              {
                title: 'Telefone',
                description: maskPhone(patient.patientResponsiblePhone),
              },
              {
                title: 'E-mail',
                description: patient.patientResponsibleEmail,
              },
            ]}
          />

          <PatientCardDetails
            icon={GraduationCapIcon}
            title="Contexto escolar"
            details={[
              {
                title: 'Escola',
                description: patient.schoolName,
              },
              {
                title: 'Ano escolar',
                description: `${patient.schoolYear}° ano`,
              },
              {
                title: 'Turno',
                description: schoolScheduleMapper[patient.schoolSchedule],
              },
            ]}
          />
        </div>

        <PatientCardDetails
          icon={HospitalIcon}
          title="Contexto clínico"
          details={[
            {
              title: 'Queixa principal',
              description: patient.medicalChiefComplaint,
            },
            {
              title: 'Observações',
              description: patient.medicalObservations ?? '',
            },
          ]}
        />
      </section>
    </>
  )
}
