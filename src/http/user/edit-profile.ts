import { api } from '@/lib/axios'

export interface EditProfileRequest {
  name: string
}

export async function editProfile(payload: EditProfileRequest): Promise<void> {
  await api.patch('/users/applicator', payload)
}
