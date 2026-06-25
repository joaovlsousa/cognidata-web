import { useQuery } from '@tanstack/react-query'
import { getProfile } from '@/http/user/get-profile'

export function useGetProfile() {
  return useQuery({
    queryKey: ['profile'],
    queryFn: getProfile,
  })
}
