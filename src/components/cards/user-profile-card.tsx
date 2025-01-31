import React from 'react'
import { Link } from '@tanstack/react-router'
import { formatURL } from '@/lib/utils'
import { Icons } from '@/components/icons'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import FollowButton from '@/components/buttons/follow-button'
import UserFollowers from '@/components/user/user-followers'
import { useQuery } from '@tanstack/react-query'
import { user } from '@/api'

type UserProfileCardProps = {
	username: string
}

const UserProfileCard: React.FC<UserProfileCardProps> = (props) => {
	const { username } = props

	const { data: profile } = useQuery({
		queryKey: ['profile', username],
		queryFn: () => user.getProfile(username)
	})

	if (!profile) return null
	const { bio, image, fullname, link, isAdmin, followers } = profile

	return (
		<div className='z-[10] flex  flex-col space-y-4 h-fit  rounded-2xl p-6 bg-background shadow-xl dark:bg-[#181818]'>
			<Link href={`/@${username}`} className='flex w-full items-center '>
				<div className='flex w-full flex-col  gap-1 truncate '>
					<h1 className='text-[25px] font-extrabold tracking-normal truncate '>{fullname}</h1>
					<div className='flex gap-1'>
						<h4 className='text-[15px] truncate'>{username}</h4>
						<span className='ml-0.5 rounded-2xl bg-primary text-[#777777] text-xm px-1.5 py-1 text-[11px] font-medium'>
							threads.net
						</span>
					</div>
				</div>
				<Avatar className='h-[64px] w-[64px] overflow-visible outline outline-2 outline-border relative'>
					<AvatarImage
						src={image ?? ''}
						alt={fullname ?? ''}
						className='h-min w-full rounded-full object-cover '
					/>
					<AvatarFallback>{username.slice(0, 2).toUpperCase()}</AvatarFallback>
					{isAdmin && (
						<div className='absolute bottom-0 -left-1'>
							<Icons.verified2 className='h-5 w-5 text-background' />
						</div>
					)}
				</Avatar>
			</Link>

			{bio && (
				<span
					dangerouslySetInnerHTML={{
						__html: bio.replace(/^"|"$/g, '').replace(/\\n/g, '\n')
					}}
					className='text-[15px] max-h-[100px] whitespace-pre-line text-overflow-ellipsis'
				/>
			)}
			<div className='flex items-center'>
				<UserFollowers followers={followers} showImage={true} />

				{followers.length > 0 && link && <span className='mx-2 text-[#777777]'> · </span>}

				{link && (
					<Link
						href={link}
						className='text-[#777777] text-[15px] hover:underline cursor-pointer active:text-[#4d4d4d]'
					>
						{formatURL(link)}
					</Link>
				)}
			</div>
			<FollowButton variant='default' author={profile} />
		</div>
	)
}

export default UserProfileCard
