import { createFileRoute } from '@tanstack/react-router'
import { FileTextIcon, SheetIcon, Table2Icon } from 'lucide-react'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { AppHeader } from '../../-components/app-header'
import { CreatePatientsFromCsvForm } from './-components/create-patients-from-csv-form'
import { CsvExample } from './-components/csv-example'
import { CsvHeaderDetails } from './-components/csv-header-details'
import { SpreadsheetExample } from './-components/spreadsheet-example'

export const Route = createFileRoute('/_app/patients/import/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="space-y-10">
      <AppHeader
        title="Importar pacientes via CSV"
        description="Envie uma planilha com os dados dos pacientes."
      />
      <CreatePatientsFromCsvForm />

      <Tabs defaultValue="csv-header-details">
        <TabsList variant="line">
          <TabsTrigger
            value="csv-header-details"
            className="data-active:text-primary hover:text-primary/80 after:bg-primary"
          >
            <Table2Icon />
            <span>Colunas aceitas</span>
          </TabsTrigger>
          <TabsTrigger
            value="spreadsheet-example"
            className="data-active:text-primary hover:text-primary/80 after:bg-primary"
          >
            <SheetIcon />
            <span>Exemplo de planilha válida</span>
          </TabsTrigger>

          <TabsTrigger
            value="csv-example"
            className="data-active:text-primary hover:text-primary/80 after:bg-primary"
          >
            <FileTextIcon />
            <span>Exemplo de arquivo CSV válido</span>
          </TabsTrigger>
        </TabsList>

        <CsvHeaderDetails />
        <SpreadsheetExample />
        <CsvExample />
      </Tabs>
    </div>
  )
}
