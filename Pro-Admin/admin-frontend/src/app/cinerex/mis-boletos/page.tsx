'use client'

import { useEffect, useState } from 'react'
import { useAuthStore } from '@/features/auth/model/store'
import { ticketsApi } from '@/features/tickets/api/tickets.api'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Calendar, Clock, MapPin, Ticket } from 'lucide-react'
import Link from 'next/link'

interface CustomerTicket {
	id: number
	purchaseDate: string
	seat: {
		id: number
		seatNumber: number
		row: string
		room: {
			id: number
			name: string
		}
	}
	screening: {
		id: number
		datetime: string
		movie: {
			id: number
			name: string
			duration: number
			genre?: string
		}
	}
}

export default function MisBoletosPage() {
	const { user } = useAuthStore()
	const [tickets, setTickets] = useState<CustomerTicket[]>([])
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		const loadTickets = async () => {
			if (!user?.email) {
				setError('No hay usuario logueado')
				setIsLoading(false)
				return
			}

			try {
				setIsLoading(true)
				const customerTickets = await ticketsApi.getCustomerTickets(
					user.email
				)
				setTickets(customerTickets)
			} catch (error) {
				console.error('Error loading tickets:', error)
				setError('Error al cargar los boletos')
			} finally {
				setIsLoading(false)
			}
		}

		loadTickets()
	}, [user?.email])

	if (isLoading) {
		return (
			<div className='min-h-screen bg-brand-50 flex items-center justify-center'>
				<div className='text-center'>
					<div className='animate-spin rounded-full h-12 w-12 border-b-2 border-brand-dark-700 mx-auto mb-4'></div>
					<p className='text-brand-dark-600'>Cargando boletos...</p>
				</div>
			</div>
		)
	}

	return (
		<div className='min-h-screen bg-brand-50 p-8'>
			<div className='max-w-4xl mx-auto'>
				{/* Header */}
				<div className='flex items-center justify-between mb-8'>
					<div className='flex items-center space-x-4'>
						<Link href='/cinerex'>
							<Button
								variant='ghost'
								className='border-none bg-transparent text-brand-dark-700 hover:bg-brand-100'
								style={{
									boxShadow:
										'-3px -3px 8px var(--color-brand-50), 3px 3px 8px -4px var(--color-brand-700)',
								}}
							>
								<ArrowLeft className='h-4 w-4 mr-2' />
								Volver
							</Button>
						</Link>
						<div>
							<h1 className='text-3xl font-bold text-brand-dark-800'>
								Mis Boletos
							</h1>
							<p className='text-brand-dark-600'>
								Historial de compras para {user?.email}
							</p>
						</div>
					</div>
				</div>

				{/* Error */}
				{error && (
					<div className='bg-red-100 border border-red-300 rounded-2xl p-6 mb-8'>
						<p className='text-red-700 text-center'>{error}</p>
					</div>
				)}

				{/* Tickets */}
				{tickets.length === 0 ? (
					<div
						className='bg-brand-100 rounded-3xl p-12 text-center'
						style={{
							boxShadow:
								'-6px -6px 20px var(--color-brand-50), 6px 6px 20px -10px var(--color-brand-700)',
						}}
					>
						<Ticket className='h-16 w-16 text-brand-dark-400 mx-auto mb-4' />
						<h3 className='text-xl font-semibold text-brand-dark-800 mb-2'>
							No tienes boletos
						</h3>
						<p className='text-brand-dark-600 mb-6'>
							Aún no has comprado ningún boleto para funciones.
						</p>
						<Link href='/cinerex'>
							<Button
								className='border-none bg-transparent text-brand-dark-700 hover:bg-brand-200 px-8 py-3'
								style={{
									boxShadow:
										'-6px -6px 20px var(--color-brand-50), 6px 6px 20px -10px var(--color-brand-700)',
								}}
							>
								Comprar Boletos
							</Button>
						</Link>
					</div>
				) : (
					<div className='grid gap-6'>
						{tickets.map((ticket) => (
							<div
								key={ticket.id}
								className='bg-brand-100 rounded-3xl p-6'
								style={{
									boxShadow:
										'-6px -6px 20px var(--color-brand-50), 6px 6px 20px -10px var(--color-brand-700)',
								}}
							>
								<div className='flex flex-col md:flex-row md:items-center md:justify-between'>
									<div className='flex-1'>
										<h3 className='text-xl font-bold text-brand-dark-800 mb-2'>
											{ticket.screening.movie.name}
										</h3>
										<div className='grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-brand-dark-600'>
											<div className='flex items-center'>
												<Calendar className='h-4 w-4 mr-2' />
												{new Date(
													ticket.screening.datetime
												).toLocaleDateString('es-ES')}
											</div>
											<div className='flex items-center'>
												<Clock className='h-4 w-4 mr-2' />
												{new Date(
													ticket.screening.datetime
												).toLocaleTimeString('es-ES', {
													hour: '2-digit',
													minute: '2-digit',
												})}
											</div>
											<div className='flex items-center'>
												<MapPin className='h-4 w-4 mr-2' />
												{ticket.seat.room.name}
											</div>
										</div>
									</div>
									<div className='mt-4 md:mt-0 md:ml-6'>
										<div
											className='bg-brand-100 rounded-2xl p-4 text-center'
											style={{
												boxShadow:
													'inset -4px -4px 12px var(--color-brand-50), inset 4px 4px 12px -6px var(--color-brand-700)',
											}}
										>
											<div className='text-2xl font-bold text-brand-dark-800'>
												{ticket.seat.row}
												{ticket.seat.seatNumber}
											</div>
											<div className='text-xs text-brand-dark-600'>
												Asiento
											</div>
										</div>
									</div>
								</div>
								<div className='mt-4 pt-4 border-t border-brand-dark-200'>
									<div className='flex justify-between items-center text-xs text-brand-dark-500'>
										<span>Boleto #{ticket.id}</span>
										<span>
											Comprado el{' '}
											{new Date(
												ticket.purchaseDate
											).toLocaleDateString('es-ES')}
										</span>
									</div>
								</div>
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	)
}
