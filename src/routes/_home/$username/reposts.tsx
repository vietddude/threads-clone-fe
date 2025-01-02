import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_home/$username/reposts')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_home/$username/reposts"!</div>
}
