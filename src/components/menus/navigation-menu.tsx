import { Icons } from '@/components/icons'
import { useTheme } from 'next-themes'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { useNavigate } from '@tanstack/react-router'
import useUser from '@/store/user'
import useToken from '@/store/token'
import Cookie from 'js-cookie'

export default function NavigationMenu() {
	const navigate = useNavigate()
	const { theme, setTheme } = useTheme()
	const { clearUser } = useUser()
	const { setAccessToken } = useToken()

	const handleLogout = () => {
		clearUser()
		setAccessToken('')
		Cookie.remove('refreshToken')
		navigate({ to: '/' })
	}

	return (
		<>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<div>
						<Icons.menu className='h-[22px] w-[22px] text-secondary transform transition-all duration-150 ease-out hover:scale-100 active:scale-90 cursor-pointer hover:text-foreground active:text-foreground' />
					</div>
				</DropdownMenuTrigger>
				<DropdownMenuContent
					align='end'
					className='bg-background shadow-xl dark:bg-[#181818] z-[999] rounded-2xl w-[185px] mt-1 p-0'
				>
					<DropdownMenuItem
						onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
						className='focus:bg-transparent px-4 tracking-normal select-none font-semibold py-3 cursor-pointer text-[15px] active:bg-primary-foreground rounded-none'
					>
						Switch appearance
					</DropdownMenuItem>
					<DropdownMenuSeparator className='h-[1.2px] my-0' />
					<DropdownMenuItem className='focus:bg-transparent px-4 tracking-normal select-none font-semibold py-3 cursor-pointer text-[15px]  active:bg-primary-foreground  rounded-none'>
						About
					</DropdownMenuItem>
					<DropdownMenuSeparator className=' h-[1.2px] my-0' />
					<DropdownMenuItem className='focus:bg-transparent px-4 tracking-normal select-none font-semibold py-3 cursor-pointer text-[15px] active:bg-primary-foreground rounded-none'>
						Report a problem
					</DropdownMenuItem>
					<DropdownMenuSeparator className='h-[1.2px] my-0' />
					<DropdownMenuItem className='focus:bg-transparent px-4 tracking-normal select-none font-semibold py-3 cursor-pointer text-[15px]  active:bg-primary-foreground rounded-none'>
						<div aria-label='Log out' onClick={() => handleLogout()}>
							Log out
						</div>
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</>
	)
}
