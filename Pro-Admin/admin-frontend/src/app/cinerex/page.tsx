'use client'

import { useEffect } from 'react'
import { useTicketStore } from '@/features/tickets/model/store'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

// Components
import MovieCard from './components/MovieCard'
import ScreeningCard from './components/ScreeningCard'
import SeatGrid from './components/SeatGrid'
import StepNavigation from './components/StepNavigation'
import PurchaseSummary from './components/PurchaseSummary'
import CustomerForm from './components/CustomerForm'
import ConfirmationMessage from './components/ConfirmationMessage'
import LoadingSpinner from './components/LoadingSpinner'

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
		<div className='space-y-8'>
			<StepNavigation
				title='Selecciona una Película'
				subtitle='Elige la película que quieres ver'
				showBack={false}
			/>

			<div className='space-y-8'>
				{movies.map((movie) => (
					<MovieCard
						key={movie.id}
						movie={movie}
						onScreeningSelect={(screening) => {
							setSelectedMovie(movie)
							setSelectedScreening(screening)
							loadAvailableSeats(screening.id)
							setCurrentStep('seats')
						}}
					/>
				))}
			</div>
		</div>
	)

	// Screening Selection Step
	const renderScreeningsStep = () => (
		<div className='space-y-8'>
			<StepNavigation
				title='Horarios Disponibles'
				subtitle={`Para: ${selectedMovie?.name}`}
				onBack={() => setCurrentStep('movies')}
			/>

			<div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
				{screenings.map((screening) => (
					<ScreeningCard
						key={screening.id}
						screening={screening}
						onClick={() => {
							setSelectedScreening(screening)
							loadAvailableSeats(screening.id)
							setCurrentStep('seats')
						}}
					/>
				))}
			</div>
		</div>
	)

	// Seat Selection Step
	const renderSeatsStep = () => (
		<div className='space-y-8'>
			<StepNavigation
				title='Selecciona tus Asientos'
				subtitle={`${selectedMovie?.name} - ${new Date(
					selectedScreening?.datetime || ''
				).toLocaleString('es-ES')}`}
				onBack={() => setCurrentStep('screenings')}
			/>

			<SeatGrid
				seats={availableSeats}
				selectedSeats={selectedSeats}
				onSeatClick={toggleSeatSelection}
			/>

			{selectedSeats.length > 0 && (
				<div
					className='mt-8 text-center p-6 rounded-3xl bg-brand-100'
					style={{
						boxShadow:
							'inset -6px -6px 20px var(--color-brand-50), inset 6px 6px 20px -10px var(--color-brand-700)',
					}}
				>
					<p className='text-lg font-semibold text-brand-dark-800 mb-4'>
						Asientos seleccionados:{' '}
						{selectedSeats
							.map((s) => `${s.row}${s.code}`)
							.join(', ')}
					</p>
					<Button
						className='border-none bg-transparent text-brand-dark-700 hover:bg-brand-200 px-8 py-3'
						style={{
							boxShadow:
								'-6px -6px 20px var(--color-brand-50), 6px 6px 20px -10px var(--color-brand-700)',
						}}
						onClick={() => setCurrentStep('checkout')}
					>
						Continuar al Checkout
						<ArrowRight className='h-4 w-4 ml-2' />
					</Button>
				</div>
			)}
		</div>
	)

	// Checkout Step
	const renderCheckoutStep = () => (
		<div className='space-y-8'>
			<StepNavigation
				title='Información del Cliente'
				onBack={() => setCurrentStep('seats')}
			/>

			<div className='grid gap-8 md:grid-cols-2'>
				<PurchaseSummary
					movie={selectedMovie!}
					screening={selectedScreening!}
					seats={selectedSeats}
				/>

				<CustomerForm
					customerInfo={customerInfo}
					onCustomerInfoChange={setCustomerInfo}
					onPurchase={purchaseTickets}
					isLoading={isLoading}
				/>
			</div>
		</div>
	)

	// Loading state
	if (isLoading && movies.length === 0) {
		return <LoadingSpinner message='Cargando películas...' />
	}

	return (
		<div className='space-y-8'>
			{error && (
				<div
					className='bg-brand-100 border border-transparent rounded-3xl p-6'
					style={{
						boxShadow:
							'inset 6px 6px 20px -10px var(--color-brand-700), inset -6px -6px 20px var(--color-brand-50)',
					}}
				>
					<p className='text-red-600 text-sm font-medium'>{error}</p>
				</div>
			)}

			{currentStep === 'movies' && renderMoviesStep()}
			{currentStep === 'screenings' && renderScreeningsStep()}
			{currentStep === 'seats' && renderSeatsStep()}
			{currentStep === 'checkout' && renderCheckoutStep()}
			{currentStep === 'confirmation' && (
				<ConfirmationMessage
					email={customerInfo.email}
					onReset={resetSelection}
				/>
			)}
		</div>
	)
}
