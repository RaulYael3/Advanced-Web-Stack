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

import { LogoIcon } from '../icons'
import { LogOut, Ticket, User } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export const Header = () => {
	const { user, logout } = useAuthStore()
	const pathname = usePathname()

	const handleLogout = () => {
		console.log('Logging out...')
		logout()
	}

	// No mostrar header completo en rutas de auth
	if (pathname.startsWith('/auth')) {
		return null
	}

	return (
		<header
			className='border-b  mx-auto  sticky top-0 z-50 rounded-lg'
			style={{
				boxShadow: `-3px -3px 8px var(--color-brand-50), 3px 3px 8px -4px var(--color-brand-700),
					inset -3px -3px 8px var(--color-brand-50), inset 3px 3px 8px -4px var(--color-brand-700)`,
			}}
		>
			<div className='flex h-24 items-center px-4'>
				{/* Logo centrado */}
				<div className='flex-1 flex'>
					<Link
						href={
							user?.role === 'admin' ? '/dashboard' : '/cinerex'
						}
					>
						<LogoIcon />
					</Link>
				</div>

				{/* Menú de opciones a la derecha */}
				<div className='flex items-center space-x-4'>
					{/* Botón de Ver Boletos (solo para clientes) */}
					{user?.role !== 'admin' && (
						<Link href='/cinerex/mis-boletos'>
							<Button
								variant='ghost'
								className='border-none bg-transparent text-brand-dark-700 hover:bg-brand-100 hidden md:flex'
								style={{
									boxShadow:
										pathname === '/cinerex/mis-boletos'
											? 'inset -3px -3px 8px var(--color-brand-50), inset 3px 3px 8px -4px var(--color-brand-700)'
											: '-3px -3px 8px var(--color-brand-50), 3px 3px 8px -4px var(--color-brand-700)',
								}}
							>
								<Ticket className='h-4 w-4 mr-2' />
								Mis Boletos
							</Button>
						</Link>
					)}

					{/* Dropdown para más opciones */}
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button
								variant='ghost'
								className='border-none bg-transparent text-brand-dark-700 hover:bg-brand-100 h-10 w-10 rounded-full p-0'
								style={{
									boxShadow:
										'-3px -3px 8px var(--color-brand-50), 3px 3px 8px -4px var(--color-brand-700)',
								}}
							>
								<User className='h-4 w-4' />
								<span className='sr-only'>
									Abrir menú de usuario
								</span>
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent
							className='w-56 bg-white border border-gray-200 shadow-lg'
							align='end'
							forceMount
						>
							<DropdownMenuLabel className='font-normal'>
								<div className='flex flex-col space-y-1'>
									<p className='text-sm font-medium leading-none text-brand-dark-800'>
										Perfil de Usuario
									</p>
									<p className='text-xs leading-none text-brand-dark-600 truncate'>
										{user?.email}
									</p>
								</div>
							</DropdownMenuLabel>
							<DropdownMenuSeparator />

							{/* Ver Boletos - opción para móvil o alternativa */}
							{user?.role !== 'admin' && (
								<>
									<DropdownMenuItem className='cursor-pointer hover:bg-gray-50'>
										<Link
											href='/cinerex/mis-boletos'
											className='flex items-center w-full'
										>
											<Ticket className='mr-2 h-4 w-4' />
											Ver Mis Boletos
										</Link>
									</DropdownMenuItem>
									<DropdownMenuSeparator />
								</>
							)}

							{/* Ir al Dashboard (solo para admins) */}
							{user?.role === 'admin' && (
								<>
									<DropdownMenuItem className='cursor-pointer hover:bg-gray-50'>
										<Link
											href='/dashboard'
											className='flex items-center w-full'
										>
											<User className='mr-2 h-4 w-4' />
											Panel de Admin
										</Link>
									</DropdownMenuItem>
									<DropdownMenuSeparator />
								</>
							)}

							<DropdownMenuItem className='cursor-pointer hover:bg-gray-50'>
								<Link
									href='/cinerex/mis-boletos'
									className='flex items-center w-full'
								>
									<User className='mr-2 h-4 w-4' />
									Mis boletos
								</Link>
							</DropdownMenuItem>

							<DropdownMenuSeparator />

							{/* Ir a Cinerex (para todos) */}
							<DropdownMenuItem className='cursor-pointer hover:bg-gray-50'>
								<Link
									href='/cinerex'
									className='flex items-center w-full'
								>
									<Ticket className='mr-2 h-4 w-4' />
									Ir a Cinerex
								</Link>
							</DropdownMenuItem>
							<DropdownMenuSeparator />

							{/* Cerrar Sesión */}
							<DropdownMenuItem
								onClick={handleLogout}
								className='cursor-pointer flex items-center text-red-600 hover:text-red-700 hover:bg-red-50'
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
