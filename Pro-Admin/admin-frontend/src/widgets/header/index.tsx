'use client'
import { useAuthStore } from '@/features/auth/model/store'
import { Button } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { LogoIcon } from '../icons'
import { LogOut } from 'lucide-react'

export const Header = () => {
	const { user, logout } = useAuthStore()

	const handleLogout = () => {
		console.log('Logging out...')
		logout()
	}

	return (
		<header className='border-b'>
			<div className='flex h-24 items-center px-4'>
				<LogoIcon />
				<div className='ml-auto flex items-center space-x-4'>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button
								variant='ghost'
								className='relative h-8 w-8 rounded-full'
							>
								<Avatar className='h-8 w-8'>
									<AvatarImage
										src='/avatars/01.png'
										alt={user?.name || 'Usuario'}
									/>
									<AvatarFallback>
										{user?.name?.charAt(0) || 'U'}
									</AvatarFallback>
								</Avatar>
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent
							className='w-56'
							align='end'
							forceMount
						>
							<DropdownMenuLabel className='font-normal'>
								<div className='flex flex-col space-y-1'>
									<p className='text-sm font-medium leading-none'>
										{user?.name}
									</p>
									<p className='text-xs leading-none text-muted-foreground'>
										{user?.email}
									</p>
								</div>
							</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuItem
								onClick={handleLogout}
								className='cursor-pointer flex items-center'
							>
								<LogOut className='mr-2 h-4 w-4' />
								Cerrar Sesión
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>
		</header>
	)
}
