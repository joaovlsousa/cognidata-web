import { useNavigate, useParams } from '@tanstack/react-router'
import { format } from 'date-fns'
import { GraduationCapIcon, HospitalIcon, UserIcon } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'
import { DeleteAlertDialog } from '@/components/delete-alert-dialog'
import { AlertDialogDescription } from '@/components/ui/alert-dialog'
import { useDeletePatient } from '@/hooks/http/patient/use-delete-patient'
import { useGetPatient } from '@/hooks/http/patient/use-get-patient'
import { getDetailsFromPatient } from '../-data/get-details-from-patient'
import { PatientDetailsCard } from './patient-details-card'
import { PatientSettingsDropdown } from './patient-settings-dropdown'

export function PatientDetails() {
  const { patientId } = useParams({ from: '/_app/patients/$patientId/' })
  const [isDeletePatientDialogOpen, setIsDeletePatientDialogOpen] =
    useState(false)
  const navigate = useNavigate()

  const {
    data: { patient },
  } = useGetPatient({ patientId })

  const deletePatientMutation = useDeletePatient()

  async function handleDeletePatient() {
    await deletePatientMutation.mutateAsync({ patientId: patient.id })

    toast.success('Paciente excluído com sucesso')
    navigate({ to: '/patients' })
  }

  const { clinicalDetails, patientDetails, responsibleDetails, schoolDetails } =
    getDetailsFromPatient(patient)

  return (
    <>
      <DeleteAlertDialog
        open={isDeletePatientDialogOpen}
        onConfirm={handleDeletePatient}
        onCancel={() => setIsDeletePatientDialogOpen(false)}
      >
        <AlertDialogDescription>
          Ao continuar, você apagará todos as informações do paciente{' '}
          <span className="text-foreground font-medium">{patient.name}</span>.
        </AlertDialogDescription>
      </DeleteAlertDialog>

      <section className="space-y-10">
        <div className="flex items-end justify-between">
          <div className="flex items-center gap-x-3">
            <div className="size-12 grid place-items-center ring text-primary rounded-md text-xl font-semibold bg-primary/10 ring-primary">
              {patient.name[0].toUpperCase()}
            </div>

            <div>
              <p className="text-xl font-semibold">{patient.name}</p>

              <p className="text-sm text-muted-foreground">
                Acompanhamento desde{' '}
                {format(patient.createdAt, `dd 'de' MMMM 'de' yyyy`)}.
              </p>
            </div>
          </div>

          <PatientSettingsDropdown
            onDelete={() => setIsDeletePatientDialogOpen(true)}
          />
        </div>

        <div className="grid grid-cols-3 gap-6">
          <PatientDetailsCard icon={UserIcon} title="Informações do paciente">
            <div className="space-y-3">
              {patientDetails.map((detail) => (
                <div key={detail.title}>
                  <h4 className="text-sm text-muted-foreground">
                    {detail.title}
                  </h4>
                  <p className="text-base font-medium">{detail.description}</p>
                </div>
              ))}
            </div>
          </PatientDetailsCard>

          <PatientDetailsCard
            icon={UserIcon}
            title="Informações do responsável"
          >
            <div className="space-y-3">
              {responsibleDetails.map((detail) => (
                <div key={detail.title}>
                  <h4 className="text-sm text-muted-foreground">
                    {detail.title}
                  </h4>
                  <p className="text-base font-medium">{detail.description}</p>
                </div>
              ))}
            </div>
          </PatientDetailsCard>

          <PatientDetailsCard icon={GraduationCapIcon} title="Contexto escolar">
            <div className="space-y-3">
              {schoolDetails.map((detail) => (
                <div key={detail.title}>
                  <h4 className="text-sm text-muted-foreground">
                    {detail.title}
                  </h4>
                  <p className="text-base font-medium">{detail.description}</p>
                </div>
              ))}
            </div>
          </PatientDetailsCard>
        </div>

        <PatientDetailsCard icon={HospitalIcon} title="Contexto clínico">
          <div className="space-y-3">
            {clinicalDetails.map((detail) => (
              <div key={detail.title}>
                <h4 className="text-sm text-muted-foreground">
                  {detail.title}
                </h4>
                <p className="text-base font-medium">{detail.description}</p>
              </div>
            ))}
          </div>
        </PatientDetailsCard>
      </section>
    </>
  )
}
