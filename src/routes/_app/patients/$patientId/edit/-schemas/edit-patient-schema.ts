import type { z } from 'zod'
import { createPatientSchema } from '../../../new/-schemas/create-patient-schema'

export const editPatientSchema = createPatientSchema.omit({
  cpf: true,
})

export type EditPatientSchema = z.infer<typeof editPatientSchema>
