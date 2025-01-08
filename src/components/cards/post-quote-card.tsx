import React from 'react'
import { Card } from '@/components/ui/card'
import Username from '@/components/user/user-username'
import UserAvatar from '@/components/user/user-avatar'
import { Icons } from '@/components/icons'
import type { ParentPostInfo } from '@/types'
import { Link } from '@tanstack/react-router'
import { formatTimeAgo } from '@/lib/utils'
import { post } from '@/api'
import { useQuery } from '@tanstack/react-query'

type PostQuoteCardProps = Partial<Pick<ParentPostInfo, 'id' | 'text' | 'author'>> & { createdAt?: Date }

const PostQuoteCard: React.FC<PostQuoteCardProps & { quoteId?: string }> = ({ author, text, quoteId, createdAt }) => {
	if (quoteId) {
		// eslint-disable-next-line react-hooks/rules-of-hooks
		const { data, isLoading } = useQuery({
			queryKey: ['post', quoteId],
			queryFn: () => post.getPost(quoteId),
			enabled: !!quoteId,
			staleTime: Infinity
		})

		if (isLoading) {
			return (
				<div className='h-[100px] w-full justify-center items-center flex '>
					<Icons.loading className='h-11 w-11' />
				</div>
			)
		}

		if (!data) return <>Not found.</>

		return (
			<Link href={`/@${data.author.username}/post/${data.id}`} className='w-full'>
				<RenderCard author={data.author} text={data.text} createdAt={data.createdAt} />
			</Link>
		)
	}
	return <RenderCard author={author} text={text} createdAt={createdAt} />
}

export default PostQuoteCard

const RenderCard: React.FC<PostQuoteCardProps> = ({ author, text, createdAt }) => {
	return (
		<Card className='overflow-hidden p-4 mt-3 rounded-xl bg-transparent border-border w-full'>
			<div className='flex items-center justify-between mb-1.5 '>
				<div className='flex items-center gap-2'>
					<UserAvatar
						fullname={author?.fullname}
						image={author?.image}
						username={author?.username ?? ''}
						className='h-7 w-7'
					/>
					<Username author={author!} />
				</div>
				<time className='text-[15px] text-[#777777] cursor-default'>
					{createdAt && formatTimeAgo(createdAt)}
				</time>
			</div>
			{text && (
				<span className='flex-grow resize-none overflow-hidden outline-none text-[15px] text-accent-foreground break-words placeholder:text-[#777777] w-full tracking-normal whitespace-pre-line truncate'>
					<span
						dangerouslySetInnerHTML={{
							__html: text.replace(/^"|"$/g, '').replace(/\\n/g, '\n')
						}}
					/>
				</span>
			)}
		</Card>
	)
}
