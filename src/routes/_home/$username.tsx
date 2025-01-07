import { createFileRoute, Outlet } from '@tanstack/react-router'
import { user } from '@/api'
import UserProfile from '@/components/user/user-details'
import { queryClient } from '../__root'
import { queryOptions, useQuery } from '@tanstack/react-query'

const profileOptions = (username: string) =>
	queryOptions({
		queryKey: ['profile', username],
		queryFn: () => user.getProfile(username)
	})

export const Route = createFileRoute('/_home/$username')({
	component: ProfileComponent,
	loader: async ({ params }) => {
		const { username } = params
		const decodedUsername = decodeURIComponent(username).substring(1)
		queryClient.getQueryData(profileOptions(decodedUsername).queryKey)
		return { decodedUsername }
	}
})

function ProfileComponent() {
	const { decodedUsername } = Route.useLoaderData()
	const { data: profile } = useQuery(profileOptions(decodedUsername))

	if (!profile) return null
	return (
		<>
			<UserProfile {...profile} />
			<Outlet />
		</>
	)
}
