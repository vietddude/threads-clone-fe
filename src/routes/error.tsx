import { Button } from '@/components/ui/button'
import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/error')({
	component: Error
})

export function Error() {
	return (
		<div className='flex flex-col justify-between h-[80vh] '>
			<div className='flex-grow flex px-4 flex-col gap-4 items-center justify-center '>
				<h4 className='scroll-m-20 text-[16px] font-bold tracking-normal'>Sorry, something went wrong!</h4>
				<Button
					asChild
					className='rounded-xl px-4 hover:bg-transparent active:scale-95'
					variant={'outline'}
					size={'sm'}
				>
					<Link to={'/'}>Back</Link>
				</Button>
			</div>
		</div>
	)
}
