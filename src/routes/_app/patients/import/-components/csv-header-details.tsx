import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { TabsContent } from '@/components/ui/tabs'
import { columnSpecs } from '../-data'

export function CsvHeaderDetails() {
  return (
    <TabsContent value="csv-header-details">
      <div className="border rounded-xl overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted">
              <TableCell className="pl-3">Cabeçalho na planilha</TableCell>
              <TableCell>Exemplo</TableCell>
              <TableCell className="pr-3 text-center">Obrigatório</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {columnSpecs.map((colunm) => (
              <TableRow key={colunm.header}>
                <TableCell className="pl-3">
                  <div className="flex flex-col gap-0.5">
                    <span className="font-medium">{colunm.header}</span>
                    {colunm.hint && (
                      <span className="text-xs text-muted-foreground">
                        {colunm.hint}
                      </span>
                    )}
                  </div>
                </TableCell>

                <TableCell className="text-muted-foreground">
                  {colunm.example}
                </TableCell>

                <TableCell className="pr-3 text-center">
                  <Badge
                    variant={colunm.required ? 'default' : 'secondary'}
                    className="p-3"
                  >
                    {colunm.required ? 'Sim' : 'Opcional'}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </TabsContent>
  )
}
