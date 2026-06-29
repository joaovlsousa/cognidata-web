import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_public/policies/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_public/policies/"!</div>
}
