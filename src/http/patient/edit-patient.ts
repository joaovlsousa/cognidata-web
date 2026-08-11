import { api } from '@/lib/axios'

export interface EditPatientRequest {
  patientId: string
  name: string
  dateOfBirth: string
  gender: 'male' | 'female'
  patientResponsibleName: string
  patientResponsibleKinship:
    | 'father/mother'
    | 'grandfather/grandmother'
    | 'uncle/aunt'
  patientResponsiblePhone: string
  patientResponsibleEmail: string
  schoolName: string
  schoolYear: number
  schoolSchedule: 'morning' | 'afternoon' | 'fullTime'
  medicalChiefComplaint: string
  medicalObservations: string | undefined
}

export async function editPatient({
  patientId,
  ...payload
}: EditPatientRequest): Promise<void> {
  await api.put(`/patients/${patientId}`, payload)
}
