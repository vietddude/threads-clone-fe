import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_home/$username_/post')({
	component: RouteComponent
})

function RouteComponent() {
	return (
		<>
			<Outlet />
		</>
	)
}
