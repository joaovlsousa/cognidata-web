import { useParams } from '@tanstack/react-router'
import { differenceInYears } from 'date-fns'
import { Field, FieldLabel } from '@/components/ui/field'
import { Textarea } from '@/components/ui/textarea'
import { useGetPatient } from '@/hooks/http/patient/use-get-patient'
import { maskPhone } from '@/lib/utils'

export function PatientDetails() {
  const { patientId } = useParams({ from: '/_app/patients/$patientId/' })
  const {
    data: { patient },
  } = useGetPatient({ patientId })

  return (
    <section className="space-y-6">
      <div className="flex items-center gap-x-3">
        <div className="size-10 grid place-items-center ring text-primary rounded-full text-lg font-bold bg-primary/10 ring-primary">
          {patient.name[0].toUpperCase()}
        </div>

        <span className="text-lg font-bold">{patient.name}</span>
      </div>

      <ul className="space-y-3">
        <p className="text-base font-bold">Informações clínicas</p>
        <li className="text-muted-foreground">
          Idade:{' '}
          <span className="text-foreground font-bold">
            {differenceInYears(new Date(), `${patient.dateOfBirth}T00:00`)} anos
          </span>
        </li>
        <li className="text-muted-foreground">
          Gênero:{' '}
          <span className="text-foreground font-bold">{patient.gender}</span>
        </li>
        <li className="text-muted-foreground">
          Responsável:{' '}
          <span className="text-foreground font-bold">
            {patient.patientResponsibleName}
          </span>
        </li>
        <li className="text-muted-foreground">
          Contatos do responsável:{' '}
          <span className="text-foreground font-bold">
            {maskPhone(patient.patientResponsiblePhone)}
          </span>{' '}
          /{' '}
          <span className="text-foreground font-bold">
            {patient.patientResponsibleEmail}
          </span>
        </li>
      </ul>

      <Field>
        <FieldLabel>Observações</FieldLabel>
        <Textarea
          disabled
          value={patient.medicalObservations ?? ''}
          className="resize-none h-fit"
        />
      </Field>
    </section>
  )
}
