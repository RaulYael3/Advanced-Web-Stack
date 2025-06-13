import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import {
	ticketsApi,
	Movie,
	Screening,
	Seat,
	CreateTicketDto,
} from '../api/tickets.api'

interface TicketState {
	movies: Movie[]
	screenings: Screening[]
	availableSeats: Seat[]
	selectedMovie: Movie | null
	selectedScreening: Screening | null
	selectedSeats: Seat[]
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
	toggleSeatSelection: (seat: Seat) => void
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

			loadAvailableSeats: async (screeningId) => {
				set({ isLoading: true, error: null })
				try {
					const seats = await ticketsApi.getAvailableSeats(
						screeningId
					)
					set({ availableSeats: seats, isLoading: false })
				} catch (error: unknown) {
					set({ error: 'Error al cargar asientos', isLoading: false })
					console.error('Error loading available seats:', error)
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
