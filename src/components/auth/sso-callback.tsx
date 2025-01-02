import * as React from 'react'
import { Icons } from '@/components/icons'
import { useAuth } from '@/hooks/use-auth'
import { SSOCallbackSearch } from '@/routes/_auth/_auth.sso-callback'

export default function SSOCallback({ searchParams }: { searchParams: SSOCallbackSearch }) {
	const { handleRedirectCallback } = useAuth()

	React.useEffect(() => {
		void handleRedirectCallback(searchParams)
	}, [searchParams, handleRedirectCallback])

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
