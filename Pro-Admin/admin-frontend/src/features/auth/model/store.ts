import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { AuthState, AuthActions } from './types'
import { authApi } from '../api/auth.api'

const initialState = {
	token: null,
	user: null,
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
}

export const useAuthStore = create<AuthState>()(
	devtools(
		persist(
			(set, get) => ({
				...initialState,
				setToken: (token) => set({ token }),
				setUser: (user) => set({ user }),
				setLoading: (isLoading) => set({ isLoading }),
				setError: (error) => set({ error }),
				logout: () => {
					// Limpiar el token de las cookies
					document.cookie =
						'auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;'

					set({
						user: null,
						isAuthenticated: false,
						token: null,
						error: null,
					})

					// Redirigir al login
					window.location.href = '/auth/login'
				},
				// Acciones para el formulario de login
				setLoginForm: (form) =>
					set((state) => ({
						loginForm: { ...state.loginForm, ...form },
					})),
				resetLoginForm: () =>
					set({
						loginForm: initialState.loginForm,
					}),
				login: async () => {
					const { loginForm } = get()
					set({ isLoading: true, error: null })

					try {
						const response = await authApi.login(
							loginForm.email,
							loginForm.password
						)

						// Guardar el token en las cookies
						document.cookie = `auth-token=${response.access_token}; path=/; max-age=86400; secure; samesite=strict`

						set({
							user: response.user,
							isAuthenticated: true,
							isLoading: false,
							loginForm: { email: '', password: '' },
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
				// Acciones para el formulario de registro
				setRegisterForm: (form) =>
					set((state) => ({
						registerForm: { ...state.registerForm, ...form },
					})),
				resetRegisterForm: () =>
					set({
						registerForm: initialState.registerForm,
					}),
				register: async () => {
					const { registerForm } = get()
					if (
						registerForm.password !== registerForm.confirmPassword
					) {
						set({ error: 'Las contraseñas no coinciden' })
						return
					}
					set({ isLoading: true, error: null })
					try {
						const response = await authApi.register({
							email: registerForm.email,
							password: registerForm.password,
							role: 'user',
						})
						if (response.error) throw new Error(response.error)
						set({ token: response.token, user: response.user })
					} catch (error) {
						console.log('Error en el registro:', error)
						set({
							error:
								error instanceof Error
									? error.message
									: 'Error al registrarse',
						})
					} finally {
						set({ isLoading: false })
					}
				},
			}),
			{
				name: 'auth-storage',
				partialize: (state) => ({
					user: state.user,
					isAuthenticated: state.isAuthenticated,
				}),
			}
		),
		{ name: 'auth-store' }
	)
)
