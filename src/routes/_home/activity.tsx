import { notification } from '@/api'
import UserNotificationAvtar from '@/components/user/user-notification-avatar'
import { cn, formatTimeAgo, truncateText } from '@/lib/utils'
import { createFileRoute, Link } from '@tanstack/react-router'
import Username from '@/components/user/user-username'
import FollowButton from '@/components/buttons/follow-button'
import { Separator } from '@/components/ui/separator'
import { infiniteQueryOptions, useInfiniteQuery } from '@tanstack/react-query'
import { queryClient } from '../__root'
import InfiniteScroll from 'react-infinite-scroll-component'
import { NotFound } from '../not-found'
import { Icons } from '@/components/icons'

const notiQueryOptions = () =>
	infiniteQueryOptions({
		queryKey: ['noti'],
		queryFn: ({ pageParam }) => notification.getNotifications({ pageParam }),
		initialPageParam: 1,
		getNextPageParam: (lastPage) => {
			const totalPages = Math.ceil(lastPage.totalItems / lastPage.pageSize)
			return lastPage.currentPage < totalPages ? lastPage.currentPage + 1 : undefined
		}
	})

export const Route = createFileRoute('/_home/activity')({
	component: RouteComponent,
	loader: async () => {
		queryClient.fetchInfiniteQuery(notiQueryOptions())
	}
})

function RouteComponent() {
	const { data, hasNextPage, fetchNextPage } = useInfiniteQuery(notiQueryOptions())
	const allNotis = data?.pages.flatMap((page) => page.data)

	return (
		<>
			{allNotis ? (
				allNotis.length > 0 ? (
					<InfiniteScroll
						dataLength={allNotis.length}
						next={fetchNextPage}
						hasMore={hasNextPage ?? false}
						loader={
							<div className='h-[100px] w-full justify-center items-center flex mb-[10vh] sm:mb-0'>
								<Icons.loading className='h-11 w-11' />
							</div>
						}
					>
						{allNotis.map((notification, index) => (
							<div
								key={index}
								className={cn('flex w-full mt-4', { 'mb-[15vh]': index === allNotis.length - 1 })}
							>
								<UserNotificationAvtar
									username={notification.senderUser.username}
									image={notification.senderUser.image ?? ''}
									fullname={notification.senderUser.fullname ?? ''}
									type={notification.type}
								/>
								<div className='flex flex-col w-full ml-3'>
									<div className='flex justify-between items-center w-full'>
										<div className='flex flex-col gap-1'>
											<div className='flex gap-1 items-center'>
												<Username author={notification.senderUser} />
												<time className='text-muted-foreground ml-3 leading-none text-[15px]'>
													{formatTimeAgo(notification.createdAt)}
												</time>
											</div>
											<Link href={`/@${notification.senderUser.username}`}>
												{notification.type !== 'ADMIN' ? (
													<span
														dangerouslySetInnerHTML={{
															__html: truncateText(notification.message, 100)
																.replace(/^"|"$/g, '')
																.replace(/\\n/g, '\n')
														}}
														className='text-[15px] text-[#6A6A6A] tracking-wide leading-0 whitespace-pre-line'
													/>
												) : (
													<span className='text-[15px] text-accent-foreground tracking-wide leading-5'>
														{notification.message}
													</span>
												)}
											</Link>
										</div>
										{notification.type === 'FOLLOW' && (
											<FollowButton
												className='text-[14px] px-6'
												variant='outline'
												author={notification.senderUser}
											/>
										)}
									</div>
									<Separator className='mt-3' />
								</div>
							</div>
						))}
					</InfiniteScroll>
				) : (
					<div className='h-[50vh] w-full justify-center items-center flex text-[#777777]'>
						<p>No notifications.</p>
					</div>
				)
			) : (
				<NotFound />
			)}
		</>
	)
}
