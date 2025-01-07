import PostCard from '@/components/cards/post-card'
import PostReplyCard from '@/components/cards/post-reply-card'
import { cn } from '@/lib/utils'
import { NotFound } from '@/routes/not-found'
import { Separator } from '@/components/ui/separator'
import { createFileRoute } from '@tanstack/react-router'
import { queryClient } from '@/routes/__root'
import { post } from '@/api'
import { useQuery } from '@tanstack/react-query'
import Loading from '@/components/loading'

export const Route = createFileRoute('/_home/$username_/post/$postId')({
	component: NestedPostComponent,
	loader: async ({ params }) => {
		const { postId } = params
		await queryClient.prefetchQuery({
			queryKey: ['nested-post', postId],
			queryFn: () => post.nestedPosts(postId)
		})
		return { postId }
	}
})

function NestedPostComponent() {
	const { postId } = Route.useLoaderData()

	const { data, isLoading } = useQuery({
		queryKey: ['nested-post', postId],
		queryFn: () => post.nestedPosts(postId)
	})

	isLoading && <Loading />

	return (
		<>
			{data ? (
				<>
					<PostReplyCard postInfo={data.postInfo} parentPosts={data.parentPosts} key={data.postInfo.id} />
					{data.postInfo.replies.map((post, index) => (
						<div key={index} className={cn({ 'mb-[10vh]': index == data.postInfo.replies.length - 1 })}>
							<Separator />
							<PostCard {...post} />
						</div>
					))}
				</>
			) : (
				<NotFound />
			)}
		</>
	)
}
