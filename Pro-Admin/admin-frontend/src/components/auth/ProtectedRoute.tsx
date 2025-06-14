'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/features/auth/model/store'

interface ProtectedRouteProps {
	children: React.ReactNode
	requireAdmin?: boolean
}

export const ProtectedRoute = ({
	children,
	requireAdmin = false,
}: ProtectedRouteProps) => {
	const { user, isLoading } = useAuthStore()
	const router = useRouter()
	const [isChecking, setIsChecking] = useState(true)

	useEffect(() => {
		const checkAuth = async () => {
			// Esperar a que se resuelva el estado de autenticación
			if (isLoading) {
				return
			}

			// Si no hay usuario, redirigir al login
			if (!user) {
				router.push('/auth/login')
				return
			}

			// Si se requiere admin y el usuario no es admin
			if (requireAdmin && user.role !== 'admin') {
				console.log('Access denied: User is not admin')
				router.push('/cinerex') // Redirigir a la app pública
				return
			}

			setIsChecking(false)
		}

		checkAuth()
	}, [user, isLoading, requireAdmin, router])

	// Mostrar loading mientras se verifica
	if (isLoading || isChecking) {
		return (
			<div className='min-h-screen bg-brand-100 flex items-center justify-center'>
				<div className='text-center'>
					<div className='animate-spin rounded-full h-12 w-12 border-b-2 border-brand-dark-700 mx-auto mb-4'></div>
					<p className='text-brand-dark-600'>
						Verificando permisos...
					</p>
				</div>
			</div>
		)
	}

	// Si no hay usuario o no tiene permisos, no mostrar nada (se está redirigiendo)
	if (!user || (requireAdmin && user.role !== 'admin')) {
		return null
	}

	return <>{children}</>
}
