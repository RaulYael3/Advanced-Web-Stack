import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { dashboardApi, DashboardStats } from '../api/dashboard.api'

interface DashboardState {
	stats: DashboardStats | null
	isLoading: boolean
	error: string | null

	// Actions
	loadStats: () => Promise<void>
}

export const useDashboardStore = create<DashboardState>()(
	devtools(
		(set) => ({
			stats: null,
			isLoading: false,
			error: null,

			loadStats: async () => {
				set({ isLoading: true, error: null })
				try {
					const stats = await dashboardApi.getStats()
					set({ stats, isLoading: false })
				} catch (error) {
					console.error('Error loading dashboard stats:', error)
					set({
						error: 'Error al cargar las estadísticas',
						isLoading: false,
					})
				}
			},
		}),
		{
			name: 'dashboard-store',
		}
	)
)
