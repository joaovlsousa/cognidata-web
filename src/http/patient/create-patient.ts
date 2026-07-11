import { api } from '@/lib/axios'

export interface CreatePatientRequest {
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

export async function createPatient(
  payload: CreatePatientRequest
): Promise<void> {
  await api.post('/patients', payload)
}
