import { standardSchemaResolver } from '@hookform/resolvers/standard-schema'
import { IdCardIcon, MailIcon, SaveIcon, UserIcon } from 'lucide-react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { Loader } from '@/components/loader'
import { Button } from '@/components/ui/button'
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
import { useEditProfile } from '@/hooks/http/user/use-edit-profile'
import { useGetProfile } from '@/hooks/http/user/use-get-profile'
import { maskCRP } from '@/lib/utils'

const formSchema = z.object({
  name: z.string().min(10, 'Informe seu nome completo'),
  email: z.email(),
  crp: z.string(),
})

type FormSchema = z.infer<typeof formSchema>

export function ProfileDetails() {
  const {
    data: { user },
  } = useGetProfile()

  const form = useForm<FormSchema>({
    resolver: standardSchemaResolver(formSchema),
    defaultValues: {
      name: user.name,
      email: user.email,
      crp: maskCRP(user.crp ?? ''),
    },
  })

  const editProfileMutation = useEditProfile()

  async function handleSubmit(values: FormSchema) {
    if (values.name === user.name) {
      toast.info('Não há nada para ser atualizado')

      return
    }

    await editProfileMutation.mutateAsync({ name: values.name })

    toast.success('Nome atualizado com sucesso')
  }

  return (
    <form
      onSubmit={form.handleSubmit(handleSubmit)}
      className="max-w-2/3 mx-auto space-y-10"
    >
      <div className="grid place-items-center">
        <div className="size-24 grid place-items-center rounded-full bg-primary/10 ring ring-primary">
          <span className="text-4xl font-bold text-primary">
            {user.name[0].toUpperCase()}
          </span>
        </div>
      </div>

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
                  autoComplete="name"
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
            render={({ field }) => (
              <Field className="w-2/3">
                <FieldLabel htmlFor="email">Email profissional</FieldLabel>
                <InputGroup>
                  <InputGroupInput {...field} disabled autoComplete="email" />
                  <InputGroupAddon>
                    <MailIcon />
                  </InputGroupAddon>
                </InputGroup>
              </Field>
            )}
          />
          <Controller
            name="crp"
            control={form.control}
            render={({ field }) => (
              <Field className="w-1/3">
                <FieldLabel htmlFor="crp">CRP</FieldLabel>
                <InputGroup>
                  <InputGroupInput {...field} disabled />
                  <InputGroupAddon>
                    <IdCardIcon />
                  </InputGroupAddon>
                </InputGroup>
              </Field>
            )}
          />
        </Field>

        <Button
          type="submit"
          size="lg"
          className="max-w-fit px-6"
          disabled={editProfileMutation.isPending}
        >
          {editProfileMutation.isPending ? (
            <>
              <Loader />
              <span>Salvando alterações</span>
            </>
          ) : (
            <>
              <SaveIcon />
              <span>Salvar alterações</span>
            </>
          )}
        </Button>
      </FieldGroup>
    </form>
  )
}
