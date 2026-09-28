import { useMutation } from '@tanstack/react-query'
import { type EditProfileRequest, editProfile } from '@/http/user/edit-profile'
import type { GetProfileResponse } from '@/http/user/get-profile'
import { handleHttpError } from '../_errors/handle-http-error'

export function useEditProfile() {
  return useMutation({
    mutationFn: (payload: EditProfileRequest) => editProfile(payload),
    onSuccess: (_data, variables, _onMutateResult, context) => {
      context.client.setQueryData<GetProfileResponse>(['profile'], (data) => {
        if (!data) {
          return data
        }

        const response: GetProfileResponse = {
          user: {
            ...data.user,
            name: variables.name,
          },
        }

        return response
      })
    },
    onError: handleHttpError,
  })
}
