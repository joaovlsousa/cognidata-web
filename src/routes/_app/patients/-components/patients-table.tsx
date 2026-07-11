import { Link } from '@tanstack/react-router'
import { differenceInYears } from 'date-fns'
import {
  InfoIcon,
  MoreHorizontalIcon,
  SquarePenIcon,
  Trash2Icon,
} from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'
import { Loader } from '@/components/loader'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Badge } from '@/components/ui/badge'
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
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useDeletePatient } from '@/hooks/http/patient/use-delete-patient'
import { useGetPatients } from '@/hooks/http/patient/use-get-patients'
import { cn } from '@/lib/utils'

const perPageOptions = {
  10: '10 pacientes por página',
  15: '15 pacientes por página',
  20: '20 pacientes por página',
  25: '25 pacientes por página',
}

export function PatientsTable() {
  const [patientToDelete, setPatientToDelete] = useState<{
    id: string
    name: string
  } | null>(null)

  const {
    data: { patients },
  } = useGetPatients()
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
      <AlertDialog open={!!patientToDelete}>
        <AlertDialogContent size="sm">
          <AlertDialogHeader>
            <AlertDialogMedia className="size-10 bg-destructive/10 text-destructive">
              <Trash2Icon className="size-4" />
            </AlertDialogMedia>
            <AlertDialogTitle className="font-bold">
              Tem certeza disso?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Ao continuar, você apagará todos os dados do paciente{' '}
              <span className="text-foreground font-medium">
                {patientToDelete?.name}
              </span>
              .
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              variant="secondary"
              onClick={() => setPatientToDelete(null)}
            >
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction
              variant="destructive"
              onClick={handleDeletePatient}
            >
              {deletePatientMutation.isPending ? (
                <Loader />
              ) : (
                'Excluir paciente'
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="pl-3">Nome</TableHead>
            <TableHead>Idade</TableHead>
            <TableHead className="text-center">Última atividade</TableHead>
            <TableHead className="text-center">Status</TableHead>
            <TableHead className="pr-3 text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {patients.map((patient, i) => (
            <TableRow key={patient.id}>
              <TableCell className="pl-3 text-base font-medium">
                {patient.name}
              </TableCell>

              <TableCell>
                {differenceInYears(new Date(), patient.dateOfBirth)} anos
              </TableCell>

              <TableCell className="flex flex-col gap-1 text-center">
                <span>05/07/2026</span>
                <span className="text-xs text-muted-foreground">há 2 dias</span>
              </TableCell>

              <TableCell className="text-center">
                <Badge
                  className={cn(
                    'py-1 ring',
                    i % 3 === 0
                      ? 'bg-indigo-500/10 ring-indigo-500 text-indigo-500'
                      : 'bg-green-500/10 ring-green-500 text-green-500',
                    i % 4 === 0 &&
                      'bg-amber-500/10 ring-amber-500 text-amber-500'
                  )}
                >
                  {i % 4 === 0
                    ? 'Acompanhar'
                    : i % 3 === 0
                      ? 'Aguardando'
                      : 'Ativo'}
                </Badge>
              </TableCell>
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

                      <Link to="/patients">
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
            </TableRow>
          ))}
        </TableBody>

        <TableFooter>
          <TableRow>
            <TableCell colSpan={5} className="p-3">
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  Listando {patients.length} de 128 pacientes
                </p>

                <div className="flex items-center gap-x-6">
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious text="Página anterior" />
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink isActive>1</PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink>2</PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink>3</PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationEllipsis />
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationNext text="Próxima página" />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>

                  <Select items={perPageOptions} defaultValue={10}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>

                    <SelectContent>
                      {Object.entries(perPageOptions).map(([key, value]) => (
                        <SelectItem key={key} value={key}>
                          {value}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </>
  )
}
