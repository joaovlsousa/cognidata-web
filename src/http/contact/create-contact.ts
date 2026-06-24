import { api } from '@/lib/axios'

export interface CreateContactRequest {
  name: string
  email: string
  subject: string
  message: string
}

export async function createContact(
  payload: CreateContactRequest
): Promise<void> {
  await api.post('/contacts', payload)
}
