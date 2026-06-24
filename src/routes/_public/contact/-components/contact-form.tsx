'use client'

import { standardSchemaResolver } from '@hookform/resolvers/standard-schema'
import { MailIcon, UserIcon } from 'lucide-react'
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { useCreateContact } from '@/hooks/http/contact/use-create-contact'

const formSchema = z.object({
  name: z.string().min(10, 'Informe seu nome completo'),
  email: z.email('Informe um email válido'),
  subject: z.string().min(1, 'Informe o assunto da mensagem'),
  message: z.string().min(10, 'Descreva mais sua mensagem'),
})

type FormSchema = z.infer<typeof formSchema>

const subjects = [
  'Suporte técnico',
  'Dúvidas sobre a plataforma',
  'Demonstração da plataforma',
]

export function ContactForm() {
  const createContactMutation = useCreateContact()
  const form = useForm<FormSchema>({
    resolver: standardSchemaResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
  })

  async function handleSubmit(values: FormSchema) {
    await createContactMutation.mutateAsync(values)

    toast.success('Mensagem enviada', {
      description:
        'Em breve, nossa equipe entrará em contato através do email fornecido',
      duration: 10 * 1000,
    })
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
          name="subject"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="subject">Assunto</FieldLabel>
              <Select
                name={field.name}
                value={field.value}
                onValueChange={field.onChange}
              >
                <SelectTrigger id="subject" aria-invalid={fieldState.invalid}>
                  <SelectValue placeholder="Selecione um assunto" />
                </SelectTrigger>
                <SelectContent>
                  {subjects.map((subject) => (
                    <SelectItem key={subject} value={subject}>
                      {subject}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="message"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="message">Messagem</FieldLabel>
              <Textarea
                {...field}
                id="message"
                aria-invalid={fieldState.invalid}
                placeholder="Escreva sua mensagem aqui..."
                className="h-44 resize-none"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Button
          type="submit"
          size="lg"
          className="w-full"
          disabled={createContactMutation.isPending}
        >
          {createContactMutation.isPending ? (
            <>
              <Loader className="animate-spin" />
              <span>Enviando mensagem</span>
            </>
          ) : (
            'Enviar mensagem'
          )}
        </Button>
      </FieldGroup>
    </form>
  )
}
