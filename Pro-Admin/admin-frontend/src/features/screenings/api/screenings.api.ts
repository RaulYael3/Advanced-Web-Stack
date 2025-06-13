const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'

export interface Screening {
	id: number
	datetime: string
	movie: {
		id: number
		title: string
		duration: number
	}
	roomScreenings?: {
		id: number
		room: {
			id: number
			name: string
		}
	}[]
}

export interface CreateScreeningDto {
	datetime: string
	movieId: number
	roomIds: number[]
}

export const screeningsApi = {
	getAll: async (): Promise<Screening[]> => {
		const response = await fetch(`${API_URL}/screenings`, {
			credentials: 'include',
		})
		return response.json()
	},

	getById: async (id: number): Promise<Screening> => {
		const response = await fetch(`${API_URL}/screenings/${id}`, {
			credentials: 'include',
		})
		return response.json()
	},

	create: async (data: CreateScreeningDto): Promise<Screening> => {
		const response = await fetch(`${API_URL}/screenings`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
			credentials: 'include',
		})
		return response.json()
	},

	update: async (
		id: number,
		data: Partial<CreateScreeningDto>
	): Promise<Screening> => {
		const response = await fetch(`${API_URL}/screenings/${id}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
			credentials: 'include',
		})
		return response.json()
	},

	delete: async (id: number): Promise<void> => {
		await fetch(`${API_URL}/screenings/${id}`, {
			method: 'DELETE',
			credentials: 'include',
		})
	},
}
