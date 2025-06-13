import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { moviesApi, Movie, CreateMovieDto } from '../api/movies.api'

interface MovieState {
	movies: Movie[]
	isLoading: boolean
	error: string | null
	formData: CreateMovieDto
	selectedFile: File | null
	isCreateDialogOpen: boolean
	isEditDialogOpen: boolean
	editingMovie: Movie | null

	// Actions
	setFormData: (data: Partial<CreateMovieDto>) => void
	setSelectedFile: (file: File | null) => void
	setIsCreateDialogOpen: (open: boolean) => void
	setIsEditDialogOpen: (open: boolean) => void
	setEditingMovie: (movie: Movie | null) => void
	loadMovies: () => Promise<void>
	createMovie: () => Promise<void>
	updateMovie: () => Promise<void>
	deleteMovie: (id: number) => Promise<void>
	openEditDialog: (movie: Movie) => void
	resetForm: () => void
}

const initialFormData: CreateMovieDto = {
	name: '',
	duration: 0,
	synopsis: '',
	classification: '',
	genre: '',
}

export const useMovieStore = create<MovieState>()(
	devtools(
		(set, get) => ({
			movies: [],
			isLoading: false,
			error: null,
			formData: initialFormData,
			selectedFile: null,
			isCreateDialogOpen: false,
			isEditDialogOpen: false,
			editingMovie: null,

			setFormData: (data) =>
				set((state) => ({
					formData: { ...state.formData, ...data },
				})),

			setSelectedFile: (file) => set({ selectedFile: file }),

			setIsCreateDialogOpen: (open) => set({ isCreateDialogOpen: open }),

			setIsEditDialogOpen: (open) => set({ isEditDialogOpen: open }),

			setEditingMovie: (movie) => set({ editingMovie: movie }),

			loadMovies: async () => {
				set({ isLoading: true, error: null })
				try {
					const movies = await moviesApi.getAll()
					set({ movies, isLoading: false })
				} catch (error) {
					console.error('Error loading movies:', error)
					set({
						error: 'Error al cargar las películas',
						isLoading: false,
					})
				}
			},

			createMovie: async () => {
				const { formData, selectedFile } = get()
				set({ isLoading: true, error: null })
				try {
					await moviesApi.create(formData, selectedFile || undefined)
					set({
						isCreateDialogOpen: false,
						formData: initialFormData,
						selectedFile: null,
						isLoading: false,
					})
					get().loadMovies()
				} catch (error) {
					console.error('Error creating movie:', error)
					set({
						error: 'Error al crear la película',
						isLoading: false,
					})
				}
			},

			updateMovie: async () => {
				const { editingMovie, formData, selectedFile } = get()
				if (!editingMovie) return

				set({ isLoading: true, error: null })
				try {
					await moviesApi.update(
						editingMovie.id,
						formData,
						selectedFile || undefined
					)
					set({
						isEditDialogOpen: false,
						editingMovie: null,
						formData: initialFormData,
						selectedFile: null,
						isLoading: false,
					})
					get().loadMovies()
				} catch (error) {
					console.error('Error updating movie:', error)
					set({
						error: 'Error al actualizar la película',
						isLoading: false,
					})
				}
			},

			deleteMovie: async (id: number) => {
				if (
					!confirm(
						'¿Estás seguro de que quieres eliminar esta película?'
					)
				) {
					return
				}

				set({ isLoading: true, error: null })
				try {
					await moviesApi.delete(id)
					set({ isLoading: false })
					get().loadMovies()
				} catch (error) {
					console.error('Error deleting movie:', error)
					set({
						error: 'Error al eliminar la película',
						isLoading: false,
					})
				}
			},

			openEditDialog: (movie: Movie) => {
				set({
					editingMovie: movie,
					formData: {
						name: movie.name,
						duration: movie.duration,
						synopsis: movie.synopsis || '',
						classification: movie.classification || '',
						genre: movie.genre || '',
					},
					selectedFile: null,
					isEditDialogOpen: true,
				})
			},

			resetForm: () => {
				set({
					formData: initialFormData,
					selectedFile: null,
					editingMovie: null,
					isCreateDialogOpen: false,
					isEditDialogOpen: false,
					error: null,
				})
			},
		}),
		{
			name: 'movie-store',
		}
	)
)
