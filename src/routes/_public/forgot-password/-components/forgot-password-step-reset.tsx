import { zodResolver } from '@hookform/resolvers/zod'
import { EyeIcon, EyeOffIcon, LockIcon } from 'lucide-react'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { Loader } from '@/components/loader'
import { Button } from '@/components/ui/button'
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group'
import { useResetPassword } from '@/hooks/http/auth/use-reset-password'
import { useCountdown } from '@/hooks/use-countdown'
import { ForgotPasswordExpiredState } from './forgot-password-expired-state'

const schema = z.object({
  password: z.string().min(6, 'Mínimo de 6 caracteres'),
})

type FormValues = z.infer<typeof schema>

interface ForgotPasswordStepResetProps {
  email: string
  expiresAt: number
  onSuccess: () => void
  onRestart: () => void
}

export function ForgotPasswordStepReset({
  email,
  expiresAt,
  onSuccess,
  onRestart,
}: ForgotPasswordStepResetProps) {
  const [showPassword, setShowPassword] = useState(false)

  const { minutes, seconds, expired } = useCountdown(expiresAt)

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      password: '',
    },
  })

  const resetPasswordMutation = useResetPassword()

  async function onSubmit(values: FormValues) {
    await resetPasswordMutation.mutateAsync({
      email,
      password: values.password,
    })

    if (resetPasswordMutation.error) {
      form.setError('password', {
        message: resetPasswordMutation.error.message,
      })

      return
    }

    toast.success('Senha alterada com sucesso')
    onSuccess()
  }

  if (expired) {
    return (
      <ForgotPasswordExpiredState
        title="Tempo expirado"
        description="O tempo para redefinir sua senha esgotou."
        onRestart={onRestart}
      />
    )
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-2">
      <FieldGroup>
        <Controller
          control={form.control}
          name="password"
          render={({ field, fieldState }) => (
            <Field aria-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Nova senha</FieldLabel>
              <InputGroup>
                <InputGroupAddon>
                  <LockIcon />
                </InputGroupAddon>

                <InputGroupInput
                  type={showPassword ? 'text' : 'password'}
                  placeholder="******"
                  autoFocus
                  {...field}
                />

                <InputGroupAddon
                  align="inline-end"
                  className="cursor-pointer"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                </InputGroupAddon>
              </InputGroup>

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}

              <FieldDescription>Informe a sua nova senha</FieldDescription>

              <FieldDescription>
                Tempo restante:{' '}
                <span className="font-medium text-primary">
                  {minutes}:{seconds.toString().padStart(2, '0')}
                </span>
              </FieldDescription>
            </Field>
          )}
        />

        <Button
          type="submit"
          className="w-full"
          disabled={resetPasswordMutation.isPending}
        >
          {resetPasswordMutation.isPending ? (
            <>
              <Loader />
              <span>Atualizando senha...</span>
            </>
          ) : (
            'Atualizar senha'
          )}
        </Button>
      </FieldGroup>
    </form>
  )
}
