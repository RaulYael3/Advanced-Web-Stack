import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { ticketsApi } from '../api/tickets.api'

interface Movie {
	id: number
	name: string
	duration: number
	photo?: string
	synopsis?: string
	classification?: string
	genre?: string
}

interface Screening {
	id: number
	datetime: string
	movie: Movie
	roomScreenings: {
		id: number
		room: {
			id: number
			name: string
			seats?: any[]
		}
	}[]
}

interface Seat {
	id: number
	seatNumber: number
	row: string
	isOccupied?: boolean
	code?: string // Para compatibilidad con el formato anterior
}

interface IndividualSeat {
	id: string
	seatNumber: number
	row: string
	isOccupied: boolean
}

interface TicketState {
	movies: Movie[]
	screenings: Screening[]
	availableSeats: Seat[]
	selectedMovie: Movie | null
	selectedScreening: Screening | null
	selectedSeats: IndividualSeat[]
	customerInfo: {
		name: string
		email: string
	}
	isLoading: boolean
	error: string | null
	currentStep: 'movies' | 'screenings' | 'seats' | 'checkout' | 'confirmation'

	// Actions
	setSelectedMovie: (movie: Movie | null) => void
	setSelectedScreening: (screening: Screening | null) => void
	toggleSeatSelection: (seat: IndividualSeat) => void
	setCustomerInfo: (info: { name: string; email: string }) => void
	setCurrentStep: (
		step: 'movies' | 'screenings' | 'seats' | 'checkout' | 'confirmation'
	) => void
	loadMovies: () => Promise<void>
	loadScreenings: (movieId?: number) => Promise<void>
	loadAvailableSeats: (screeningId: number) => Promise<void>
	purchaseTickets: () => Promise<void>
	resetSelection: () => void
}

export const useTicketStore = create<TicketState>()(
	devtools(
		(set, get) => ({
			movies: [],
			screenings: [],
			availableSeats: [],
			selectedMovie: null,
			selectedScreening: null,
			selectedSeats: [],
			customerInfo: { name: '', email: '' },
			isLoading: false,
			error: null,
			currentStep: 'movies',

			setSelectedMovie: (movie) => set({ selectedMovie: movie }),
			setSelectedScreening: (screening) =>
				set({ selectedScreening: screening }),

			toggleSeatSelection: (seat) => {
				const { selectedSeats } = get()
				const isSelected = selectedSeats.some((s) => s.id === seat.id)

				if (isSelected) {
					set({
						selectedSeats: selectedSeats.filter(
							(s) => s.id !== seat.id
						),
					})
				} else {
					set({ selectedSeats: [...selectedSeats, seat] })
				}
			},

			setCustomerInfo: (info) => set({ customerInfo: info }),
			setCurrentStep: (step) => set({ currentStep: step }),

			loadMovies: async () => {
				set({ isLoading: true, error: null })
				try {
					const movies = await ticketsApi.getMovies()
					set({ movies, isLoading: false })
				} catch (error: unknown) {
					set({
						error: 'Error al cargar películas',
						isLoading: false,
					})
					console.error('Error loading movies:', error)
				}
			},

			loadScreenings: async (movieId) => {
				set({ isLoading: true, error: null })
				try {
					const screenings = await ticketsApi.getScreenings(movieId)
					set({ screenings, isLoading: false })
				} catch (error: unknown) {
					set({
						error: 'Error al cargar funciones',
						isLoading: false,
					})
					console.error('Error loading screenings:', error)
				}
			},

			loadAvailableSeats: async (screeningId: number) => {
				console.log(
					'Loading seats for specific screening:',
					screeningId
				)
				set({ isLoading: true, error: null })
				try {
					// Cargar solo los asientos de la función específica
					const seatsResponse = await fetch(
						`${
							process.env.NEXT_PUBLIC_API_URL ||
							'http://localhost:4000'
						}/seats/screening/${screeningId}`,
						{
							credentials: 'include',
						}
					)

					if (!seatsResponse.ok) {
						throw new Error('Failed to fetch seats for screening')
					}

					const screeningSeats = await seatsResponse.json()
					console.log('Seats for screening loaded:', screeningSeats)

					// Convertir al formato esperado
					const formattedSeats = screeningSeats.map((seat: any) => ({
						id: seat.id,
						seatNumber: seat.seatNumber || seat.seat_number || 1,
						row: seat.row,
						isOccupied:
							seat.isOccupied || seat.is_occupied || false,
						room: seat.room,
						code:
							seat.seatNumber?.toString() ||
							seat.seat_number?.toString() ||
							'1',
					}))

					console.log(
						'Formatted seats for this screening only:',
						formattedSeats
					)
					set({ availableSeats: formattedSeats, isLoading: false })
				} catch (error) {
					console.error('Error loading seats for screening:', error)
					set({
						error: 'Error al cargar asientos de la función',
						isLoading: false,
					})
				}
			},

			purchaseTickets: async () => {
				const { selectedScreening, selectedSeats, customerInfo } = get()
				if (!selectedScreening || selectedSeats.length === 0) return

				set({ isLoading: true, error: null })
				try {
					for (const seat of selectedSeats) {
						await ticketsApi.purchaseTicket({
							screeningId: selectedScreening.id,
							seatId: seat.id,
							customerName: customerInfo.name,
							customerEmail: customerInfo.email,
						})
					}
					set({ currentStep: 'confirmation', isLoading: false })
				} catch (error) {
					set({
						error:
							error instanceof Error
								? error.message
								: 'Error al comprar boletos',
						isLoading: false,
					})
				}
			},

			resetSelection: () =>
				set({
					selectedMovie: null,
					selectedScreening: null,
					selectedSeats: [],
					customerInfo: { name: '', email: '' },
					currentStep: 'movies',
					error: null,
				}),
		}),
		{ name: 'ticket-store' }
	)
)
