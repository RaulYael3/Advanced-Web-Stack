import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { authApi } from '../api/auth.api'

interface User {
	id: number
	email: string
	role: 'admin' | 'customer'
}

interface LoginForm {
	email: string
	password: string
}

interface RegisterForm {
	name: string
	email: string
	password: string
	confirmPassword: string
}

interface AuthState {
	// State
	user: User | null
	isAuthenticated: boolean
	token: string | null
	isLoading: boolean
	error: string | null
	loginForm: LoginForm
	registerForm: RegisterForm

	// Actions
	setLoginForm: (form: LoginForm) => void
	setRegisterForm: (form: RegisterForm) => void
	login: () => Promise<User | null>
	register: () => Promise<User | null>
	logout: () => void
	clearError: () => void
}

export const useAuthStore = create<AuthState>()(
	devtools(
		persist(
			(set, get) => ({
				// Initial state
				user: null,
				isAuthenticated: false,
				token: null,
				isLoading: false,
				error: null,
				loginForm: {
					email: '',
					password: '',
				},
				registerForm: {
					name: '',
					email: '',
					password: '',
					confirmPassword: '',
				},

				// Actions
				setLoginForm: (form) => set({ loginForm: form }),

				setRegisterForm: (form) => set({ registerForm: form }),

				login: async () => {
					const { loginForm } = get()
					console.log('Store login called with:', loginForm)
					set({ isLoading: true, error: null })

					try {
						const response = await authApi.login(
							loginForm.email,
							loginForm.password
						)
						console.log('Login API response:', response)

						// Guardar el token en las cookies
						if (typeof document !== 'undefined') {
							document.cookie = `auth-token=${response.access_token}; path=/; max-age=86400; secure; samesite=strict`
						}

						set({
							user: response.user,
							token: response.access_token,
							isAuthenticated: true,
							isLoading: false,
							loginForm: { email: '', password: '' },
							error: null,
						})

						console.log(
							'Login successful, user role:',
							response.user.role
						)
						return response.user
					} catch (error) {
						console.error('Login error:', error)
						set({
							error:
								error instanceof Error
									? error.message
									: 'Error de autenticación',
							isLoading: false,
						})
						throw error
					}
				},

				register: async () => {
					const { registerForm } = get()
					set({ isLoading: true, error: null })

					try {
						if (
							registerForm.password !==
							registerForm.confirmPassword
						) {
							throw new Error('Las contraseñas no coinciden')
						}

						const response = await authApi.register(
							registerForm.name,
							registerForm.email,
							registerForm.password
						)

						set({
							user: response.user,
							token: response.access_token,
							isAuthenticated: true,
							isLoading: false,
							registerForm: {
								name: '',
								email: '',
								password: '',
								confirmPassword: '',
							},
							error: null,
						})

						return response.user
					} catch (error) {
						console.error('Register error:', error)
						set({
							error:
								error instanceof Error
									? error.message
									: 'Error de registro',
							isLoading: false,
						})
						throw error
					}
				},

				logout: () => {
					// Limpiar el token de las cookies
					if (typeof document !== 'undefined') {
						document.cookie =
							'auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;'
					}

					set({
						user: null,
						isAuthenticated: false,
						token: null,
						error: null,
					})

					// Redirigir al login
					if (typeof window !== 'undefined') {
						window.location.href = '/auth'
					}
				},

				clearError: () => set({ error: null }),
			}),
			{
				name: 'auth-storage',
				partialize: (state) => ({
					user: state.user,
					token: state.token,
					isAuthenticated: state.isAuthenticated,
				}),
			}
		),
		{ name: 'auth-store' }
	)
)
