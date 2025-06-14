import { User } from '@/shared/types'

export interface AuthState {
	token: string | null
	user: User | null
	isLoading: boolean
	error: string | null
	// Estados del formulario de login
	loginForm: {
		email: string
		password: string
	}
	// Estados del formulario de registro
	registerForm: {
		name: string
		email: string
		password: string
		confirmPassword: string
	}
}

export interface AuthActions {
	setToken: (token: string | null) => void
	setUser: (user: User | null) => void
	setLoading: (isLoading: boolean) => void
	setError: (error: string | null) => void
	logout: () => void

	setLoginForm: (form: Partial<AuthState['loginForm']>) => void
	resetLoginForm: () => void
	login: () => Promise<void>

	setRegisterForm: (form: Partial<AuthState['registerForm']>) => void
	resetRegisterForm: () => void
	register: () => Promise<void>
}

export interface LoginCredentials {
	email: string
	password: string
}

export interface RegisterCredentials {
	email: string
	password: string
	role: 'user'
}
