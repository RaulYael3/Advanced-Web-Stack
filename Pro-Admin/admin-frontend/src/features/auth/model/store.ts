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

export const useAuthStore = create<AuthState & AuthActions>()(
	devtools(
		persist(
			(set, get) => ({
				...initialState,
				setToken: (token) => set({ token }),
				setUser: (user) => set({ user }),
				setLoading: (isLoading) => set({ isLoading }),
				setError: (error) => set({ error }),
				logout: () => set({ ...initialState }),
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
						const response = await authApi.login(loginForm)
						if (response.error) throw new Error(response.error)
						set({ token: response.token, user: response.user })
					} catch (error) {
						set({
							error:
								error instanceof Error
									? error.message
									: 'Error al iniciar sesión',
						})
					} finally {
						set({ isLoading: false })
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
					console.log('Registering with:', registerForm)
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
						})

						if (response.error) throw new Error(response.error)
						set({ token: response.token, user: response.user })
					} catch (error) {
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
					token: state.token,
					user: state.user,
				}),
			}
		)
	)
)
