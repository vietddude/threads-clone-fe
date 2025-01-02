import { createFileRoute, Outlet } from '@tanstack/react-router'
import { user } from '@/api'
import UserProfile from '@/components/user/user-details'

export const Route = createFileRoute('/_home/$username')({
	component: ProfileComponent,
	loader: async ({ params }) => {
		const { username } = params
		const decodedUsername = decodeURIComponent(username).substring(1)
		const profile = await user.getProfile(decodedUsername)
		return {
			profile
		}
	}
})

function ProfileComponent() {
	const { profile } = Route.useLoaderData()
	return (
		<>
			<UserProfile {...profile} />
			<Outlet />
		</>
	)
}
