import cookies from 'js-cookie'
import { z } from 'zod'

const userRoleSchema = z.enum(['admin', 'applicator'])
type UserRole = z.infer<typeof userRoleSchema> | null

export function useAuth() {
  const { data } = userRoleSchema.safeParse(cookies.get('role'))
  const role: UserRole = data ?? null

  const user = {
    role,
    isAuthenticated: !!role,
  }

  return {
    user,
  }
}
