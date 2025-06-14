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
	code: string // Cantidad de asientos como string
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
		console.log('=== API CREATE SEATS ===')
		console.log('Received data:', data)
		console.log('Data type check:', {
			code: typeof data.code,
			row: typeof data.row,
			roomId: typeof data.roomId,
		})

		// Validar datos antes de enviar
		if (!data.code || !data.code.trim()) {
			throw new Error('La cantidad de asientos es requerida')
		}

		if (!data.row || !data.row.trim()) {
			throw new Error('La fila es requerida')
		}

		if (!data.roomId) {
			throw new Error('ID de sala es requerido')
		}

		console.log('Sending to backend:', JSON.stringify(data, null, 2))

		try {
			const response = await fetch(`${API_URL}/seats`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
				credentials: 'include',
			})

			console.log('Response status:', response.status)

			if (!response.ok) {
				const responseText = await response.text()
				console.error('Error response text:', responseText)

				try {
					const errorData = JSON.parse(responseText)
					console.error(
						'Error creating seats - Parsed error:',
						errorData
					)
					throw new Error(
						errorData.message ||
							`Error ${response.status}: ${
								errorData.error || 'Error creating seats'
							}`
					)
				} catch (parseError) {
					console.error('Could not parse error response:', parseError)
					throw new Error(`Error ${response.status}: ${responseText}`)
				}
			}

			const result = await response.json()
			console.log('Seats created successfully:', result)
			return result
		} catch (error) {
			console.error('API call failed:', error)
			throw error
		}
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
