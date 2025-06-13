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
	code: string
	row: string
	roomId: number
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
		return response.json()
	},

	getByRoom: async (roomId: number): Promise<Seat[]> => {
		const response = await fetch(`${API_URL}/seats?roomId=${roomId}`, {
			credentials: 'include',
		})
		return response.json()
	},

	create: async (data: CreateSeatDto): Promise<Seat> => {
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
			throw new Error(errorData.message || 'Error creating seat')
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
