import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Skeleton } from '@/components/ui/skeleton'
import { TableCell, TableFooter, TableRow } from '@/components/ui/table'
import { useGetPatientsFilters } from '@/hooks/use-get-patients-filters'

const perPageOptions = {
  10: '10 pacientes por página',
  15: '15 pacientes por página',
  20: '20 pacientes por página',
  25: '25 pacientes por página',
}

export function PatientsTableFooterSkeleton() {
  const { filters } = useGetPatientsFilters()

  return (
    <TableFooter>
      <TableRow>
        <TableCell colSpan={5} className="p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-x-1 text-sm text-muted-foreground">
              <span>Listando</span>
              <Skeleton className="h-4.5 w-10" />
              <span>de</span>
              <Skeleton className="h-4.5 w-10" />
              <span>pacientes</span>
            </div>

            <div className="flex items-center gap-x-6">
              <div className="flex items-center gap-x-3">
                <Button variant="outline" size="icon-sm" disabled>
                  <ChevronLeftIcon />
                </Button>

                {Array.from({ length: 5 }).map((_, i) => (
                  // biome-ignore lint/suspicious/noArrayIndexKey: <Suspense only>
                  <Skeleton key={`page-skeleton-${i}`} className="size-8" />
                ))}

                <Button variant="outline" size="icon-sm" disabled>
                  <ChevronRightIcon />
                </Button>
              </div>

              <Select
                items={perPageOptions}
                defaultValue={filters.perPage.toString()}
                value={filters.perPage.toString()}
                disabled
              >
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
  )
}
