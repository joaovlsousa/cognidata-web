import { useMutation } from '@tanstack/react-query'
import {
  type CreateContactRequest,
  createContact,
} from '@/http/contact/create-contact'
import { handleHttpError } from '../_errors/handle-http-error'

export function useCreateContact() {
  return useMutation({
    mutationFn: (payload: CreateContactRequest) => createContact(payload),
    onError: handleHttpError,
  })
}
