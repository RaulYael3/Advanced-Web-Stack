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
			seats?: unknown[]
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

export interface IndividualSeat {
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
				console.log('Loading seats for screening:', screeningId)
				set({ isLoading: true, error: null })
				try {
					// Primero obtener la información de la función para saber qué sala usar
					const screeningResponse = await fetch(
						`${
							process.env.NEXT_PUBLIC_API_URL ||
							'http://localhost:4000'
						}/screenings/${screeningId}`,
						{
							credentials: 'include',
						}
					)

					if (!screeningResponse.ok) {
						console.log(
							'Screening endpoint failed, using fallback with room ID 1'
						)
						// Fallback: usar sala 1 por defecto para testing
						const seatsResponse = await fetch(
							`${
								process.env.NEXT_PUBLIC_API_URL ||
								'http://localhost:4000'
							}/seats?roomId=1`,
							{
								credentials: 'include',
							}
						)

						if (!seatsResponse.ok) {
							throw new Error('Failed to fetch seats')
						}

						const seats = await seatsResponse.json()
						console.log('Seats loaded (fallback):', seats)

						// eslint-disable-next-line @typescript-eslint/no-explicit-any
						const formattedSeats = seats.map((seat: any) => ({
							id: seat.id,
							seatNumber: seat.seatNumber,
							row: seat.row,
							isOccupied: seat.isOccupied,
							room: seat.room,
						}))

						set({
							availableSeats: formattedSeats,
							isLoading: false,
						})
						return
					}

					const screening = await screeningResponse.json()
					console.log('Screening info:', screening)

					// Obtener el ID de la sala desde el screening
					const roomId = screening.roomScreenings?.[0]?.room?.id || 1 // Fallback a sala 1
					console.log('Using room ID:', roomId)

					// Cargar asientos de la sala específica usando el query parameter
					const seatsResponse = await fetch(
						`${
							process.env.NEXT_PUBLIC_API_URL ||
							'http://localhost:4000'
						}/seats?roomId=${roomId}`,
						{
							credentials: 'include',
						}
					)

					if (!seatsResponse.ok) {
						throw new Error('Failed to fetch seats for room')
					}

					const seats = await seatsResponse.json()
					console.log('Seats loaded for room:', seats)

					// Los asientos ya vienen en el formato correcto del backend
					// eslint-disable-next-line @typescript-eslint/no-explicit-any
					const formattedSeats = seats.map((seat: any) => ({
						id: seat.id,
						seatNumber: seat.seatNumber,
						row: seat.row,
						isOccupied: seat.isOccupied,
						room: seat.room,
					}))

					console.log('Formatted individual seats:', formattedSeats)
					set({ availableSeats: formattedSeats, isLoading: false })
				} catch (error) {
					console.error('Error loading seats:', error)
					set({
						error: 'Error al cargar asientos',
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
							seatId: Number(seat.id),
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
