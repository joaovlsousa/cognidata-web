import { Checkbox } from '@/components/ui/checkbox'
import { TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { usePatientsToDelete } from '@/hooks/use-patients-to-delete'
import { cn } from '@/lib/utils'

interface PatientsTableHeaderProps {
  patientsIds: string[]
}

export function PatientsTableHeader({ patientsIds }: PatientsTableHeaderProps) {
  const patientsIdsToDelete = usePatientsToDelete((state) => state.patientsIds)
  const appendAll = usePatientsToDelete((state) => state.appendAll)
  const clear = usePatientsToDelete((state) => state.clear)

  function handleToggle(checked: boolean) {
    if (!checked) {
      clear()

      return
    }

    appendAll(patientsIds)
  }

  return (
    <TableHeader>
      <TableRow>
        {patientsIds.length > 0 && (
          <TableHead className="pl-3">
            <Checkbox
              checked={patientsIdsToDelete.size === patientsIds.length}
              onCheckedChange={handleToggle}
              className="cursor-pointer"
            />
          </TableHead>
        )}

        <TableHead className={cn(patientsIds.length === 0 && 'pl-3')}>
          Nome
        </TableHead>
        <TableHead>Idade</TableHead>
        <TableHead className="text-center">Última atividade</TableHead>
        <TableHead className="text-center">Status</TableHead>
        <TableHead className="pr-3 text-right">Ações</TableHead>
      </TableRow>
    </TableHeader>
  )
}
