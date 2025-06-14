const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'

export interface Movie {
	id: number
	name: string
	duration: number
	photo?: string
	synopsis?: string
	classification?: string
	genre?: string
}

export interface Screening {
	id: number
	datetime: string
	movie: Movie
	roomScreenings: {
		id: number
		room: {
			id: number
			name: string
			seats: Seat[]
		}
	}[]
}

export interface Seat {
	id: number
	code: string
	row: string
	isOccupied?: boolean
}

export interface CreateTicketDto {
	screeningId: number
	seatId: number
	customerName: string
	customerEmail: string
}

export const ticketsApi = {
	getMovies: async (): Promise<Movie[]> => {
		const response = await fetch(`${API_URL}/movies`, {
			credentials: 'include',
		})
		return response.json()
	},

	getScreenings: async (movieId?: number): Promise<Screening[]> => {
		const url = movieId
			? `${API_URL}/screenings?movieId=${movieId}`
			: `${API_URL}/screenings`

		const response = await fetch(url, {
			credentials: 'include',
		})
		return response.json()
	},

	getAllSeats: async (): Promise<IndividualSeat[]> => {
		try {
			const response = await fetch(`${API_URL}/seats`, {
				credentials: 'include',
			})

			if (!response.ok) {
				throw new Error('Error fetching seats')
			}

			const seats = await response.json()

			// Convertir al formato esperado
			return seats.map((seat: any) => ({
				id: seat.id,
				seatNumber: seat.seatNumber || seat.seat_number,
				row: seat.row,
				isOccupied: seat.isOccupied || seat.is_occupied || false,
				room: seat.room,
			}))
		} catch (error) {
			console.error('Error fetching all seats:', error)
			return []
		}
	},

	getSeatsForScreening: async (
		screeningId: number
	): Promise<IndividualSeat[]> => {
		try {
			const response = await fetch(
				`${API_URL}/seats/screening/${screeningId}`,
				{
					credentials: 'include',
				}
			)

			if (!response.ok) {
				throw new Error('Error fetching seats for screening')
			}

			const seats = await response.json()

			// Convertir al formato esperado
			return seats.map((seat: any) => ({
				id: seat.id,
				seatNumber: seat.seatNumber || seat.seat_number,
				row: seat.row,
				isOccupied: seat.isOccupied || seat.is_occupied || false,
				room: seat.room,
			}))
		} catch (error) {
			console.error('Error fetching seats for screening:', error)
			return []
		}
	},

	purchaseTicket: async (ticketData: CreateTicketDto) => {
		const response = await fetch(`${API_URL}/tickets`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(ticketData),
			credentials: 'include',
		})

		if (!response.ok) {
			const errorData = await response.json()
			throw new Error(errorData.message || 'Error al comprar boleto')
		}

		return response.json()
	},
}
