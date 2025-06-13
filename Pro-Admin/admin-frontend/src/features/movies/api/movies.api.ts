const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'

export interface Movie {
	id: number
	name: string // Coincide con movie.entity.ts
	duration: number
	photo?: string
	synopsis?: string
	classification?: string
	genre?: string
	screenings?: any[]
}

export interface CreateMovieDto {
	name: string // Usar 'name' en lugar de 'title' para coincidir con la entidad
	duration: number
	synopsis?: string
	classification?: string
	genre?: string
}

export const moviesApi = {
	getAll: async (): Promise<Movie[]> => {
		const response = await fetch(`${API_URL}/movies`, {
			credentials: 'include',
		})
		return response.json()
	},

	getById: async (id: number): Promise<Movie> => {
		const response = await fetch(`${API_URL}/movies/${id}`, {
			credentials: 'include',
		})
		return response.json()
	},

	create: async (data: CreateMovieDto, file?: File): Promise<Movie> => {
		const formData = new FormData()

		// Asegurar tipos correctos
		formData.append('name', data.name)
		formData.append('duration', data.duration.toString()) // Convertir a string para FormData

		if (data.synopsis) {
			formData.append('synopsis', data.synopsis)
		}
		if (data.classification) {
			formData.append('classification', data.classification)
		}
		if (data.genre) {
			formData.append('genre', data.genre)
		}

		if (file) {
			formData.append('imageUrl', file)
		}

		const response = await fetch(`${API_URL}/movies`, {
			method: 'POST',
			body: formData,
			credentials: 'include',
		})

		if (!response.ok) {
			const errorData = await response.json()
			throw new Error(errorData.message || 'Error creating movie')
		}

		return response.json()
	},

	update: async (
		id: number,
		data: Partial<CreateMovieDto>,
		file?: File
	): Promise<Movie> => {
		const formData = new FormData()

		// Solo añadir campos que están definidos
		if (data.name !== undefined) {
			formData.append('name', data.name)
		}
		if (data.duration !== undefined) {
			formData.append('duration', data.duration.toString())
		}
		if (data.synopsis !== undefined) {
			formData.append('synopsis', data.synopsis)
		}
		if (data.classification !== undefined) {
			formData.append('classification', data.classification)
		}
		if (data.genre !== undefined) {
			formData.append('genre', data.genre)
		}

		if (file) {
			formData.append('file', file)
		}

		const response = await fetch(`${API_URL}/movies/${id}`, {
			method: 'PATCH',
			body: formData,
			credentials: 'include',
		})

		if (!response.ok) {
			const errorData = await response.json()
			throw new Error(errorData.message || 'Error updating movie')
		}

		return response.json()
	},

	delete: async (id: number): Promise<void> => {
		await fetch(`${API_URL}/movies/${id}`, {
			method: 'DELETE',
			credentials: 'include',
		})
	},
}
