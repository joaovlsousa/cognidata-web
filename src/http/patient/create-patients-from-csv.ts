import { api } from '@/lib/axios'

export interface CreatePatientsFromCsvRequest {
  file: File
}

export async function createPatientsFromCsv({
  file,
}: CreatePatientsFromCsvRequest): Promise<void> {
  const payload = new FormData()
  payload.append('file', file)

  await api.post('/patients/csv', payload)
}
