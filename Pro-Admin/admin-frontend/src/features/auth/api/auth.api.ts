const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'

export const authApi = {
	login: async (email: string, password: string) => {
		console.log('API login called with:', { email, password: '***' })

		const response = await fetch(`${API_URL}/auth/login`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ email, password }),
			credentials: 'include',
		})

		console.log('Login response status:', response.status)

		if (!response.ok) {
			const errorData = await response.json()
			console.error('Login error response:', errorData)
			throw new Error(errorData.message || 'Error de autenticación')
		}

		const data = await response.json()
		console.log('Login successful, data:', data)
		return data
	},

	register: async (name: string, email: string, password: string) => {
		const response = await fetch(`${API_URL}/auth/register`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ name, email, password }),
			credentials: 'include',
		})

		if (!response.ok) {
			const errorData = await response.json()
			throw new Error(errorData.message || 'Error de registro')
		}

		return response.json()
	},

	logout: async () => {
		const response = await fetch(`${API_URL}/auth/logout`, {
			method: 'POST',
			credentials: 'include',
		})

		if (!response.ok) {
			throw new Error('Error al cerrar sesión')
		}

		return response.json()
	},
}
