import SiteFooter from '@/components/layouts/site-footer'
import Banner from '@/components/threads-banner'
import useUser from '@/store/user'
import { createFileRoute, Outlet, useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react'

export const Route = createFileRoute('/_auth')({
	component: Auth
})

function Auth() {
	const navigate = useNavigate()
	const { user } = useUser()

	useEffect(() => {
		console.log('auth', user)
		if (user) {
			navigate({
				to: '/'
			})
		}
	}, [user])

	return (
		<div className='bg-[#101010] h-screen'>
			<Banner />
			<div className='absolute z-50  -translate-x-2/4 -translate-y-2/4 sm:-translate-y-[40%] left-2/4 top-2/4 w-full px-4 sm:px-0'>
				<Outlet />
			</div>
			<SiteFooter />
		</div>
	)
}
