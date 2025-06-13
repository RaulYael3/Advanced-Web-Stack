const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'

export interface Room {
	id: number
	name: string
	seats?: Seat[]
	roomScreenings?: unknown[]
}

export interface Seat {
	id: number
	code: string
	row: string
	room: Room
}

export interface CreateRoomDto {
	name: string
}

export interface CreateSeatDto {
	row: string
	seatCount: number
	roomId: number
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

export const roomsApi = {
	// Room operations
	getAll: async (): Promise<Room[]> => {
		const response = await fetch(`${API_URL}/rooms`, {
			credentials: 'include',
		})
		return response.json()
	},

	getById: async (id: number): Promise<Room> => {
		const response = await fetch(`${API_URL}/rooms/${id}`, {
			credentials: 'include',
		})
		return response.json()
	},

	create: async (data: CreateRoomDto): Promise<Room> => {
		const response = await fetch(`${API_URL}/rooms`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
			credentials: 'include',
		})

		if (!response.ok) {
			const errorData = await response.json()
			throw new Error(errorData.message || 'Error creating room')
		}

		return response.json()
	},

	update: async (id: number, data: Partial<CreateRoomDto>): Promise<Room> => {
		const response = await fetch(`${API_URL}/rooms/${id}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
			credentials: 'include',
		})

		if (!response.ok) {
			const errorData = await response.json()
			throw new Error(errorData.message || 'Error updating room')
		}

		return response.json()
	},

	delete: async (id: number): Promise<void> => {
		const response = await fetch(`${API_URL}/rooms/${id}`, {
			method: 'DELETE',
			credentials: 'include',
		})

		if (!response.ok) {
			throw new Error('Error deleting room')
		}
	},
}

export const seatsApi = {
	getAll: async (): Promise<Seat[]> => {
		const response = await fetch(`${API_URL}/seats`, {
			credentials: 'include',
		})

		if (!response.ok) {
			throw new Error('Error fetching seats')
		}

		return response.json()
	},

	getByRoom: async (roomId: number): Promise<Seat[]> => {
		console.log('Fetching seats for room:', roomId)
		const response = await fetch(`${API_URL}/seats/by-room/${roomId}`, {
			credentials: 'include',
		})

		if (!response.ok) {
			console.error('Error fetching seats for room:', response.status)
			throw new Error('Error fetching seats for room')
		}

		return response.json()
	},

	create: async (data: CreateSeatDto) => {
		console.log('Creating seats with data:', data)
		const response = await fetch(`${API_URL}/seats`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
			credentials: 'include',
		})

		if (!response.ok) {
			const errorData = await response.json()
			console.error('Error creating seats:', errorData)
			throw new Error(errorData.message || 'Error creating seats')
		}

		const result = await response.json()
		console.log('Seats created successfully:', result)
		return result
	},

	getForScreening: async (screeningId: number): Promise<IndividualSeat[]> => {
		const response = await fetch(
			`${API_URL}/seats/screening/${screeningId}`,
			{
				credentials: 'include',
			}
		)

		if (!response.ok) {
			throw new Error('Error fetching seats for screening')
		}

		return response.json()
	},

	delete: async (id: number): Promise<void> => {
		const response = await fetch(`${API_URL}/seats/${id}`, {
			method: 'DELETE',
			credentials: 'include',
		})

		if (!response.ok) {
			throw new Error('Error deleting seat')
		}
	},
}
