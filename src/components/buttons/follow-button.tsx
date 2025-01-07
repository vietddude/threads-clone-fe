import React from 'react'
import { Follow } from '@/components/ui/follow-button'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'
import useUser from '@/store/user'
import { useLocation } from '@tanstack/react-router'
import { user } from '@/api'
import { useMutation } from '@tanstack/react-query'
import { queryClient } from '@/routes/__root'

interface FollowButtonProps extends React.HTMLAttributes<HTMLDivElement> {
	variant: string
	author: {
		id: string
		username: string
		isFollowing: boolean
	}
}

const FollowButton: React.FC<FollowButtonProps> = ({ variant, author, className }) => {
	const path = useLocation().pathname

	const { user: loggedUser } = useUser()

	const isSameUser = author.id === loggedUser?.id

	const followUpdate = React.useRef({
		isFollowedByMe: author.isFollowing
	})

	const { mutate: toggleFollow, isPending } = useMutation({
		mutationFn: (username: string) => user.toggleFollow(username),
		onMutate: () => {
			const previousFollowedByMe = followUpdate.current.isFollowedByMe

			followUpdate.current.isFollowedByMe = !followUpdate.current.isFollowedByMe

			if (followUpdate.current.isFollowedByMe === true) {
				toast('Followed')
			} else {
				toast('Unfollowed')
			}

			return { previousFollowedByMe }
		},
		onError: (_error, _variables, context) => {
			followUpdate.current.isFollowedByMe = context?.previousFollowedByMe ?? followUpdate.current.isFollowedByMe
			toast.error('FollowError: Something went wrong!')
		},
		onSettled: async () => {
			if (path === '/') {
				await queryClient.invalidateQueries({ queryKey: ['posts'] })
			}
			await queryClient.invalidateQueries({ queryKey: ['profile', author.username] })
		}
	})

	const setVariant = variant === 'default' ? 'default' : 'outline'
	return (
		<Follow
			disabled={isPending || isSameUser}
			onClick={() => {
				toggleFollow(author.username)
			}}
			variant={!followUpdate.current.isFollowedByMe ? setVariant : 'outline'}
			className={cn('rounded-xl py-1.5 px-4 select-none', className, {
				'opacity-80': followUpdate.current.isFollowedByMe
			})}
		>
			{followUpdate.current.isFollowedByMe ? 'Following' : 'Follow'}
		</Follow>
	)
}

export default FollowButton
