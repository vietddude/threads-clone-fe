import React from 'react'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Icons } from '@/components/icons'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'
import type { AuthorInfoProps } from '@/types'
import QuoteButton from '@/components/buttons/quote-button'
import { post } from '@/api'
import { useMutation } from '@tanstack/react-query'

interface RepostButtonProps {
	id: string
	text: string
	author: AuthorInfoProps
	reposted: boolean
	createdAt?: Date
}

const RepostButton: React.FC<RepostButtonProps> = ({ id, text, author, createdAt, reposted }) => {
	const repostUpdate = React.useRef({
		reposted
	})

	const { mutate: toggleRepost, isPending } = useMutation({
		mutationFn: (id: string) => post.toggleRepost(id),
		onMutate: () => {
			const previousRepost = repostUpdate.current.reposted

			repostUpdate.current.reposted = !repostUpdate.current.reposted

			if (repostUpdate.current.reposted === true) {
				toast('Reposted')
			} else {
				toast('Removed')
			}

			return { previousRepost }
		},
		onError: (_error, _variables, context) => {
			repostUpdate.current.reposted = context?.previousRepost ?? repostUpdate.current.reposted
			toast.error('RepostError: Something went wrong!')
		}
	})

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<button
					disabled={isPending}
					className='flex items-center justify-center hover:bg-primary rounded-full p-2 w-fit h-fit active:scale-95 outline-none'
				>
					{repostUpdate.current.reposted ? (
						<Icons.reposted className='w-5 h-5 ' />
					) : (
						<Icons.repost className='w-5 h-5 ' />
					)}
				</button>
			</DropdownMenuTrigger>
			<DropdownMenuContent
				align='start'
				className='bg-background shadow-xl dark:bg-[#181818] rounded-2xl w-[190px] p-0'
			>
				<DropdownMenuItem
					disabled={isPending}
					onClick={() => {
						toggleRepost(id)
					}}
					className={cn(
						'focus:bg-transparent px-4 tracking-normal select-none font-semibold py-3 cursor-pointer text-[15px]  active:bg-primary-foreground  rounded-none w-full justify-between',
						{
							'text-red-600 focus:text-red-600': repostUpdate.current.reposted
						}
					)}
				>
					{repostUpdate.current.reposted ? <>Remove</> : <>Repost</>}

					<Icons.repost
						className={cn('w-5 h-5 ', {
							'text-red-600': repostUpdate.current.reposted
						})}
					/>
				</DropdownMenuItem>
				<DropdownMenuSeparator className=' h-[1.2px] my-0' />
				<div className='focus:bg-transparent px-4 tracking-normal select-none font-semibold py-3 cursor-pointer text-[15px] rounded-none active:bg-primary-foreground  w-full justify-between'>
					<QuoteButton
						quoteInfo={{
							text,
							id,
							author,
							createdAt
						}}
					/>
				</div>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

export default RepostButton
