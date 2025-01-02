import { notification } from '@/api'
import UserNotificationAvtar from '@/components/user/user-notification-avatar'
import { cn, formatTimeAgo, truncateText } from '@/lib/utils'
import { createFileRoute, Link } from '@tanstack/react-router'
import Username from '@/components/user/user-username'
import FollowButton from '@/components/buttons/follow-button'
import { Separator } from '@/components/ui/separator'

export const Route = createFileRoute('/_home/activity')({
	component: RouteComponent,
	loader: async () => {
		const data = await notification.getNotifications()
		return {
			data
		}
	}
})

function RouteComponent() {
	const { data } = Route.useLoaderData()
	const notifications = data.data
	return (
		<>
			{notifications && notifications.length > 0 ? (
				notifications.map((notification, index) => (
					<div
						key={index}
						className={cn('flex w-full mt-4', { 'mb-[15vh]': index == notifications.length - 1 })}
					>
						<UserNotificationAvtar
							username={notification.senderUser.username}
							image={notification.senderUser.image ?? ''}
							fullname={notification.senderUser.fullname ?? ''}
							type={notification.type}
						/>
						<div className='flex flex-col w-full ml-3'>
							<div className='flex justify-between items-center w-full'>
								<div className='flex flex-col gap-1 '>
									<div className='flex gap-1 items-center'>
										<Username author={notification.senderUser} />
										<time className='text-muted-foreground ml-3 leading-none text-[15px]'>
											{formatTimeAgo(notification.createdAt)}
										</time>
									</div>
									<Link href={`/@${notification.senderUser.username}`}>
										{notification.type !== 'ADMIN' ? (
											<div className='text-[15px] text-[#6A6A6A] tracking-wide leading-0 whitespace-pre-line'>
												<div
													dangerouslySetInnerHTML={{
														__html: truncateText(notification.message, 100)
															.slice(1, -1)
															.replace(/\\n/g, '\n')
													}}
												/>
											</div>
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
										isFollowedByMe={false}
									/>
								)}
							</div>
							<Separator className='mt-3' />
						</div>
					</div>
				))
			) : (
				<div className='h-[50vh] w-full justify-center items-center flex text-[#777777]'>
					<p>No notifications.</p>
				</div>
			)}
		</>
	)
}
