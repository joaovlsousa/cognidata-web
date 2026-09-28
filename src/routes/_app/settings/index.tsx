import { createFileRoute } from '@tanstack/react-router'
import { AppHeader } from '../-components/app-header'

export const Route = createFileRoute('/_app/settings/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="space-y-10">
      <AppHeader
        title="Configurações"
        description="Gerencie as configurações globais do sistema."
      />
    </div>
  )
}
