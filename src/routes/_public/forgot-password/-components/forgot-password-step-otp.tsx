import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowLeftIcon, HashIcon } from 'lucide-react'
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
import { useVerifyOtpCode } from '@/hooks/http/auth/use-verify-otp-code'
import { useCountdown } from '@/hooks/use-countdown'
import { ForgotPasswordExpiredState } from './forgot-password-expired-state'

const schema = z.object({
  otpCode: z
    .string()
    .min(1, 'Informe o código')
    .length(6, 'O código tem 6 dígitos')
    .refine(
      (value) => value.replace(/\D/g, '').length === 6,
      'Informe um código válido'
    ),
})

type FormValues = z.infer<typeof schema>

interface ForgotPasswordStepOtpProps {
  email: string
  expiresAt: number
  onSuccess: () => void
  onBack: () => void
  onRestart: () => void
}

export function ForgotPasswordStepOtp({
  email,
  expiresAt,
  onSuccess,
  onBack,
  onRestart,
}: ForgotPasswordStepOtpProps) {
  const { minutes, seconds, expired } = useCountdown(expiresAt)

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      otpCode: '',
    },
  })

  const verifyOtpCodeMutation = useVerifyOtpCode()

  async function onSubmit(values: FormValues) {
    await verifyOtpCodeMutation.mutateAsync({ email, code: values.otpCode })

    if (verifyOtpCodeMutation.error) {
      form.setError('otpCode', {
        message: verifyOtpCodeMutation.error.message,
      })

      return
    }

    toast.success('Código confirmado com sucesso')
    onSuccess()
  }

  if (expired) {
    return (
      <ForgotPasswordExpiredState
        title="Código expirado"
        description="O código enviado para o seu e-mail expirou."
        onRestart={onRestart}
      />
    )
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <Controller
        control={form.control}
        name="otpCode"
        render={({ field, fieldState }) => (
          <Field aria-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="otpCode">Código</FieldLabel>
            <InputGroup>
              <InputGroupAddon>
                <HashIcon />
              </InputGroupAddon>

              <InputGroupInput
                id="otpCode"
                {...field}
                inputMode="numeric"
                maxLength={6}
                placeholder="000000"
                autoFocus
                onChange={(e) =>
                  field.onChange(e.target.value.replace(/\D/g, ''))
                }
                aria-invalid={fieldState.invalid}
              />
            </InputGroup>

            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}

            <FieldDescription>
              Informe o código enviado para seu email
            </FieldDescription>

            <FieldDescription>
              O código expira em{' '}
              <span className="font-medium text-primary">
                {minutes}:{seconds.toString().padStart(2, '0')}
              </span>
            </FieldDescription>
          </Field>
        )}
      />

      <div className="flex items-center justify-between gap-x-3">
        <Button
          type="button"
          variant="secondary"
          size="lg"
          className="px-10"
          onClick={onBack}
        >
          <ArrowLeftIcon />

          <span>Voltar</span>
        </Button>

        <Button
          type="submit"
          disabled={verifyOtpCodeMutation.isPending}
          className="flex-1"
        >
          {verifyOtpCodeMutation.isPending ? (
            <>
              <Loader />
              <span>Verificando código...</span>
            </>
          ) : (
            'Verificar código'
          )}
        </Button>
      </div>
    </form>
  )
}
