import { TableHead, TableHeader, TableRow } from '@/components/ui/table'

export function PatientsTableHeader() {
  return (
    <TableHeader>
      <TableRow>
        <TableHead className="pl-3">Nome</TableHead>
        <TableHead>Idade</TableHead>
        <TableHead className="text-center">Última atividade</TableHead>
        <TableHead className="text-center">Status</TableHead>
        <TableHead className="pr-3 text-right">Ações</TableHead>
      </TableRow>
    </TableHeader>
  )
}
