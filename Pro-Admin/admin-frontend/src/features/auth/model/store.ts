import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { AuthState, AuthActions } from './types'

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
      (set) => ({
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
        // Acciones para el formulario de registro
        setRegisterForm: (form) =>
          set((state) => ({
            registerForm: { ...state.registerForm, ...form },
          })),
        resetRegisterForm: () =>
          set({
            registerForm: initialState.registerForm,
          }),
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