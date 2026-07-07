import { standardSchemaResolver } from '@hookform/resolvers/standard-schema'
import {
  Calendar1Icon,
  CircleQuestionMarkIcon,
  MailIcon,
  PhoneIcon,
  SaveIcon,
  SchoolIcon,
  UserIcon,
} from 'lucide-react'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Field,
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
import { cn, maskPhone } from '@/lib/utils'

const patientSchema = z.object({
  name: z.string().min(1, 'Informe o nome do paciente'),
  dateOfBirth: z.date('Informe a data de nascimento').max(new Date()),
  gender: z.enum(['male', 'female'], 'Informe o gênero'),
})

const patientResponsibleSchema = z.object({
  name: z.string().min(1, 'Informe o nome do responsável'),
  kinship: z.enum(
    ['father/mother', 'grandfather/grandmother', 'uncle/aunt'],
    'Informe o parentesco'
  ),
  phone: z
    .string()
    .transform((v) => v.replace(/\D/g, ''))
    .refine((v) => v.length === 11, 'Informe um número de telefone válido'),
  email: z.email('Informe um email válido'),
})

const schoolSchema = z.object({
  name: z.string().min(1, 'Informe o nome da escola'),
  schoolYear: z.number('Informe o ano escolar').min(1).max(6),
  schedule: z.enum(['morning', 'afternoon', 'fullTime'], 'Informe o turno'),
})

const medicalSchema = z.object({
  chiefComplaint: z.string().min(1, 'Informe a queixa principal do paciente'),
  observations: z.string().transform((v) => (v?.length ? v : '')),
})

const formSchema = z.object({
  patientSchema,
  patientResponsibleSchema,
  schoolSchema,
  medicalSchema,
})

type FormSchema = z.infer<typeof formSchema>

const genderOptions = {
  male: 'Masculino',
  female: 'Feminino',
}

const kinshipOptions = {
  'father/mother': 'Pai/Mãe',
  'grandfather/grandmother': 'Avô/Avó',
  'uncle/aunt': 'Tio/Tia',
}

const schoolYearOptions = {
  1: '1° ano',
  2: '2° ano',
  3: '3° ano',
  4: '4° ano',
  5: '5° ano',
  6: '6° ano',
}

const scheduleOptions = {
  morning: 'Manhã',
  afternoon: 'Tarde',
  fullTime: 'Integral',
}

export function NewPatientForm() {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false)

  const form = useForm<FormSchema>({
    resolver: standardSchemaResolver(formSchema),
    defaultValues: {
      patientSchema: {
        name: '',
      },
      patientResponsibleSchema: {
        name: '',
        email: '',
        phone: '',
      },
      schoolSchema: {
        name: '',
      },
      medicalSchema: {
        chiefComplaint: '',
        observations: '',
      },
    },
  })

  async function handleSubmit(values: FormSchema) {
    await new Promise((resolve) => {
      setTimeout(resolve, 3000)
    })

    console.log(values)
    toast.success('Sucesso', {
      description: 'Paciente salvo com sucesso',
    })
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
              name="patientSchema.name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="patientSchema.name">
                    Nome completo
                  </FieldLabel>
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
              name="patientSchema.dateOfBirth"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="patientSchema.dateOfBirth">
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
                            field.value && 'text-foreground'
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
              name="patientSchema.gender"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="max-w-1/2">
                  <FieldLabel htmlFor="patientSchema.gender">Gênero</FieldLabel>
                  <Select
                    items={genderOptions}
                    name={field.name}
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger
                      id="patientSchema.gender"
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
              name="patientResponsibleSchema.name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="patientResponsibleSchema.name">
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
              name="patientResponsibleSchema.kinship"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="patientResponsibleSchema.kinship">
                    Parentesco
                  </FieldLabel>
                  <Select
                    items={kinshipOptions}
                    name={field.name}
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger
                      id="patientResponsibleSchema.kinship"
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
              name="patientResponsibleSchema.email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="patientResponsibleSchema.email">
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
              name="patientResponsibleSchema.phone"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="patientResponsibleSchema.phone">
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
              name="schoolSchema.name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="schoolSchema.name">
                    Nome da escola
                  </FieldLabel>
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
              name="schoolSchema.schoolYear"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="schoolSchema.schoolYear">
                    Ano escolar
                  </FieldLabel>
                  <Select
                    items={schoolYearOptions}
                    name={field.name}
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger
                      id="schoolSchema.schoolYear"
                      aria-invalid={fieldState.invalid}
                    >
                      <SelectValue placeholder="Selecione uma opção" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 6 }).map((_, idx) => (
                        <SelectItem
                          key={`schoolSchema.schoolYear-${
                            // biome-ignore lint/suspicious/noArrayIndexKey: <>
                            idx + 1
                          }`}
                          value={idx + 1}
                        >
                          {idx + 1}° ano
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
              name="schoolSchema.schedule"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="schoolSchema.schedule">Turno</FieldLabel>
                  <Select
                    items={scheduleOptions}
                    name={field.name}
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger
                      id="schoolSchema.schedule"
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
              name="medicalSchema.chiefComplaint"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="medicalSchema.chiefComplaint">
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
              name="medicalSchema.observations"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="medicalSchema.observations">
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
                </Field>
              )}
            />
          </FieldGroup>
        </CardContent>
      </Card>

      <Button type="submit" size="lg" className="px-6">
        <SaveIcon />
        <span>Salvar e continuar</span>
      </Button>
    </form>
  )
}
