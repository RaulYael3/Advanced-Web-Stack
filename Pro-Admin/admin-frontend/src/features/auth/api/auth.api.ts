import { ApiResponse } from '@/shared/types'
import { LoginCredentials, RegisterCredentials } from '../model/types'
import { User } from '@/shared/types'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'

export const authApi = {
	login: async (credentials: LoginCredentials) => {
		const response = await fetch(`${API_URL}/auth/login`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(credentials),
			credentials: 'include', // Para incluir cookies
		})

		const data = await response.json()

		if (data.access_token) {
			document.cookie = `auth-token=${data.access_token}; path=/; max-age=86400; secure; samesite=strict`
		}

		return data
	},

	register: async (credentials: RegisterCredentials) => {
		const response = await fetch(`${API_URL}/users`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(credentials),
			cache: 'no-cache',
			credentials: 'include',
		})
		console.log('Register response:', response)
		return response.json()
	},

	getCurrentUser: async (token: string) => {
		const response = await fetch(`${API_URL}/auth/me`, {
			headers: { Authorization: `Bearer ${token}` },
			credentials: 'include',
		})
		return response.json()
	},

	logout: () => {
		// Eliminar el token de las cookies
		document.cookie =
			'auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
	},
}
