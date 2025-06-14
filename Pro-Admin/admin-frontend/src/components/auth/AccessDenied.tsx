'use client'

import { Button } from '@/components/ui/button'
import { ShieldX, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export const AccessDenied = () => {
	return (
		<div className='min-h-screen bg-brand-100 flex items-center justify-center p-4'>
			<div
				className='bg-brand-100 rounded-3xl p-12 text-center max-w-md w-full'
				style={{
					boxShadow:
						'-6px -6px 20px var(--color-brand-50), 6px 6px 20px -10px var(--color-brand-700)',
				}}
			>
				<ShieldX className='h-20 w-20 text-red-500 mx-auto mb-6' />
				<h1 className='text-2xl font-bold text-brand-dark-800 mb-4'>
					Acceso Denegado
				</h1>
				<p className='text-brand-dark-600 mb-8'>
					No tienes permisos para acceder a esta sección. Solo los
					administradores pueden acceder al panel de administración.
				</p>
				<div className='space-y-4'>
					<Link href='/cinerex'>
						<Button
							className='w-full border-none bg-transparent text-brand-dark-700 hover:bg-brand-200'
							style={{
								boxShadow:
									'-6px -6px 20px var(--color-brand-50), 6px 6px 20px -10px var(--color-brand-700)',
							}}
						>
							<ArrowLeft className='h-4 w-4 mr-2' />
							Ir a Cinerex
						</Button>
					</Link>
				</div>
			</div>
		</div>
	)
}
