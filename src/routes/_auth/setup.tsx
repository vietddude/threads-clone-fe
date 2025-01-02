import AccountSetupForm from '@/components/auth/account-setup-form'
import useUser from '@/store/user'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react'

export const Route = createFileRoute('/_auth/setup')({
	component: AccountSetup
})

function AccountSetup() {
	const navigate = useNavigate()
	const { user } = useUser()

	useEffect(() => {
		if (user?.verified) {
			navigate({
				to: '/'
			})
		}
	}, [user])

	return (
		<div className='mx-auto flex h-[95vh] w-full max-w-lg flex-col items-center justify-center gap-6'>
			<AccountSetupForm />
		</div>
	)
}
