import { differenceInYears } from 'date-fns'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'
import { useGetPatients } from '@/hooks/http/patient/use-get-patients'
import { cn } from '@/lib/utils'
import { PatientsTableActions } from './patients-table-actions'
import { PatientsTableEmpty } from './patients-table-empty'
import { PatientsTableHeader } from './patients-table-header'

export function PatientsTable() {
  const {
    data: { patients },
  } = useGetPatients()

  return (
    <Table>
      <PatientsTableHeader />

      <TableBody>
        {patients.length === 0 && <PatientsTableEmpty />}

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
                  i % 4 === 0 && 'bg-amber-500/10 ring-amber-500 text-amber-500'
                )}
              >
                {i % 4 === 0
                  ? 'Acompanhar'
                  : i % 3 === 0
                    ? 'Aguardando'
                    : 'Ativo'}
              </Badge>
            </TableCell>

            <PatientsTableActions patient={patient} />
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
