import { toast } from 'sonner'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { z } from 'zod'
import { Error } from '@/routes/error'
import { Icons } from '@/components/icons'
import { useEffect } from 'react'
import useUser from '@/store/user'
import { auth } from '@/api'
import useToken from '@/store/token'

const ssoCallbackSchema = z.object({
	code: z.string()
})

export type SSOCallbackSearch = z.infer<typeof ssoCallbackSchema>

export const Route = createFileRoute('/_auth/sso-callback')({
	component: SSOCallback,
	pendingComponent: Loading,
	validateSearch: ssoCallbackSchema,
	loaderDeps: ({ search: { code } }) => ({ code }),
	loader: async ({ deps: { code } }) => {
		const { accessToken, user } = await auth.callback({ code })
		return { accessToken, user }
	},
	onError: (error) => {
		console.error('error', error)
		toast.error('Something went wrong')
	},
	errorComponent: () => <Error />
})

function Loading() {
	return (
		<div
			role='status'
			aria-label='Loading'
			aria-describedby='loading-description'
			className='flex items-center justify-center'
		>
			<Icons.spinner className='h-16 w-16 animate-spin' aria-hidden='true' />
		</div>
	)
}

function SSOCallback() {
	const navigate = useNavigate()
	const { setUser } = useUser()
	const { setAccessToken } = useToken()
	const { accessToken, user } = Route.useLoaderData()

	useEffect(() => {
		if (user && accessToken) {
			setUser(user)
			setAccessToken(accessToken)
			navigate({ to: '/setup' })
		}
	}, [user, accessToken, navigate, setAccessToken, setUser])

	return <div></div>
}
