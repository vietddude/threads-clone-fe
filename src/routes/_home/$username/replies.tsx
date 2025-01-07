import { createFileRoute } from '@tanstack/react-router'
import { post } from '@/api'
import { Separator } from '@/components/ui/separator'
import PostCard from '@/components/cards/post-card'
import { NotFound } from '@/routes/not-found'
import { cn } from '@/lib/utils'
import { infiniteQueryOptions, useInfiniteQuery } from '@tanstack/react-query'
import InfiniteScroll from 'react-infinite-scroll-component'
import { Icons } from '@/components/icons'
import { queryClient } from '@/routes/__root'

const postsQueryOptions = (author: string) =>
	infiniteQueryOptions({
		queryKey: ['replies', author],
		queryFn: ({ pageParam }) => post.replies({ pageParam, author }),
		initialPageParam: 1,
		getNextPageParam: (lastPage) => {
			const totalPages = Math.ceil(lastPage.totalItems / lastPage.pageSize)
			return lastPage.currentPage < totalPages ? lastPage.currentPage + 1 : undefined
		}
	})

export const Route = createFileRoute('/_home/$username/replies')({
	component: RouteComponent,
	loader: async ({ params }) => {
		const { username } = params
		const decodedUsername = decodeURIComponent(username).substring(1)
		queryClient.fetchInfiniteQuery(postsQueryOptions(decodedUsername))
		return { decodedUsername }
	}
})

function RouteComponent() {
	const { decodedUsername } = Route.useLoaderData()
	const { data, hasNextPage, fetchNextPage } = useInfiniteQuery(postsQueryOptions(decodedUsername))

	const allPosts = data?.pages.flatMap((page) => page.data)

	return (
		<div>
			{allPosts ? (
				allPosts.length > 0 ? (
					<InfiniteScroll
						dataLength={allPosts?.length ?? 0}
						next={fetchNextPage}
						hasMore={hasNextPage ?? false}
						loader={
							<div className='h-[100px] w-full justify-center items-center flex  mb-[10vh] sm:mb-0'>
								<Icons.loading className='h-11 w-11' />
							</div>
						}
					>
						<div>
							{allPosts?.map((post, index) => {
								return (
									<div
										key={index}
										className={cn({
											'mb-[10vh]': index == allPosts.length - 1
										})}
									>
										<PostCard {...post} />
										{index !== allPosts.length - 1 && <Separator />}
									</div>
								)
							})}
						</div>
					</InfiniteScroll>
				) : (
					<div className='h-[50vh] w-full justify-center items-center flex text-[#777777]'>
						<p>No replies yet.</p>
					</div>
				)
			) : (
				<NotFound />
			)}
		</div>
	)
}
