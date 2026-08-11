import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { TabsContent } from '@/components/ui/tabs'
import { columnSpecs } from '../-data'

export function CsvExample() {
  return (
    <TabsContent value="csv-example">
      <Card>
        <CardHeader>
          <CardTitle>
            A primeira linha do arquivo deve conter exatamente estes cabeçalhos,
            na ordem que preferir.
          </CardTitle>
          <CardDescription>
            A partir da segunda linha são os dados dos pacientes a serem salvos.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="p-6 overflow-x-auto rounded-xl border bg-muted">
            <pre className="font-mono text-sm leading-relaxed text-muted-foreground">
              <code>
                {columnSpecs.map((column) => column.header).join(', ')}
                {'\n'}
                {columnSpecs.map((column) => column.example).join(', ')}
                {'\n'}
                {'{...}'}
              </code>
            </pre>
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  )
}
