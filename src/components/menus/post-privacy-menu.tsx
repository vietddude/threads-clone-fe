import React from 'react'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import usePost from '@/store/post'
import { PostPrivacy } from '@/types/enums'

const PostPrivacyMenu: React.FC = () => {
	const { postPrivacy, setPostPrivacy } = usePost() as {
		postPrivacy: PostPrivacy
		setPostPrivacy: (postPrivacy: PostPrivacy) => void
	}

	const privacyText = {
		[PostPrivacy.ANYONE]: 'Anyone can reply',
		[PostPrivacy.FOLLOWED]: 'Profiles you follow can reply',
		[PostPrivacy.MENTIONED]: 'Profiles you mention can reply'
	}

	const privacyDisplayText = React.useMemo(() => {
		return privacyText[postPrivacy]
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [postPrivacy])

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<button className='text-[15px] text-[#777777] tracking-normal z-50 cursor-pointer select-none outline-none'>
					{privacyDisplayText}
				</button>
			</DropdownMenuTrigger>
			<DropdownMenuContent
				align='start'
				className=' bg-background shadow-2xl dark:bg-[#181818] rounded-2xl w-[190px] mt-1 z-[1000] p-0'
			>
				<DropdownMenuItem
					className='focus:bg-transparent px-4 tracking-normal  select-none font-semibold py-3 cursor-pointer text-[15px] rounded-none active:bg-primary-foreground'
					onClick={() => setPostPrivacy(PostPrivacy.ANYONE)}
				>
					Anyone
				</DropdownMenuItem>
				<DropdownMenuSeparator className=' h-[1.2px] my-0' />
				<DropdownMenuItem
					className='focus:bg-transparent px-4 tracking-normal  select-none font-semibold py-3 cursor-pointer text-[15px] rounded-none active:bg-primary-foreground'
					onClick={() => setPostPrivacy(PostPrivacy.FOLLOWED)}
				>
					Profiles you follow
				</DropdownMenuItem>
				<DropdownMenuSeparator className=' h-[1.2px] my-0' />
				<DropdownMenuItem
					className='focus:bg-transparent px-4 tracking-normal  select-none font-semibold py-3 cursor-pointer text-[15px] rounded-none active:bg-primary-foreground'
					onClick={() => setPostPrivacy(PostPrivacy.MENTIONED)}
				>
					Mentioned only
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

export default PostPrivacyMenu
