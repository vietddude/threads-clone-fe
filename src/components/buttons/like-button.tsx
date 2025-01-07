import React from 'react'
import { Icons } from '@/components/icons'
import { cn } from '@/lib/utils'
import type { PostCardProps } from '@/types'
import { toast } from 'sonner'
import { post } from '@/api'
import { useMutation } from '@tanstack/react-query'

interface LikeButtonProps {
	likeInfo: Pick<PostCardProps, 'id' | 'count' | 'liked'>
	onLike: (isLiked: boolean) => void
}

const LikeButton: React.FC<LikeButtonProps> = ({ likeInfo, onLike }) => {
	const { count, id, liked } = likeInfo

	const likeUpdate = React.useRef({
		liked,
		likeCount: count.likeCount
	})

	const { mutate: toggleLike, isPending } = useMutation({
		mutationFn: (id: string) => {
			return post.toggleLike(id)
		},
		onMutate: () => {
			const previousLiked = likeUpdate.current.liked
			const previousLikeCount = likeUpdate.current.likeCount

			likeUpdate.current.liked = !likeUpdate.current.liked
			likeUpdate.current.likeCount = likeUpdate.current.liked
				? likeUpdate.current.likeCount + 1
				: likeUpdate.current.likeCount - 1

			return { previousLiked, previousLikeCount }
		},
		onError: (_error, _variables, context) => {
			likeUpdate.current.liked = context?.previousLiked ?? likeUpdate.current.liked
			likeUpdate.current.likeCount = context?.previousLikeCount ?? likeUpdate.current.likeCount

			toast.error('Something went wrong!')
		}
	})

	return (
		<div className='flex items-center justify-center hover:bg-primary rounded-full p-2 w-fit h-fit active:scale-95'>
			<button disabled={isPending}>
				<Icons.heart
					onClick={() => {
						onLike(likeUpdate.current.liked)
						toggleLike(id)
					}}
					fill={likeUpdate.current.liked ? '#ff3040' : 'transparent'}
					className={cn('w-5 h-5 ', {
						'text-[#ff3040]': likeUpdate.current.liked
					})}
				/>
			</button>
		</div>
	)
}

export default LikeButton
