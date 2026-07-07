import { createFileRoute } from '@tanstack/react-router'
import { AppHeader } from '../patients/-components/app-header'
import { MetadataSection } from '../patients/-components/metadata-section'

export const Route = createFileRoute('/_app/dashboard/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="space-y-10">
      <AppHeader
        title="Olá Jucélio Soares"
        description="Bem vindo ao seu painel clínico."
      />

      <MetadataSection />
    </div>
  )
}
