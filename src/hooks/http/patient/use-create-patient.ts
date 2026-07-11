import { useMutation } from '@tanstack/react-query'
import {
  type CreatePatientRequest,
  createPatient,
} from '@/http/patient/create-patient'
import { handleHttpError } from '../_errors/handle-http-error'

export function useCreatePatient() {
  return useMutation({
    mutationFn: (payload: CreatePatientRequest) => createPatient(payload),
    onError: handleHttpError,
  })
}
