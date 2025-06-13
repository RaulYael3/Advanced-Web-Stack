'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Menu } from 'lucide-react'

const navigation = [
	{ name: 'Dashboard', href: '/dashboard' },
	{ name: 'Salas', href: '/dashboard/salas' },
	{ name: 'Funciones', href: '/dashboard/funciones' },
	{ name: 'Películas', href: '/dashboard/peliculas' },
]

export const Sidebar = () => {
	const pathname = usePathname()

	// No mostrar sidebar en rutas de cinerex (aplicación pública)
	if (pathname.startsWith('/cinerex')) {
		return null
	}

	return (
		<>
			{/* Mobile Sidebar */}
			<Sheet>
				<SheetTrigger asChild>
					<Button variant='ghost' className='md:hidden'>
						<Menu className='h-20 w-20' />
					</Button>
				</SheetTrigger>
				<SheetContent side='left' className='w-[240px] sm:w-[300px]'>
					<nav className='flex flex-col gap-4'>
						{navigation.map((item) => (
							<Link
								key={item.name}
								href={item.href}
								className={cn(
									'flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:text-primary',
									pathname === item.href
										? 'bg-muted font-medium text-primary'
										: 'text-muted-foreground'
								)}
							>
								{item.name}
							</Link>
						))}
					</nav>
				</SheetContent>
			</Sheet>

			{/* Desktop Sidebar */}
			<div className='hidden md:flex'>
				<div className='flex h-full w-[240px] flex-col border-r'>
					<ScrollArea className='flex-1 px-3'>
						<nav className='flex flex-col gap-2 py-4'>
							{navigation.map((item) => (
								<Link
									key={item.name}
									href={item.href}
									className={cn(
										'flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:text-primary',
										pathname === item.href
											? 'bg-muted font-medium text-primary'
											: 'text-muted-foreground'
									)}
								>
									{item.name}
								</Link>
							))}
						</nav>
					</ScrollArea>
				</div>
			</div>
		</>
	)
}
