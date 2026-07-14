import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { TableCell, TableFooter, TableRow } from '@/components/ui/table'
import { useGetPatients } from '@/hooks/http/patient/use-get-patients'
import { useGetPatientsFilters } from '@/hooks/use-get-patients-filters'
import { useGetPatientsPagesPagination } from '@/hooks/use-get-patients-pages-pagination'

const perPageOptions = {
  10: '10 pacientes por página',
  15: '15 pacientes por página',
  20: '20 pacientes por página',
  25: '25 pacientes por página',
}

export function PatientsTableFooter() {
  const { filters, setFilters } = useGetPatientsFilters()
  const {
    data: { patients, meta },
  } = useGetPatients()

  const pages = useGetPatientsPagesPagination(meta.page, meta.totalPages)

  function handleNextPage() {
    if (meta.page >= meta.totalPages) {
      return
    }

    setFilters({
      page: meta.page + 1,
    })
  }

  function handlePreviousPage() {
    if (meta.page <= 1) {
      return
    }

    setFilters({
      page: meta.page - 1,
    })
  }

  return (
    <TableFooter>
      <TableRow>
        <TableCell colSpan={5} className="p-3">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Listando {patients.length} de {meta.total} pacientes
            </p>

            <div className="flex items-center gap-x-6">
              <div className="flex items-center gap-x-3">
                <Button
                  variant="outline"
                  size="icon-sm"
                  disabled={meta.page <= 1}
                  onClick={handlePreviousPage}
                >
                  <ChevronLeftIcon />
                </Button>

                {pages.map(({ page, isActive }) => (
                  <Button
                    key={page}
                    size="icon-sm"
                    variant={isActive ? 'default' : 'ghost'}
                    onClick={() =>
                      setFilters({
                        page: page,
                      })
                    }
                  >
                    {page}
                  </Button>
                ))}

                <Button
                  variant="outline"
                  size="icon-sm"
                  disabled={meta.page >= meta.totalPages}
                  onClick={handleNextPage}
                >
                  <ChevronRightIcon />
                </Button>
              </div>

              <Select
                items={perPageOptions}
                defaultValue={filters.perPage.toString()}
                value={filters.perPage.toString()}
                onValueChange={(value) =>
                  setFilters({
                    perPage: Number(value),
                    page: 1,
                  })
                }
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
