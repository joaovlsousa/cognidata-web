import { MoreHorizontalIcon } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
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
import { cn } from '@/lib/utils'

const perPageOptions = {
  10: '10 pacientes por página',
  15: '15 pacientes por página',
  20: '20 pacientes por página',
  25: '25 pacientes por página',
}

export function PatientsTable() {
  return (
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
        {Array.from({ length: 10 }).map((_, i) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: <>
          <TableRow key={i}>
            <TableCell className="pl-3 text-base font-medium">
              João Vitor de Lima Sousa
            </TableCell>
            <TableCell>20 anos</TableCell>
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
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Edit</DropdownMenuItem>
                  <DropdownMenuItem>Duplicate</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem variant="destructive">
                    Delete
                  </DropdownMenuItem>
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
                Mostrando 10 de 128 pacientes
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
  )
}
