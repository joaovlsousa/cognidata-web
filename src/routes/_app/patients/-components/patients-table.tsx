import { Link } from '@tanstack/react-router'
import { differenceInYears } from 'date-fns'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'
import { useGetPatients } from '@/hooks/http/patient/use-get-patients'
import { usePatientsToDelete } from '@/hooks/use-patients-to-delete'
import { cn } from '@/lib/utils'
import { PatientsTableActions } from './patients-table-actions'
import { PatientsTableEmpty } from './patients-table-empty'
import { PatientsTableHeader } from './patients-table-header'

export function PatientsTable() {
  const patientsIdsToDelete = usePatientsToDelete((state) => state.patientsIds)
  const toggle = usePatientsToDelete((state) => state.toggle)

  const {
    data: { patients },
  } = useGetPatients()

  const patientsIds = patients.map((patient) => patient.id)

  return (
    <Table>
      <PatientsTableHeader patientsIds={patientsIds} />

      <TableBody>
        {patients.length === 0 && <PatientsTableEmpty />}

        {patients.map((patient, i) => (
          <TableRow key={patient.id}>
            <TableCell className="pl-3">
              <Checkbox
                checked={patientsIdsToDelete.has(patient.id)}
                onCheckedChange={() => {
                  toggle(patient.id)
                }}
                className="cursor-pointer"
              />
            </TableCell>

            <TableCell className="text-base font-medium">
              <Link
                to="/patients/$patientId"
                params={{ patientId: patient.id }}
                className="hover:underline"
              >
                {patient.name}
              </Link>
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
