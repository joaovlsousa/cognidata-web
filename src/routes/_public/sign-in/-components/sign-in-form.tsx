'use client'

import { standardSchemaResolver } from '@hookform/resolvers/standard-schema'
import { Link, useNavigate } from '@tanstack/react-router'
import { EyeIcon, EyeOffIcon, LockIcon, MailIcon } from 'lucide-react'
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
import { useSignIn } from '@/hooks/http/auth/use-sign-in'

const formSchema = z.object({
  email: z.email('Informe um email válido'),
  password: z.string().min(1, 'Informe uma senha'),
})

type FormSchema = z.infer<typeof formSchema>

export function SignInForm() {
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  const signInMutation = useSignIn()
  const form = useForm<FormSchema>({
    resolver: standardSchemaResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  async function handleSubmit(values: FormSchema) {
    await signInMutation.mutateAsync(values)

    toast.success('Sucesso!', {
      description: 'Login efetuado com sucesso',
    })

    navigate({ to: '/app' })
  }

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)}>
      <FieldGroup>
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="email">Email profissional</FieldLabel>
              <InputGroup>
                <InputGroupInput
                  {...field}
                  placeholder="seu.email@dominio.com"
                  aria-invalid={fieldState.invalid}
                  autoComplete="off"
                  spellCheck={false}
                />
                <InputGroupAddon>
                  <MailIcon />
                </InputGroupAddon>
              </InputGroup>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="password">Senha</FieldLabel>
              <InputGroup>
                <InputGroupInput
                  {...field}
                  type={showPassword ? 'text' : 'password'}
                  placeholder="******"
                  aria-invalid={fieldState.invalid}
                  autoComplete="off"
                />
                <InputGroupAddon>
                  <LockIcon />
                </InputGroupAddon>
                <InputGroupAddon
                  align="inline-end"
                  className="cursor-pointer"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                </InputGroupAddon>
              </InputGroup>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              <FieldDescription className="text-end">
                <Link to="/forgot-password">Esqueci minha senha</Link>
              </FieldDescription>
            </Field>
          )}
        />

        <Button
          type="submit"
          size="lg"
          className="w-full"
          disabled={signInMutation.isPending}
        >
          {signInMutation.isPending ? (
            <>
              <Loader className="animate-spin" />
              <span>Entrando</span>
            </>
          ) : (
            'Entrar'
          )}
        </Button>
      </FieldGroup>
    </form>
  )
}
