import { api } from '@/lib/axios'

export interface GetPatientRequest {
  patientId: string
}

export interface GetPatientResponse {
  patient: {
    id: string
    applicatorId: string
    name: string
    gender: 'male' | 'female'
    dateOfBirth: string
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
    medicalObservations: string | null
    createdAt: string
  }
}

export async function getPatient({
  patientId,
}: GetPatientRequest): Promise<GetPatientResponse> {
  const response = await api.get<GetPatientResponse>(`/patients/${patientId}`)

  return response.data
}
