import { createFileRoute, Link } from '@tanstack/react-router'
import { DownloadIcon, Trash2Icon, UserPlusIcon } from 'lucide-react'
import { Suspense, useState } from 'react'
import { toast } from 'sonner'
import { DeleteAlertDialog } from '@/components/delete-alert-dialog'
import { AlertDialogDescription } from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { useDeletePatientsByIdList } from '@/hooks/http/patient/use-delete-patients-by-id-list'
import { usePatientsToDelete } from '@/hooks/use-patients-to-delete'
import { AppHeader } from '../-components/app-header'
import { MetadataSection } from '../-components/metadata-section'
import { PatientsPopoverFilters } from './-components/patients-popover-filters'
import { PatientsTable } from './-components/patients-table'
import { PatientsTablePagination } from './-components/patients-table-pagination'
import { PatientsTablePaginationDisabled } from './-components/patients-table-pagination-disabled'
import { PatientsTableSkeleton } from './-components/patients-table-skeleton'

export const Route = createFileRoute('/_app/patients/')({
  component: RouteComponent,
})

function RouteComponent() {
  const [isDeleteAlertDialogOpen, setIsDeleteAlertDialogOpen] = useState(false)

  const patientsIds = usePatientsToDelete((state) => state.patientsIds)
  const clear = usePatientsToDelete((state) => state.clear)

  const deletePatientsByIdListMutation = useDeletePatientsByIdList()

  async function handleDeletePatients() {
    await deletePatientsByIdListMutation.mutateAsync({
      patientsIds: Array.from(patientsIds),
    })

    setIsDeleteAlertDialogOpen(false)
    toast.success('Pacientes excluídos com sucesso')
    clear()
  }

  return (
    <>
      <DeleteAlertDialog
        open={isDeleteAlertDialogOpen}
        onConfirm={handleDeletePatients}
        onCancel={() => setIsDeleteAlertDialogOpen(false)}
      >
        <AlertDialogDescription>
          Ao continuar, você apagará todos os dados de{' '}
          <span className="text-foreground font-medium">
            {patientsIds.size}
          </span>{' '}
          pacientes.
        </AlertDialogDescription>
      </DeleteAlertDialog>

      <div className="space-y-10">
        <AppHeader
          title="Pacientes"
          description="Gerencie cadastros, acompanhe histórico clínico e vizualize sinais de
          atenção."
        />

        <MetadataSection />

        <section className="flex items-center gap-x-6">
          <Link to="/patients/new">
            <Button type="button" size="lg" className="px-6">
              <UserPlusIcon />
              <span>Novo paciente</span>
            </Button>
          </Link>

          <Link to="/patients/import">
            <Button type="button" size="lg" variant="outline" className="px-6">
              <DownloadIcon />
              <span>Importar</span>
            </Button>
          </Link>

          <PatientsPopoverFilters />

          {patientsIds.size > 0 && (
            <Button
              type="button"
              size="lg"
              variant="destructive"
              className="px-6"
              onClick={() => setIsDeleteAlertDialogOpen(true)}
            >
              <Trash2Icon />
              <span>Excluir selecionados</span>
            </Button>
          )}
        </section>

        <section className="rounded-xl border shadow-md">
          <Suspense
            fallback={
              <>
                <PatientsTablePaginationDisabled />
                <PatientsTableSkeleton />
              </>
            }
          >
            <PatientsTablePagination />

            <PatientsTable />
          </Suspense>
        </section>
      </div>
    </>
  )
}
