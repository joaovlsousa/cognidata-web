import { zodResolver } from '@hookform/resolvers/zod'
import { MailIcon } from 'lucide-react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { Loader } from '@/components/loader'
import { Button } from '@/components/ui/button'
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from '@/components/ui/field'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group'
import { useGenerateOtpCode } from '@/hooks/http/auth/use-generate-otp-code'
import { OTP_TTL_MS } from '../../forgot-password/-types'

const schema = z.object({
  email: z.email('Informe um email válido'),
})

type FormValues = z.infer<typeof schema>

interface ForgotPasswordStepEmailProps {
  defaultEmail?: string
  onSuccess: (email: string, expiresAt: number) => void
}

export function ForgotPasswordStepEmail({
  defaultEmail,
  onSuccess,
}: ForgotPasswordStepEmailProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: defaultEmail ?? '',
    },
  })

  const generateOtpCodeMutation = useGenerateOtpCode()

  async function onSubmit(values: FormValues) {
    await generateOtpCodeMutation.mutateAsync(values)

    if (generateOtpCodeMutation.error) {
      form.setError('email', {
        message: generateOtpCodeMutation.error.message,
      })

      return
    }

    toast.success('Código enviado com sucesso')

    const expiresAt = Date.now() + OTP_TTL_MS
    onSuccess(values.email, expiresAt)
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <Controller
        name="email"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field aria-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="email">E-mail</FieldLabel>
            <InputGroup>
              <InputGroupAddon>
                <MailIcon />
              </InputGroupAddon>

              <InputGroupInput
                id="email"
                placeholder="seu.email@exemplo.com"
                autoComplete="off"
                aria-invalid={fieldState.invalid}
                autoFocus
                {...field}
              />
            </InputGroup>

            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}

            <FieldDescription>
              Informe seu email cadastrado na plataforma para receber um código
              de verificação.
            </FieldDescription>
          </Field>
        )}
      />

      <Button
        type="submit"
        size="lg"
        className="w-full"
        disabled={generateOtpCodeMutation.isPending}
      >
        {generateOtpCodeMutation.isPending ? (
          <>
            <Loader />
            <span>Enviando...</span>
          </>
        ) : (
          'Enviar código'
        )}
      </Button>
    </form>
  )
}
