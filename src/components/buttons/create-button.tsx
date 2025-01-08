import React from 'react'
import { Icons } from '@/components/icons'
import { cn } from '@/lib/utils'
import { useLocation } from '@tanstack/react-router'

const CreateButton: React.FC = () => {
	const path = useLocation().pathname
	return (
		<div className='hover:bg-primary p-4 sm:py-5 sm:px-[34px]  rounded-lg transform transition-all duration-150 ease-out hover:scale-100 active:scale-90 flex items-center justify-center w-full'>
			<Icons.create className={cn('h-6 w-6', path === '/create' ? 'text-forground' : 'text-secondary')} />
		</div>
	)
}

export default CreateButton
