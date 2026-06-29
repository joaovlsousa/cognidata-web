import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_public/terms/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_public/terms/"!</div>
}
