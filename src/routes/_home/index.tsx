import { Separator } from '@/components/ui/separator'
import PostCard from '@/components/cards/post-card'
import { post } from '@/api'
import CreateWithInput from '@/components/create-with-input'
import { Icons } from '@/components/icons'
import useDialog from '@/store/dialog'
import { infiniteQueryOptions, useInfiniteQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import InfiniteScroll from 'react-infinite-scroll-component'
import { queryClient } from '../__root'
import { cn } from '@/lib/utils'

const postsQueryOptions = () =>
	infiniteQueryOptions({
		queryKey: ['posts'],
		queryFn: ({ pageParam }) => post.infinitePosts({ pageParam }),
		initialPageParam: 1,
		getNextPageParam: (lastPage) => {
			const totalPages = Math.ceil(lastPage.totalItems / lastPage.pageSize)
			return lastPage.currentPage < totalPages ? lastPage.currentPage + 1 : undefined
		}
	})

export const Route = createFileRoute('/_home/')({
	component: RouteComponent,
	loader: async () => {
		return queryClient.fetchInfiniteQuery(postsQueryOptions())
	}
})

function RouteComponent() {
	const { setOpenDialog } = useDialog()
	const { data, hasNextPage, fetchNextPage } = useInfiniteQuery(postsQueryOptions())

	const allPosts = data?.pages.flatMap((page) => page.data)

	return (
		<>
			<div className='w-full sm:flex hidden '>
				<CreateWithInput onClick={() => setOpenDialog(true)} />
			</div>
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
							<div key={index} className={cn({ 'mb-[10vh]': index == allPosts.length - 1 })}>
								<PostCard {...post} />
								{index !== allPosts.length - 1 && <Separator />}
							</div>
						)
					})}
				</div>
			</InfiniteScroll>
		</>
	)
}
