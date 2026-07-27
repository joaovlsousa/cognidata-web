import { Link } from '@tanstack/react-router'
import { UserPlusIcon, UserSearchIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty'
import { TableCell, TableRow } from '@/components/ui/table'

export function PatientsTableEmpty() {
  return (
    <TableRow>
      <TableCell colSpan={5}>
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <UserSearchIcon />
            </EmptyMedia>
            <EmptyTitle>Nenhum paciente encontrado</EmptyTitle>
            <EmptyDescription>
              Não foi possível encontrar nenhum paciente. Comece cadastrando um
              novo paciente na plataforma.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent className="flex-row justify-center gap-x-3">
            <Link to="/patients/new">
              <Button type="button" size="lg" className="px-6">
                <UserPlusIcon />
                <span>Novo paciente</span>
              </Button>
            </Link>

            <Button variant="outline">Import Project</Button>
          </EmptyContent>
        </Empty>
      </TableCell>
    </TableRow>
  )
}
