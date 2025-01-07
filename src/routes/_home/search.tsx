import PostCard from '@/components/cards/post-card'
import { Icons } from '@/components/icons'
import Loading from '@/components/loading'
import { cn } from '@/lib/utils'
import { Separator } from '@radix-ui/react-dropdown-menu'
import { createFileRoute } from '@tanstack/react-router'
import InfiniteScroll from 'react-infinite-scroll-component'
import { queryClient } from '../__root'
import { post, user } from '@/api'
import SearchContainer from '@/components/search-container'
import UserCard from '@/components/user/user-action-card'
import { Error } from '../error'
import { infiniteQueryOptions, useInfiniteQuery } from '@tanstack/react-query'
import { z } from 'zod'

const usersQueryOptions = () =>
	infiniteQueryOptions({
		queryKey: ['all-users'],
		queryFn: ({ pageParam }) => user.infiniteUsers({ pageParam }),
		initialPageParam: 1,
		getNextPageParam: (lastPage) => {
			const totalPages = Math.ceil(lastPage.totalItems / lastPage.pageSize)
			return lastPage.currentPage < totalPages ? lastPage.currentPage + 1 : undefined
		}
	})

const searchSchema = z.object({
	q: z.string().optional()
})

export const Route = createFileRoute('/_home/search')({
	component: RouteComponent,
	validateSearch: searchSchema,
	loader: async () => {
		await queryClient.fetchInfiniteQuery(usersQueryOptions())
	}
})

function RouteComponent() {
	const { q: search } = Route.useSearch()
	const { data, hasNextPage, fetchNextPage, isLoading } = useInfiniteQuery(usersQueryOptions())

	const allUsers = data?.pages.flatMap((page) => page.data)
	return (
		<>
			<div className='relative mt-1'>
				<SearchContainer />
			</div>
			<div className='pt-16'>
				{!isLoading ? (
					<>
						{!search ? (
							<InfiniteScroll
								dataLength={allUsers ? allUsers.length : 0}
								next={fetchNextPage}
								hasMore={hasNextPage ?? false}
								loader={
									<div className='h-[100px] w-full justify-center items-center flex  mb-[10vh] sm:mb-0'>
										<Icons.loading className='h-11 w-11' />
									</div>
								}
							>
								{allUsers?.map((user) => {
									console.log('user', user)
									return <UserCard key={user.id} {...user} />
								})}
							</InfiniteScroll>
						) : (
							<DisplayQueryPosts searchQuery={search} />
						)}
					</>
				) : (
					<Loading />
				)}
			</div>
		</>
	)
}

const postsQueryOptions = (query: string) =>
	infiniteQueryOptions({
		queryKey: ['post-query', query],
		queryFn: ({ pageParam }) => post.infinitePosts({ pageParam, query }),
		initialPageParam: 1,
		getNextPageParam: (lastPage) => {
			const totalPages = Math.ceil(lastPage.totalItems / lastPage.pageSize)
			return lastPage.currentPage < totalPages ? lastPage.currentPage + 1 : undefined
		}
	})

interface DisplayQueryPostsProps {
	searchQuery: string | null
}

const DisplayQueryPosts: React.FC<DisplayQueryPostsProps> = ({ searchQuery }) => {
	if (searchQuery === null) {
		return <></>
	}

	const { data, hasNextPage, fetchNextPage, isLoading, isError } = useInfiniteQuery(postsQueryOptions(searchQuery))

	const allPosts = data?.pages.flatMap((page) => page.data)

	if (isLoading) return <Loading />
	if (isError) return <Error />

	if (allPosts?.length === 0 || allPosts === undefined) {
		return (
			<div className='h-[50vh] w-full justify-center items-center flex text-[#777777]'>
				<p>No users.</p>
			</div>
		)
	}

	return (
		<div className='mt-2'>
			<InfiniteScroll
				dataLength={allPosts ? allPosts.length : 0}
				next={fetchNextPage}
				hasMore={hasNextPage ?? false}
				loader={
					<div className='h-[100px] w-full justify-center items-center flex  mb-[10vh] sm:mb-0'>
						<Icons.loading className='h-11 w-11' />
					</div>
				}
			>
				{allPosts?.map((post, index) => {
					return (
						<div key={index} className={cn({ 'mb-[10vh]': index == allPosts.length - 1 })}>
							<PostCard key={index} {...post} />
							{index !== allPosts.length - 1 && <Separator />}
						</div>
					)
				})}
			</InfiniteScroll>
		</div>
	)
}
