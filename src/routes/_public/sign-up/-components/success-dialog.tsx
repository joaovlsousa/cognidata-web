import { Link } from '@tanstack/react-router'
import {
  BellIcon,
  CircleCheckBigIcon,
  MailIcon,
  PartyPopperIcon,
} from 'lucide-react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'

export function SuccessDialog() {
  return (
    <AlertDialog open>
      <AlertDialogContent>
        <AlertDialogHeader>
          <div className="w-full flex flex-col items-center justify-center">
            <CircleCheckBigIcon className="text-primary animate-bounce" />
            <AlertDialogTitle>Solicitação enviada</AlertDialogTitle>
            <AlertDialogDescription>
              Acesso pendente de confirmação
            </AlertDialogDescription>
          </div>
        </AlertDialogHeader>

        <div className="space-y-3">
          <div className="flex gap-x-2">
            <MailIcon className="size-4 text-primary shrink-0 mt-1" />
            <AlertDialogDescription className="text-justify min-w-0">
              Sua solicitação foi enviada a nossa equipe de analistas. Em breve,
              entraremos em contato com você através do email fornecido para
              confirmar o seu acesso a plataforma.
            </AlertDialogDescription>
          </div>
          <div className="flex gap-x-2">
            <BellIcon className="size-4 text-primary shrink-0 mt-1" />
            <AlertDialogDescription className="text-justify min-w-0">
              Fique atento a sua caixa de entrada para utilizar a plataforma o
              quanto antes.
            </AlertDialogDescription>
          </div>
          <div className="flex gap-x-2">
            <PartyPopperIcon className="size-4 text-primary shrink-0 mt-1" />
            <AlertDialogDescription className="text-justify min-w-0">
              Desde já, agradecemos a sua solicitação de acesso a plataforma!{' '}
              <br />
              Atenciosamente, <br />
              Equipe PsicoHub.
            </AlertDialogDescription>
          </div>
        </div>

        <AlertDialogFooter>
          <Link to="/" className="w-full">
            <AlertDialogAction size="lg" className="w-full">
              Continuar explorando a plataforma
            </AlertDialogAction>
          </Link>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
