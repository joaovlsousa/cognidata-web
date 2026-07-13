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
import { TableCell, TableFooter, TableRow } from '@/components/ui/table'
import { useGetPatients } from '@/hooks/http/patient/use-get-patients'

const perPageOptions = {
  10: '10 pacientes por página',
  15: '15 pacientes por página',
  20: '20 pacientes por página',
  25: '25 pacientes por página',
}

export function PatientsTableFooter() {
  const {
    data: { patients },
  } = useGetPatients()

  return (
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
  )
}
