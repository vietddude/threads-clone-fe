import MobileNavbar from '@/components/layouts/mobile-navbar'
import SiteHeader from '@/components/layouts/site-header'
import useUser from '@/store/user'
import { createFileRoute, Outlet, useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react'

export const Route = createFileRoute('/_home')({
	component: RouteComponent
})

function RouteComponent() {
	const { user } = useUser()
	const navigate = useNavigate()
	useEffect(() => {
		if (!user) {
			navigate({
				to: '/login'
			})
		}
	}, [user])
	return (
		<>
			<SiteHeader />
			<main className='container max-w-[620px] px-4 sm:px-6'>
				<Outlet />
			</main>
			<MobileNavbar />
		</>
	)
}
