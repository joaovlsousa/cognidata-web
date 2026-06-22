import { AxiosError } from 'axios'
import { toast } from 'sonner'

export function handleHttpError(error: Error) {
  const messageTitle = 'Ops... Algo não saiu como o esperado!'
  let messageDescription = 'Tente novamente mais tarde'

  if (error instanceof AxiosError) {
    messageDescription =
      error.response?.data.message ?? 'Tente novamente mais tarde'
  }

  toast.error(messageTitle, {
    description: messageDescription,
  })
}
