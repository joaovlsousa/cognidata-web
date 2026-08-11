import { Link } from '@tanstack/react-router'
import {
  InfoIcon,
  MoreHorizontalIcon,
  SquarePenIcon,
  Trash2Icon,
} from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'
import { DeleteAlertDialog } from '@/components/delete-alert-dialog'
import { AlertDialogDescription } from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { TableCell } from '@/components/ui/table'
import { useDeletePatient } from '@/hooks/http/patient/use-delete-patient'

interface PatientsTableActionsProps {
  patient: {
    id: string
    name: string
  }
}

export function PatientsTableActions({ patient }: PatientsTableActionsProps) {
  const [patientToDelete, setPatientToDelete] = useState<{
    id: string
    name: string
  } | null>(null)

  const deletePatientMutation = useDeletePatient()

  async function handleDeletePatient() {
    if (!patientToDelete) {
      return
    }

    await deletePatientMutation.mutateAsync({ patientId: patientToDelete.id })

    toast.success('Paciente excluído com sucesso')

    setPatientToDelete(null)
  }

  return (
    <>
      <DeleteAlertDialog
        open={!!patientToDelete}
        onConfirm={handleDeletePatient}
        onCancel={() => setPatientToDelete(null)}
      >
        <AlertDialogDescription>
          Ao continuar, você apagará todos os dados do paciente{' '}
          <span className="text-foreground font-medium">
            {patientToDelete?.name}
          </span>
          .
        </AlertDialogDescription>
      </DeleteAlertDialog>

      <TableCell className="pr-3 text-right">
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button variant="ghost" size="icon" className="size-8">
                <MoreHorizontalIcon />
                <span className="sr-only">Open menu</span>
              </Button>
            }
          />
          <DropdownMenuContent align="end" className="min-w-fit">
            <DropdownMenuGroup>
              <DropdownMenuLabel>Ações</DropdownMenuLabel>

              <Link
                to="/patients/$patientId"
                params={{ patientId: patient.id }}
              >
                <DropdownMenuItem>
                  <InfoIcon className="text-primary hover:text-primary" />
                  <span>Detalhes do paciente</span>
                </DropdownMenuItem>
              </Link>

              <Link
                to="/patients/$patientId/edit"
                params={{ patientId: patient.id }}
              >
                <DropdownMenuItem>
                  <SquarePenIcon className="text-primary hover:text-primary" />
                  <span>Atualizar dados</span>
                </DropdownMenuItem>
              </Link>

              <DropdownMenuSeparator />

              <DropdownMenuItem
                variant="destructive"
                onClick={() =>
                  setPatientToDelete({
                    id: patient.id,
                    name: patient.name,
                  })
                }
              >
                <Trash2Icon />
                <span>Excluir paciente</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </>
  )
}
