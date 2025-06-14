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
			seats?: unknown[]
		}
	}[]
}

export interface IndividualSeat {
	id: number
	seatNumber: number
	row: string
	isOccupied: boolean
	room: {
		id: number
		name: string
	}
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

	getSeatsForRoom: async (roomId: number): Promise<IndividualSeat[]> => {
		try {
			const response = await fetch(`${API_URL}/seats?roomId=${roomId}`, {
				credentials: 'include',
			})

			if (!response.ok) {
				throw new Error('Error fetching seats for room')
			}

			return response.json()
		} catch (error) {
			console.error('Error fetching seats for room:', error)
			return []
		}
	},

	purchaseTicket: async (ticketData: CreateTicketDto) => {
		console.log('Purchasing ticket:', ticketData)

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
			console.error('Error purchasing ticket:', errorData)
			throw new Error(errorData.message || 'Error al comprar boleto')
		}

		const result = await response.json()
		console.log('Ticket purchased successfully:', result)
		return result
	},

	getCustomerTickets: async (email: string) => {
		const response = await fetch(`${API_URL}/tickets/customer/${email}`, {
			credentials: 'include',
		})

		if (!response.ok) {
			throw new Error('Error fetching customer tickets')
		}

		return response.json()
	},
}
