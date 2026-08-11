import { z } from 'zod'

export const createPatientSchema = z.object({
  name: z.string().min(1, 'Informe o nome do paciente'),
  dateOfBirth: z.date('Informe a data de nascimento').max(new Date()),
  gender: z.enum(['male', 'female'], 'Informe o gênero'),
  cpf: z
    .string()
    .transform((v) => v.replace(/\D/g, ''))
    .refine((v) => v.length === 11, 'Informe um CPF válido'),
  patientResponsibleName: z.string().min(1, 'Informe o nome do responsável'),
  patientResponsibleKinship: z.enum(
    ['father/mother', 'grandfather/grandmother', 'uncle/aunt'],
    'Informe o parentesco'
  ),
  patientResponsiblePhone: z
    .string()
    .transform((v) => v.replace(/\D/g, ''))
    .refine((v) => v.length === 11, 'Informe um número de telefone válido'),
  patientResponsibleEmail: z.email('Informe um email válido'),
  schoolName: z.string().min(1, 'Informe o nome da escola'),
  schoolYear: z.number('Informe o ano escolar').min(1).max(6),
  schoolSchedule: z.enum(
    ['morning', 'afternoon', 'fullTime'],
    'Informe o turno'
  ),
  medicalChiefComplaint: z
    .string()
    .min(1, 'Informe a queixa principal do paciente'),
  medicalObservations: z.string().transform((v) => (v?.length ? v : '')),
})

export type CreatePatientSchema = z.infer<typeof createPatientSchema>
