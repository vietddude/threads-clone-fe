import { Separator } from '@/components/ui/separator'
import PostCard from '@/components/cards/post-card'
import { post } from '@/api'
import CreateWithInput from '@/components/create-with-input'
import { Icons } from '@/components/icons'
import useDialog from '@/store/dialog'
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import InfiniteScroll from 'react-infinite-scroll-component'
import { queryClient } from '../__root'
import { cn } from '@/lib/utils'

const postsQueryOptions = (page: number, limit: number) =>
	queryOptions({
		queryKey: ['posts', page, limit],
		queryFn: () => post.getInfinitePosts('', '', '', page, limit)
	})

export const Route = createFileRoute('/_home/')({
	component: RouteComponent,
	loader: async () => {
		return queryClient.fetchQuery(postsQueryOptions(1, 10))
	}
})

function RouteComponent() {
	const { setOpenDialog } = useDialog()
	const {
		data: { data: posts, page, limit, hasMore }
	} = useSuspenseQuery(postsQueryOptions(1, 10))

	const fetchNextPage = () => {
		queryClient.fetchQuery(postsQueryOptions(page + 1, limit))
	}

	const hasNextPage = hasMore

	return (
		<>
			{/* <div className='w-full sm:flex hidden '>
				<CreateWithInput onClick={() => setOpenDialog(true)} />
			</div>
			<InfiniteScroll
				dataLength={posts?.length ?? 0}
				next={fetchNextPage}
				hasMore={hasNextPage ?? false}
				loader={
					<div className='h-[100px] w-full justify-center items-center flex  mb-[10vh] sm:mb-0'>
						<Icons.loading className='h-11 w-11' />
					</div>
				}
			>
				<div>
					{posts?.map((post, index) => {
						return (
							<div key={index} className={cn({ 'mb-[10vh]': index == posts.length - 1 })}>
								<PostCard {...post} />
								{index !== posts.length - 1 && <Separator />}
							</div>
						)
					})}
				</div>
			</InfiniteScroll> */}
			<div className='w-full h-full bg-red-500'>No posts yet</div>
		</>
	)
}
