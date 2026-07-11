import { api } from '@/lib/axios'

export interface GetPatientsResponse {
  patients: {
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
  }[]
}

export async function getPatients(): Promise<GetPatientsResponse> {
  const response = await api.get<GetPatientsResponse>('/patients')

  return response.data
}
