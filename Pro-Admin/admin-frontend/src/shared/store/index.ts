import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

// Tipos base para el store
interface AppState {
  // Aquí irán los estados globales
}

// Acciones del store
interface AppActions {
  // Aquí irán las acciones
}

// Store principal
export const useAppStore = create<AppState & AppActions>()(
  devtools(
    persist(
      (set) => ({
        // Implementación del store
      }),
      {
        name: 'app-storage',
      }
    )
  )
) 