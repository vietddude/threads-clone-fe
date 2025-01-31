import React from 'react'
import { Icons } from '@/components/icons'
import { ChevronRight } from 'lucide-react'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'
import { useDebounce } from '@/hooks/use-debounce'
import { Link, useNavigate } from '@tanstack/react-router'
import Username from '@/components/user/user-username'
import FollowButton from '@/components/buttons/follow-button'
import { user } from '@/api'
import { infiniteQueryOptions, useInfiniteQuery } from '@tanstack/react-query'
import InfiniteScroll from 'react-infinite-scroll-component'
import { Route } from '@/routes/__root'

export default function SearchContainer() {
	const navigate = useNavigate({ from: Route.fullPath })
	const [searchValue, setSearchValue] = React.useState('')
	const debouncedSearch = useDebounce(searchValue, 200)

	return (
		<>
			{searchValue !== '' && (
				<div className='fixed inset-0 z-[50] bg-background/70 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0' />
			)}

			<div
				className={cn(
					'absolute rounded-2xl  border border-border bg-primary-foreground  max-w-xl w-full mb-3 transition-transform duration-300 z-[80]',
					{
						'scale-105 bg-background dark:bg-primary-foreground': searchValue !== '',
						'scale-100': searchValue === ''
					}
				)}
			>
				<div className='relative w-full flex  px-3 py-2  ring-offset-background placeholder:text-muted-foreground pl-14 h-[60px]'>
					<Icons.search className='h-4 w-4 text-[#4D4D4D] absolute left-6 -translate-y-2/4 top-2/4 ' />
					<input
						value={searchValue}
						className='resize-none text-base bg-transparent w-full placeholder:text-[#777777] outline-none placeholder:text-[15px]'
						placeholder='Search'
						onChange={(e) => setSearchValue(e.target.value)}
					/>
				</div>
				{searchValue !== '' && (
					<div className='flex-1 max-h-[60vh] border-t border-border overflow-y-auto no-scrollbar'>
						<div className='flex items-center w-full '>
							<div className='mx-[30px]'>
								<Icons.search className='h-4 w-4  text-[#4D4D4D]' />
							</div>
							<div
								onClick={() => {
									navigate({
										search: { q: searchValue }
									})
									setSearchValue('')
								}}
								className='flex justify-between items-center w-full py-5 mr-6 cursor-pointer'
							>
								<div className='text-base font-semibold tracking-normal '>
									Search for post with <span>&quot;{searchValue}&quot;</span>
								</div>
								<ChevronRight className='h-5 w-5  ' />
							</div>
						</div>
						<DisplaySearchedResults debouncedSearch={debouncedSearch} />
					</div>
				)}
			</div>
		</>
	)
}

interface DisplaySearchedResultsProps {
	debouncedSearch: string
}

const usersQueryOptions = (query: string) =>
	infiniteQueryOptions({
		queryKey: ['user-query', query],
		queryFn: ({ pageParam }) => user.infiniteUsers({ query, pageParam }),
		initialPageParam: 1,
		getNextPageParam: (lastPage) => {
			const totalPages = Math.ceil(lastPage.totalItems / lastPage.pageSize)
			return lastPage.currentPage < totalPages ? lastPage.currentPage + 1 : undefined
		}
	})

const DisplaySearchedResults: React.FC<DisplaySearchedResultsProps> = ({ debouncedSearch }) => {
	const { data, hasNextPage, fetchNextPage } = useInfiniteQuery(usersQueryOptions(debouncedSearch))

	const allUsers = data?.pages.flatMap((page) => page.data)

	return (
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
			{allUsers?.map((user, index) => (
				<div key={index} className='flex items-center w-full '>
					<button className='mx-5 '>
						<div className='h-9 w-9 outline outline-1  outline-border rounded-full'>
							<Avatar className='rounded-full w-full h-full'>
								<AvatarImage src={user.image ?? ''} alt={user.fullname ?? ''} />
								<AvatarFallback>OG</AvatarFallback>
							</Avatar>
						</div>
					</button>
					<div className='flex justify-between items-center w-full border-t border-border py-4 mr-6'>
						<Link href={`/@`} className='flex flex-col gap-1.5 w-full'>
							<div className='flex flex-col w-full'>
								<div className='flex'>
									<Username author={user} />
									{/* TODO: This is temp solution */}
									<div className='w-3 h-3 invisible'>
										<Icons.verified className='w-3 h-3' />
									</div>
								</div>
								<span className='text-[14px]  text-[#6A6A6A] tracking-wide mt-1'>{user.fullname}</span>
							</div>
						</Link>
						<FollowButton className='text-[14px] px-6' variant='outline' author={{ ...user }} />
					</div>
				</div>
			))}
		</InfiniteScroll>
	)
}
