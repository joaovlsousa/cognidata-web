import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { TabsContent } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'
import { columnSpecs } from '../-data'

export function SpreadsheetExample() {
  return (
    <TabsContent value="spreadsheet-example">
      <div className="border rounded-xl overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted">
              {columnSpecs.map((colunm, index) => (
                <TableCell
                  key={colunm.header}
                  className={cn(
                    index > 0 && 'border-l',
                    index === 0 && 'pl-3',
                    index === columnSpecs.length - 1 && 'pr-3'
                  )}
                >
                  {colunm.header}
                </TableCell>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {columnSpecs.map((colunm, index) => (
              <TableCell
                key={colunm.header}
                className={cn(
                  index > 0 && 'border-l',
                  index === 0 && 'pl-3',
                  index === columnSpecs.length - 1 && 'pr-3'
                )}
              >
                {colunm.example}
              </TableCell>
            ))}
          </TableBody>
        </Table>
      </div>
    </TabsContent>
  )
}
