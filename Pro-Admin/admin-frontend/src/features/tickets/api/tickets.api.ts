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

	getAvailableSeats: async (screeningId: number): Promise<Seat[]> => {
		const response = await fetch(
			`${API_URL}/seats/available/${screeningId}`,
			{
				credentials: 'include',
			}
		)
		return response.json()
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
