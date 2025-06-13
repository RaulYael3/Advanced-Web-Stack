import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import {
	screeningsApi,
	Screening,
	CreateScreeningDto,
} from '../api/screenings.api'

interface ScreeningState {
	screenings: Screening[]
	isLoading: boolean
	error: string | null
	formData: CreateScreeningDto
	isCreateDialogOpen: boolean
	isEditDialogOpen: boolean
	editingScreening: Screening | null

	// Actions
	setFormData: (data: Partial<CreateScreeningDto>) => void
	setIsCreateDialogOpen: (open: boolean) => void
	setIsEditDialogOpen: (open: boolean) => void
	setEditingScreening: (screening: Screening | null) => void
	loadScreenings: () => Promise<void>
	createScreening: () => Promise<void>
	updateScreening: () => Promise<void>
	deleteScreening: (id: number) => Promise<void>
	openEditDialog: (screening: Screening) => void
	resetForm: () => void
}

const initialFormData: CreateScreeningDto = {
	datetime: '',
	movieId: 0,
	roomIds: [],
}

export const useScreeningStore = create<ScreeningState>()(
	devtools(
		(set, get) => ({
			screenings: [],
			isLoading: false,
			error: null,
			formData: initialFormData,
			isCreateDialogOpen: false,
			isEditDialogOpen: false,
			editingScreening: null,

			setFormData: (data) =>
				set((state) => ({
					formData: { ...state.formData, ...data },
				})),

			setIsCreateDialogOpen: (open) => set({ isCreateDialogOpen: open }),

			setIsEditDialogOpen: (open) => set({ isEditDialogOpen: open }),

			setEditingScreening: (screening) =>
				set({ editingScreening: screening }),

			loadScreenings: async () => {
				set({ isLoading: true, error: null })
				try {
					const screenings = await screeningsApi.getAll()
					set({ screenings, isLoading: false })
				} catch (error) {
					console.error('Error loading screenings:', error)
					set({
						error: 'Error al cargar las funciones',
						isLoading: false,
					})
				}
			},

			createScreening: async () => {
				const { formData } = get()
				set({ isLoading: true, error: null })
				try {
					await screeningsApi.create(formData)
					set({
						isCreateDialogOpen: false,
						formData: initialFormData,
						isLoading: false,
					})
					get().loadScreenings()
				} catch (error) {
					console.error('Error creating screening:', error)
					set({
						error: 'Error al crear la función',
						isLoading: false,
					})
				}
			},

			updateScreening: async () => {
				const { editingScreening, formData } = get()
				if (!editingScreening) return

				set({ isLoading: true, error: null })
				try {
					await screeningsApi.update(editingScreening.id, formData)
					set({
						isEditDialogOpen: false,
						editingScreening: null,
						formData: initialFormData,
						isLoading: false,
					})
					get().loadScreenings()
				} catch (error) {
					console.error('Error updating screening:', error)
					set({
						error: 'Error al actualizar la función',
						isLoading: false,
					})
				}
			},

			deleteScreening: async (id: number) => {
				if (
					!confirm(
						'¿Estás seguro de que quieres eliminar esta función?'
					)
				) {
					return
				}

				set({ isLoading: true, error: null })
				try {
					await screeningsApi.delete(id)
					set({ isLoading: false })
					get().loadScreenings()
				} catch (error) {
					console.error('Error deleting screening:', error)
					set({
						error: 'Error al eliminar la función',
						isLoading: false,
					})
				}
			},

			openEditDialog: (screening: Screening) => {
				set({
					editingScreening: screening,
					formData: {
						datetime: new Date(screening.datetime)
							.toISOString()
							.slice(0, 16),
						movieId: screening.movie.id,
						roomIds:
							screening.roomScreenings?.map((rs) => rs.room.id) ||
							[],
					},
					isEditDialogOpen: true,
				})
			},

			resetForm: () => {
				set({
					formData: initialFormData,
					editingScreening: null,
					isCreateDialogOpen: false,
					isEditDialogOpen: false,
					error: null,
				})
			},
		}),
		{
			name: 'screening-store',
		}
	)
)
