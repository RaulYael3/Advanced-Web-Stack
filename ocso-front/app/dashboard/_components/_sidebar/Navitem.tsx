'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'

interface NavItemProps {
	icon: ReactNode
	path: string
}

const NavItem = ({ icon, path }: NavItemProps) => {
	const currentPath = usePathname()
	return (
		<Link href={path} className='w-full flex justify-center'>
			<span
				className={
					path === currentPath
						? 'bg-cyan-300 w-10/12 flex justify-center rounded-md transition-colors duration-300 py-1.5'
						: 'flex justify-center w-10/12 py-1.5'
				}
			>
				{icon}
			</span>
		</Link>
	)
}

export default NavItem
