import { Trash2Icon } from 'lucide-react'
import { type PropsWithChildren, useTransition } from 'react'
import { Loader } from './loader'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
} from './ui/alert-dialog'

interface DeleteAlertDialogProps extends PropsWithChildren {
  open: boolean
  onConfirm: () => void | Promise<void>
  onCancel: () => void | Promise<void>
}

export function DeleteAlertDialog({
  open,
  onConfirm,
  onCancel,
  children,
}: DeleteAlertDialogProps) {
  const [isConfirmPending, startConfirmTransition] = useTransition()
  const [isCancelPending, startCancelTransition] = useTransition()

  function handleCancel() {
    startCancelTransition(async () => {
      await onCancel()
    })
  }

  function handleConfirm() {
    startConfirmTransition(async () => {
      await onConfirm()
    })
  }

  return (
    <AlertDialog open={open}>
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogMedia className="size-10 bg-destructive/10 text-destructive">
            <Trash2Icon className="size-4" />
          </AlertDialogMedia>
          <AlertDialogTitle className="font-bold">
            Tem certeza disso?
          </AlertDialogTitle>

          {children}
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            variant="secondary"
            onClick={handleCancel}
            disabled={isCancelPending || isConfirmPending}
          >
            {isCancelPending ? <Loader /> : 'Cancelar'}
          </AlertDialogCancel>
          <AlertDialogAction
            variant="destructive"
            onClick={handleConfirm}
            disabled={isConfirmPending || isCancelPending}
          >
            {isConfirmPending ? <Loader /> : 'Confirmar'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
