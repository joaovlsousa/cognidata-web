'use client'

import { standardSchemaResolver } from '@hookform/resolvers/standard-schema'
import { Link } from '@tanstack/react-router'
import {
  EyeIcon,
  EyeOffIcon,
  IdCardIcon,
  LockIcon,
  MailIcon,
  UserIcon,
} from 'lucide-react'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import { Loader } from '@/components/loader'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group'
import { useSignUp } from '@/hooks/http/applicator/use-sign-up'
import { cn, maskCRP } from '@/lib/utils'

const formSchema = z
  .object({
    name: z.string().min(10, 'Informe seu nome completo'),
    email: z.email('Informe um email válido'),
    crp: z
      .string()
      .transform((v) => v.replace(/\D/g, ''))
      .refine((v) => v.length === 7, 'Informe um CRP válido'),
    password: z.string().min(6, 'Utilize uma senha com mais de 5 caracteres'),
    confirmPassword: z
      .string()
      .min(6, 'Utilize uma senha com mais de 5 caracteres'),
  })
  .superRefine((values, ctx) => {
    if (values.password !== values.confirmPassword) {
      ctx.addIssue({
        code: 'custom',
        message: 'As senhas precisam ser iguais',
        path: ['password'],
      })

      ctx.addIssue({
        code: 'custom',
        message: 'As senhas precisam ser iguais',
        path: ['confirmPassword'],
      })
    }
  })

type FormSchema = z.infer<typeof formSchema>

interface SignUpFormProps {
  onSubmitSuccess: () => void
}

export function SignUpForm({ onSubmitSuccess }: SignUpFormProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isAcceptTerms, setIsAcceptTerms] = useState(false)
  const [acceptTermsError, setAcceptTermsError] = useState<string | null>(null)

  const signUpMutation = useSignUp()
  const form = useForm<FormSchema>({
    resolver: standardSchemaResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      crp: '',
      password: '',
      confirmPassword: '',
    },
  })

  function handleAccepTerms(value: boolean) {
    if (value && acceptTermsError) {
      setAcceptTermsError(null)
    }

    if (!value) {
      setAcceptTermsError('Para continuar, aceite os termos de uso')
    }

    setIsAcceptTerms(value)
  }

  async function handleSubmit(values: FormSchema) {
    if (!isAcceptTerms) {
      setAcceptTermsError('Para continuar, aceite os termos de uso')

      return
    }

    await signUpMutation.mutateAsync(values)

    onSubmitSuccess()
  }

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)}>
      <FieldGroup>
        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="name">Nome completo</FieldLabel>
              <InputGroup>
                <InputGroupInput
                  {...field}
                  placeholder="Seu nome completo"
                  aria-invalid={fieldState.invalid}
                  autoComplete="off"
                  spellCheck={false}
                />
                <InputGroupAddon>
                  <UserIcon />
                </InputGroupAddon>
              </InputGroup>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Field orientation="horizontal" className="items-start">
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="w-2/3">
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
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="crp"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="w-1/3">
                <FieldLabel htmlFor="crp">CRP</FieldLabel>
                <InputGroup>
                  <InputGroupInput
                    {...field}
                    onChange={(e) => field.onChange(maskCRP(e.target.value))}
                    placeholder="12/34567"
                    aria-invalid={fieldState.invalid}
                    autoComplete="off"
                    spellCheck={false}
                  />
                  <InputGroupAddon>
                    <IdCardIcon />
                  </InputGroupAddon>
                </InputGroup>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </Field>

        <Field orientation="horizontal" className="items-start">
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
                    spellCheck={false}
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
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="confirmPassword"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="confirmPassword">
                  Confirme sua senha
                </FieldLabel>
                <InputGroup>
                  <InputGroupInput
                    {...field}
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="******"
                    aria-invalid={fieldState.invalid}
                    autoComplete="off"
                    spellCheck={false}
                  />
                  <InputGroupAddon>
                    <LockIcon />
                  </InputGroupAddon>
                  <InputGroupAddon
                    align="inline-end"
                    className="cursor-pointer"
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                  >
                    {showConfirmPassword ? <EyeOffIcon /> : <EyeIcon />}
                  </InputGroupAddon>
                </InputGroup>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </Field>

        <FieldGroup>
          <Field orientation="horizontal">
            <Checkbox
              id="terms"
              checked={isAcceptTerms}
              onCheckedChange={handleAccepTerms}
              className={cn(
                'cursor-pointer',
                acceptTermsError && 'ring ring-destructive border-none'
              )}
            />

            <FieldLabel
              htmlFor="terms"
              className="text-muted-foreground font-medium"
            >
              Li e aceito os{' '}
              <Link to="/terms" className="text-primary">
                Termos de uso
              </Link>{' '}
              e a{' '}
              <Link to="/privacy" className="text-primary">
                Política de privacidade
              </Link>{' '}
              do CogniDataHub.
            </FieldLabel>
          </Field>

          {acceptTermsError && (
            <FieldError
              errors={[{ message: acceptTermsError }]}
              className="-mt-3 ml-7"
            />
          )}
        </FieldGroup>

        <Button
          type="submit"
          size="lg"
          className="w-full"
          disabled={signUpMutation.isPending}
        >
          {signUpMutation.isPending ? (
            <>
              <Loader className="animate-spin" />
              <span>Solicitando acesso</span>
            </>
          ) : (
            'Solicitar acesso'
          )}
        </Button>
      </FieldGroup>
    </form>
  )
}
