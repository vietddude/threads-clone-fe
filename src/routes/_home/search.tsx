import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_home/search')({
	component: RouteComponent
})

function RouteComponent() {
	return <div>Hello "/_home/search"!</div>
}
