import { api } from '@/lib/axios'

export async function signOut(): Promise<void> {
  await api.delete('/auth/sign-out')
}
