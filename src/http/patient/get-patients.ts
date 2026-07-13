import { api } from '@/lib/axios'

export interface GetPatientsRequest {
  page: number
  perPage: number
  status: string
  name?: string
}

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
  meta: {
    page: number
    perPage: number
    total: number
    totalPages: number
  }
}

export async function getPatients({
  page,
  perPage,
  status,
  name,
}: GetPatientsRequest): Promise<GetPatientsResponse> {
  const response = await api.get<GetPatientsResponse>('/patients', {
    params: {
      page,
      perPage,
      status,
      name: name ?? undefined,
    },
  })

  return response.data
}
