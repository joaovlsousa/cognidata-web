import { standardSchemaResolver } from '@hookform/resolvers/standard-schema'
import { useNavigate } from '@tanstack/react-router'
import {
  Calendar1Icon,
  CircleQuestionMarkIcon,
  InfoIcon,
  MailIcon,
  PhoneIcon,
  SaveIcon,
  SchoolIcon,
  UserIcon,
} from 'lucide-react'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { Loader } from '@/components/loader'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { useEditPatient } from '@/hooks/http/patient/use-edit-patient'
import type { GetPatientResponse } from '@/http/patient/get-patient'
import { cn, compareObjectValues, maskPhone } from '@/lib/utils'
import {
  genderOptions,
  kinshipOptions,
  scheduleOptions,
  schoolYearOptions,
} from '../-options/edit-patient-form-options'
import {
  type EditPatientSchema,
  editPatientSchema,
} from '../-schemas/edit-patient-schema'

interface EditPatientFormProps {
  patient: GetPatientResponse['patient']
}

export function EditPatientForm({ patient }: EditPatientFormProps) {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false)

  const form = useForm<EditPatientSchema>({
    resolver: standardSchemaResolver(editPatientSchema),
    defaultValues: {
      ...patient,
      dateOfBirth: new Date(`${patient.dateOfBirth}T00:00:00`),
      patientResponsiblePhone: maskPhone(patient.patientResponsiblePhone),
      medicalObservations: patient.medicalObservations ?? '',
    },
  })

  const navigate = useNavigate()
  const editPatientMutation = useEditPatient()

  async function handleSubmit(values: EditPatientSchema) {
    const dateOfBirth = values.dateOfBirth.toISOString().split('T')[0]

    const newValues = {
      ...values,
      dateOfBirth,
    }

    const { id, applicatorId, createdAt, cpf, ...oldValues } = patient
    const isSameValues = compareObjectValues(oldValues, newValues)

    if (isSameValues) {
      toast.info('Não há nada para ser atualizado')

      return
    }

    await editPatientMutation.mutateAsync({
      ...values,
      dateOfBirth,
      patientId: patient.id,
    })

    toast.success('Dados do paciente atualizados com sucesso')

    navigate({ to: '/patients' })
  }

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
      <Card>
        <CardHeader className="flex items-center gap-2.5">
          <div className="size-7 grid place-items-center rounded-full bg-primary text-sm font-medium text-background">
            1
          </div>
          <CardTitle className="text-lg font-bold">
            Informações do paciente
          </CardTitle>
        </CardHeader>

        <CardContent>
          <FieldGroup className="grid grid-cols-[60%_1fr]">
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="name">Nome completo</FieldLabel>
                  <InputGroup>
                    <InputGroupInput
                      {...field}
                      placeholder="Nome completo do paciente"
                      aria-invalid={fieldState.invalid}
                      autoComplete="off"
                      spellCheck={false}
                    />
                    <InputGroupAddon>
                      <UserIcon />
                    </InputGroupAddon>
                  </InputGroup>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="dateOfBirth"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="dateOfBirth">
                    Data de nascimento
                  </FieldLabel>
                  <Popover
                    open={isDatePickerOpen}
                    onOpenChange={setIsDatePickerOpen}
                  >
                    <PopoverTrigger
                      render={
                        <Button
                          variant="outline"
                          id="date"
                          className={cn(
                            'justify-start font-normal text-muted-foreground ring-input hover:text-muted-foreground',
                            field.value && 'text-foreground',
                            fieldState.invalid &&
                              'border border-destructive ring-3 ring-destructive/20'
                          )}
                        >
                          <Calendar1Icon className="text-primary" />
                          <span>
                            {field.value
                              ? field.value.toLocaleDateString()
                              : 'Selecione a data de nascimento'}
                          </span>
                        </Button>
                      }
                    />
                    <PopoverContent
                      className="w-auto overflow-hidden p-0"
                      align="start"
                    >
                      <Calendar
                        mode="single"
                        selected={field.value}
                        defaultMonth={field.value}
                        captionLayout="dropdown"
                        onSelect={(date) => {
                          field.onChange(date)
                          setIsDatePickerOpen(false)
                        }}
                      />
                    </PopoverContent>
                  </Popover>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="gender"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="max-w-1/2">
                  <FieldLabel htmlFor="gender">Gênero</FieldLabel>
                  <Select
                    items={genderOptions}
                    name={field.name}
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger
                      id="gender"
                      aria-invalid={fieldState.invalid}
                    >
                      <SelectValue placeholder="Selecione o gênero" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Masculino</SelectItem>
                      <SelectItem value="female">Feminino</SelectItem>
                    </SelectContent>
                  </Select>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex items-center gap-2.5">
          <div className="size-7 grid place-items-center rounded-full bg-primary text-sm font-medium text-background">
            2
          </div>
          <CardTitle className="text-lg font-bold">
            Informações do responsável
          </CardTitle>
        </CardHeader>

        <CardContent>
          <FieldGroup className="grid grid-cols-[60%_1fr]">
            <Controller
              name="patientResponsibleName"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="patientResponsibleName">
                    Nome completo
                  </FieldLabel>
                  <InputGroup>
                    <InputGroupInput
                      {...field}
                      placeholder="Nome completo do responsável"
                      aria-invalid={fieldState.invalid}
                      autoComplete="off"
                      spellCheck={false}
                    />
                    <InputGroupAddon>
                      <UserIcon />
                    </InputGroupAddon>
                  </InputGroup>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="patientResponsibleKinship"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="patientResponsibleKinship">
                    Parentesco
                  </FieldLabel>
                  <Select
                    items={kinshipOptions}
                    name={field.name}
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger
                      id="patientResponsibleKinship"
                      aria-invalid={fieldState.invalid}
                    >
                      <SelectValue placeholder="Selecione uma opção" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="father/mother">Pai/Mãe</SelectItem>
                      <SelectItem value="grandfather/grandmother">
                        Avô/Avó
                      </SelectItem>
                      <SelectItem value="uncle/aunt">Tio/Tia</SelectItem>
                    </SelectContent>
                  </Select>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="patientResponsibleEmail"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="patientResponsibleEmail">
                    Email do responsável
                  </FieldLabel>
                  <InputGroup>
                    <InputGroupInput
                      {...field}
                      placeholder="seu.email@dominio.com"
                      aria-invalid={fieldState.invalid}
                      autoComplete="off"
                      spellCheck={false}
                    />
                    <InputGroupAddon>
                      <MailIcon />
                    </InputGroupAddon>
                  </InputGroup>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="patientResponsiblePhone"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="patientResponsiblePhone">
                    Telefone do responsável
                  </FieldLabel>
                  <InputGroup>
                    <InputGroupInput
                      {...field}
                      onChange={(e) =>
                        field.onChange(maskPhone(e.target.value))
                      }
                      placeholder="(99) 94002-8922"
                      aria-invalid={fieldState.invalid}
                      autoComplete="off"
                      spellCheck={false}
                    />
                    <InputGroupAddon>
                      <PhoneIcon />
                    </InputGroupAddon>
                  </InputGroup>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex items-center gap-2.5">
          <div className="size-7 grid place-items-center rounded-full bg-primary text-sm font-medium text-background">
            3
          </div>
          <CardTitle className="text-lg font-bold">Contexto escolar</CardTitle>
        </CardHeader>

        <CardContent>
          <FieldGroup className="grid grid-cols-[50%_1fr_1fr]">
            <Controller
              name="schoolName"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="schoolName">Nome da escola</FieldLabel>
                  <InputGroup>
                    <InputGroupInput
                      {...field}
                      placeholder="Nome da escola"
                      aria-invalid={fieldState.invalid}
                      autoComplete="off"
                      spellCheck={false}
                    />
                    <InputGroupAddon>
                      <SchoolIcon />
                    </InputGroupAddon>
                  </InputGroup>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="schoolYear"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="schoolYear">Ano escolar</FieldLabel>
                  <Select
                    items={schoolYearOptions}
                    name={field.name}
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger
                      id="schoolYear"
                      aria-invalid={fieldState.invalid}
                    >
                      <SelectValue placeholder="Selecione uma opção" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 6 }).map((_, index) => (
                        <SelectItem
                          // biome-ignore lint/suspicious/noArrayIndexKey: <>
                          key={`schoolNchoolYear-${index + 1}`}
                          value={index + 1}
                        >
                          {index + 1}° ano
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="schoolSchedule"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="schoolSchedule">Turno</FieldLabel>
                  <Select
                    items={scheduleOptions}
                    name={field.name}
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger
                      id="schoolSchedule"
                      aria-invalid={fieldState.invalid}
                    >
                      <SelectValue placeholder="Selecione uma opção" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="morning">Manhã</SelectItem>
                      <SelectItem value="afternoon">Tarde</SelectItem>
                      <SelectItem value="fullTime">Integral</SelectItem>
                    </SelectContent>
                  </Select>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex items-center gap-2.5">
          <div className="size-7 grid place-items-center rounded-full bg-primary text-sm font-medium text-background">
            4
          </div>
          <CardTitle className="text-lg font-bold">
            Informações clínicas
          </CardTitle>
        </CardHeader>

        <CardContent>
          <FieldGroup>
            <Controller
              name="medicalChiefComplaint"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="medicalChiefComplaint">
                    Queixa principal
                  </FieldLabel>
                  <InputGroup>
                    <InputGroupInput
                      {...field}
                      placeholder="Queixa principal"
                      aria-invalid={fieldState.invalid}
                      autoComplete="off"
                      spellCheck={false}
                    />
                    <InputGroupAddon>
                      <CircleQuestionMarkIcon />
                    </InputGroupAddon>
                  </InputGroup>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="medicalObservations"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="medicalObservations">
                    Observações iniciais
                  </FieldLabel>
                  <Textarea
                    {...field}
                    aria-invalid={fieldState.invalid}
                    autoComplete="off"
                    spellCheck={false}
                    className="h-48 resize-none"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}

                  <FieldDescription>
                    <div className="flex items-center gap-x-1">
                      <InfoIcon className="size-4 mb-0.5" />
                      <span>Campo opcional</span>
                    </div>
                  </FieldDescription>
                </Field>
              )}
            />
          </FieldGroup>
        </CardContent>
      </Card>

      <Button
        type="submit"
        size="lg"
        className="px-6"
        disabled={editPatientMutation.isPending}
      >
        {editPatientMutation.isPending ? <Loader /> : <SaveIcon />}
        <span>
          {editPatientMutation.isPending
            ? 'Salvando paciente'
            : 'Salvar e continuar'}
        </span>
      </Button>
    </form>
  )
}
