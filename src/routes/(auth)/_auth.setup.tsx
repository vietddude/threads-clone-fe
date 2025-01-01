import AccountSetupForm from '@/components/auth/account-setup-form'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(auth)/_auth/setup')({
	component: AccountSetup
})

function AccountSetup() {
	return (
		<div className='mx-auto flex h-[95vh] w-full max-w-lg flex-col items-center justify-center gap-6'>
			<AccountSetupForm />
		</div>
	)
}
