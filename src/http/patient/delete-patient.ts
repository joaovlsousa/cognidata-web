import { api } from '@/lib/axios'

export interface DeletePatientRequest {
  patientId: string
}

export async function deletePatient({
  patientId,
}: DeletePatientRequest): Promise<void> {
  await api.delete(`/patients/${patientId}`)
}
