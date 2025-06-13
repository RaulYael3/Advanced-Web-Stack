'use client'

import { useEffect } from 'react'
import { useTicketStore } from '@/features/tickets/model/store'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import {
	ArrowLeft,
	ArrowRight,
	Film,
	Calendar,
	MapPin,
	Users,
	Clock,
	CheckCircle,
} from 'lucide-react'
import Image from 'next/image'

export default function CinerexPage() {
	const {
		movies,
		screenings,
		availableSeats,
		selectedMovie,
		selectedScreening,
		selectedSeats,
		customerInfo,
		isLoading,
		error,
		currentStep,
		setSelectedMovie,
		setSelectedScreening,
		toggleSeatSelection,
		setCustomerInfo,
		setCurrentStep,
		loadMovies,
		loadScreenings,
		loadAvailableSeats,
		purchaseTickets,
		resetSelection,
	} = useTicketStore()

	useEffect(() => {
		loadMovies()
	}, [loadMovies])

	// Movie Selection Step
	const renderMoviesStep = () => (
		<div className='space-y-6'>
			<div className='text-center'>
				<h2 className='text-3xl font-bold text-gray-900'>
					Selecciona una Película
				</h2>
				<p className='text-gray-600 mt-2'>
					Elige la película que quieres ver
				</p>
			</div>

			<div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
				{movies.map((movie) => (
					<Card
						key={movie.id}
						className='cursor-pointer hover:shadow-lg transition-shadow'
						onClick={() => {
							setSelectedMovie(movie)
							loadScreenings(movie.id)
							setCurrentStep('screenings')
						}}
					>
						<div className='aspect-[2/3] relative overflow-hidden rounded-t-lg bg-gray-200'>
							{movie.photo ? (
								<Image
									src={movie.photo}
									alt={movie.name}
									fill
									className='object-cover'
								/>
							) : (
								<div className='flex items-center justify-center h-full'>
									<Film className='h-16 w-16 text-gray-400' />
								</div>
							)}
						</div>
						<CardHeader>
							<CardTitle className='text-lg'>
								{movie.name}
							</CardTitle>
							<div className='flex items-center gap-4 text-sm text-gray-600'>
								<div className='flex items-center'>
									<Clock className='h-4 w-4 mr-1' />
									{movie.duration} min
								</div>
								{movie.classification && (
									<Badge variant='secondary'>
										{movie.classification}
									</Badge>
								)}
							</div>
						</CardHeader>
						{movie.synopsis && (
							<CardContent>
								<p className='text-sm text-gray-600 line-clamp-3'>
									{movie.synopsis}
								</p>
							</CardContent>
						)}
					</Card>
				))}
			</div>
		</div>
	)

	// Screening Selection Step
	const renderScreeningsStep = () => (
		<div className='space-y-6'>
			<div className='flex items-center gap-4'>
				<Button
					variant='ghost'
					onClick={() => setCurrentStep('movies')}
				>
					<ArrowLeft className='h-4 w-4 mr-2' />
					Volver
				</Button>
				<div>
					<h2 className='text-3xl font-bold text-gray-900'>
						Horarios Disponibles
					</h2>
					<p className='text-gray-600'>Para: {selectedMovie?.name}</p>
				</div>
			</div>

			<div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
				{screenings.map((screening) => (
					<Card
						key={screening.id}
						className='cursor-pointer hover:shadow-lg transition-shadow'
						onClick={() => {
							setSelectedScreening(screening)
							loadAvailableSeats(screening.id)
							setCurrentStep('seats')
						}}
					>
						<CardHeader>
							<div className='flex items-center justify-between'>
								<div className='flex items-center'>
									<Calendar className='h-5 w-5 mr-2 text-blue-600' />
									<div>
										<CardTitle className='text-lg'>
											{new Date(
												screening.datetime
											).toLocaleDateString('es-ES', {
												weekday: 'long',
												month: 'long',
												day: 'numeric',
											})}
										</CardTitle>
										<p className='text-lg font-semibold text-blue-600'>
											{new Date(
												screening.datetime
											).toLocaleTimeString('es-ES', {
												hour: '2-digit',
												minute: '2-digit',
											})}
										</p>
									</div>
								</div>
							</div>
							{screening.roomScreenings && (
								<div className='flex items-center text-gray-600'>
									<MapPin className='h-4 w-4 mr-1' />
									{screening.roomScreenings
										.map((rs) => rs.room.name)
										.join(', ')}
								</div>
							)}
						</CardHeader>
					</Card>
				))}
			</div>
		</div>
	)

	// Seat Selection Step
	const renderSeatsStep = () => (
		<div className='space-y-6'>
			<div className='flex items-center gap-4'>
				<Button
					variant='ghost'
					onClick={() => setCurrentStep('screenings')}
				>
					<ArrowLeft className='h-4 w-4 mr-2' />
					Volver
				</Button>
				<div>
					<h2 className='text-3xl font-bold text-gray-900'>
						Selecciona tus Asientos
					</h2>
					<p className='text-gray-600'>
						{selectedMovie?.name} -{' '}
						{new Date(
							selectedScreening?.datetime || ''
						).toLocaleString('es-ES')}
					</p>
				</div>
			</div>

			<div className='bg-white rounded-lg p-6'>
				<div className='text-center mb-6'>
					<div className='bg-gray-800 text-white py-2 px-4 rounded-lg inline-block'>
						🎬 PANTALLA
					</div>
				</div>

				<div
					className='grid gap-2'
					style={{
						gridTemplateColumns:
							'repeat(auto-fit, minmax(40px, 1fr))',
					}}
				>
					{availableSeats.map((seat) => (
						<button
							key={seat.id}
							onClick={() => toggleSeatSelection(seat)}
							disabled={seat.isOccupied}
							className={`
                w-10 h-10 rounded-md text-xs font-medium transition-colors
                ${
					seat.isOccupied
						? 'bg-red-200 text-red-800 cursor-not-allowed'
						: selectedSeats.some((s) => s.id === seat.id)
						? 'bg-blue-600 text-white'
						: 'bg-gray-200 hover:bg-gray-300 text-gray-800'
				}
              `}
						>
							{seat.row}
							{seat.code}
						</button>
					))}
				</div>

				<div className='flex justify-center gap-6 mt-6 text-sm'>
					<div className='flex items-center'>
						<div className='w-4 h-4 bg-gray-200 rounded mr-2'></div>
						Disponible
					</div>
					<div className='flex items-center'>
						<div className='w-4 h-4 bg-blue-600 rounded mr-2'></div>
						Seleccionado
					</div>
					<div className='flex items-center'>
						<div className='w-4 h-4 bg-red-200 rounded mr-2'></div>
						Ocupado
					</div>
				</div>

				{selectedSeats.length > 0 && (
					<div className='mt-6 text-center'>
						<p className='text-lg font-semibold'>
							Asientos seleccionados:{' '}
							{selectedSeats
								.map((s) => `${s.row}${s.code}`)
								.join(', ')}
						</p>
						<Button
							className='mt-4'
							onClick={() => setCurrentStep('checkout')}
						>
							Continuar al Checkout
							<ArrowRight className='h-4 w-4 ml-2' />
						</Button>
					</div>
				)}
			</div>
		</div>
	)

	// Checkout Step
	const renderCheckoutStep = () => (
		<div className='space-y-6'>
			<div className='flex items-center gap-4'>
				<Button variant='ghost' onClick={() => setCurrentStep('seats')}>
					<ArrowLeft className='h-4 w-4 mr-2' />
					Volver
				</Button>
				<h2 className='text-3xl font-bold text-gray-900'>
					Información del Cliente
				</h2>
			</div>

			<div className='grid gap-6 md:grid-cols-2'>
				<Card>
					<CardHeader>
						<CardTitle>Resumen de Compra</CardTitle>
					</CardHeader>
					<CardContent className='space-y-4'>
						<div>
							<p className='font-semibold'>
								{selectedMovie?.name}
							</p>
							<p className='text-gray-600'>
								{new Date(
									selectedScreening?.datetime || ''
								).toLocaleString('es-ES')}
							</p>
						</div>
						<div>
							<p className='font-semibold'>Asientos:</p>
							<p className='text-gray-600'>
								{selectedSeats
									.map((s) => `${s.row}${s.code}`)
									.join(', ')}
							</p>
						</div>
						<div>
							<p className='font-semibold'>
								Total: ${selectedSeats.length * 12}.00
							</p>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Datos del Cliente</CardTitle>
					</CardHeader>
					<CardContent className='space-y-4'>
						<div>
							<Label htmlFor='name'>Nombre Completo</Label>
							<Input
								id='name'
								value={customerInfo.name}
								onChange={(e) =>
									setCustomerInfo({
										...customerInfo,
										name: e.target.value,
									})
								}
								placeholder='Tu nombre completo'
							/>
						</div>
						<div>
							<Label htmlFor='email'>Email</Label>
							<Input
								id='email'
								type='email'
								value={customerInfo.email}
								onChange={(e) =>
									setCustomerInfo({
										...customerInfo,
										email: e.target.value,
									})
								}
								placeholder='tu@email.com'
							/>
						</div>
						<Button
							className='w-full'
							onClick={purchaseTickets}
							disabled={
								!customerInfo.name ||
								!customerInfo.email ||
								isLoading
							}
						>
							{isLoading ? 'Procesando...' : 'Comprar Boletos'}
						</Button>
					</CardContent>
				</Card>
			</div>
		</div>
	)

	// Confirmation Step
	const renderConfirmationStep = () => (
		<div className='text-center space-y-6'>
			<div className='flex justify-center'>
				<CheckCircle className='h-24 w-24 text-green-600' />
			</div>
			<h2 className='text-3xl font-bold text-gray-900'>
				¡Compra Exitosa!
			</h2>
			<p className='text-gray-600'>
				Tus boletos han sido enviados a {customerInfo.email}
			</p>
			<Button onClick={resetSelection}>Comprar Más Boletos</Button>
		</div>
	)

	if (isLoading && movies.length === 0) {
		return (
			<div className='flex items-center justify-center h-64'>
				<p className='text-gray-500'>Cargando películas...</p>
			</div>
		)
	}

	return (
		<div className='space-y-8'>
			{error && (
				<div className='bg-red-50 border border-red-200 rounded-lg p-4'>
					<p className='text-red-800 text-sm'>{error}</p>
				</div>
			)}

			{currentStep === 'movies' && renderMoviesStep()}
			{currentStep === 'screenings' && renderScreeningsStep()}
			{currentStep === 'seats' && renderSeatsStep()}
			{currentStep === 'checkout' && renderCheckoutStep()}
			{currentStep === 'confirmation' && renderConfirmationStep()}
		</div>
	)
}
