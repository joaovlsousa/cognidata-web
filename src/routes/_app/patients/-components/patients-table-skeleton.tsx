import { Skeleton } from '@/components/ui/skeleton'
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'
import { PatientsTableFooterSkeleton } from './patients-table-footer-skeleton'
import { PatientsTableHeader } from './patients-table-header'

export function PatientsTableSkeleton() {
  return (
    <Table>
      <PatientsTableHeader />

      <TableBody>
        {Array.from({ length: 10 }).map((_, i) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: <Skeleton only>
          <TableRow key={`patient-skeleton-${i}`}>
            <TableCell className="pl-3">
              <Skeleton className="h-6 w-80" />
            </TableCell>

            <TableCell>
              <Skeleton className="h-6 w-12" />
            </TableCell>

            <TableCell>
              <div className="flex flex-col gap-1 items-center">
                <Skeleton className="h-4.5 w-20" />
                <Skeleton className="h-3.5 w-24" />
              </div>
            </TableCell>

            <TableCell>
              <div className="flex justify-center">
                <Skeleton className="h-5 w-20" />
              </div>
            </TableCell>

            <TableCell className="pr-3">
              <div className="grid place-items-end">
                <Skeleton className="h-5 w-10" />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>

      <PatientsTableFooterSkeleton />
    </Table>
  )
}
