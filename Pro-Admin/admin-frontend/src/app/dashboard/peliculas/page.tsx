'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { useMovieStore } from '@/features/movies/model/store'
import { Plus, Edit, Trash2, Film, Clock, Tag } from 'lucide-react'
import Image from 'next/image'

export default function PeliculasPage() {
	const {
		movies,
		isLoading,
		error,
		formData,
		selectedFile,
		isCreateDialogOpen,
		isEditDialogOpen,
		setFormData,
		setSelectedFile,
		setIsCreateDialogOpen,
		loadMovies,
		createMovie,
		updateMovie,
		deleteMovie,
		openEditDialog,
		resetForm,
	} = useMovieStore()

	useEffect(() => {
		loadMovies()
	}, [loadMovies])

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0]
		setSelectedFile(file || null)
	}

	return (
		<div className='flex-1 space-y-6 p-8 pt-6'>
			{/* Header */}
			<div className='flex items-center justify-between'>
				<div>
					<h1 className='text-3xl font-bold tracking-tight text-gray-900'>
						Películas
					</h1>
					<p className='text-gray-600'>
						Gestiona el catálogo de películas de tu cine
					</p>
				</div>
				<Dialog
					open={isCreateDialogOpen}
					onOpenChange={setIsCreateDialogOpen}
				>
					<DialogTrigger asChild>
						<Button className='border-none bg-transparent text-brand-dark-700 cursor-pointer hover:bg-brand-50'>
							<Plus className='mr-2 h-4 w-4' />
							Nueva Pelicula
						</Button>
					</DialogTrigger>
					<DialogContent className='bg-white border border-gray-200 shadow-lg max-w-2xl'>
						<DialogHeader>
							<DialogTitle className='text-gray-900'>
								Agregar Nueva Película
							</DialogTitle>
							<DialogDescription className='text-gray-600'>
								Completa la información de la nueva película.
							</DialogDescription>
						</DialogHeader>
						<div className='grid gap-4 py-4'>
							<div className='grid grid-cols-2 gap-4'>
								<div className='space-y-2'>
									<Label
										htmlFor='name'
										className='text-gray-700 font-medium'
									>
										Título
									</Label>
									<Input
										id='name'
										value={formData.name}
										onChange={(e) =>
											setFormData({
												name: e.target.value,
											})
										}
										className='border-gray-300 focus:border-blue-500 focus:ring-blue-500'
										placeholder='Nombre de la película'
									/>
								</div>
								<div className='space-y-2'>
									<Label
										htmlFor='duration'
										className='text-gray-700 font-medium'
									>
										Duración (min)
									</Label>
									<Input
										id='duration'
										type='number'
										value={formData.duration}
										onChange={(e) =>
											setFormData({
												duration:
													parseInt(e.target.value) ||
													0,
											})
										}
										className='border-gray-300 focus:border-blue-500 focus:ring-blue-500'
										placeholder='120'
									/>
								</div>
							</div>
							<div className='grid grid-cols-2 gap-4'>
								<div className='space-y-2'>
									<Label
										htmlFor='genre'
										className='text-gray-700 font-medium'
									>
										Género
									</Label>
									<Select
										value={formData.genre}
										onValueChange={(value) =>
											setFormData({ genre: value })
										}
									>
										<SelectTrigger className='border-gray-300 focus:border-blue-500 focus:ring-blue-500'>
											<SelectValue placeholder='Selecciona un género' />
										</SelectTrigger>
										<SelectContent className='bg-white border border-gray-200'>
											<SelectItem value='accion'>
												Acción
											</SelectItem>
											<SelectItem value='comedia'>
												Comedia
											</SelectItem>
											<SelectItem value='drama'>
												Drama
											</SelectItem>
											<SelectItem value='terror'>
												Terror
											</SelectItem>
											<SelectItem value='ciencia-ficcion'>
												Ciencia Ficción
											</SelectItem>
											<SelectItem value='animacion'>
												Animación
											</SelectItem>
										</SelectContent>
									</Select>
								</div>
								<div className='space-y-2'>
									<Label
										htmlFor='classification'
										className='text-gray-700 font-medium'
									>
										Clasificación
									</Label>
									<Select
										value={formData.classification}
										onValueChange={(value) =>
											setFormData({
												classification: value,
											})
										}
									>
										<SelectTrigger className='border-gray-300 focus:border-blue-500 focus:ring-blue-500'>
											<SelectValue placeholder='Selecciona clasificación' />
										</SelectTrigger>
										<SelectContent className='bg-white border border-gray-200'>
											<SelectItem value='AA'>
												AA - Todo público
											</SelectItem>
											<SelectItem value='A'>
												A - Niños
											</SelectItem>
											<SelectItem value='B'>
												B - Adolescentes
											</SelectItem>
											<SelectItem value='B15'>
												B15 - Mayores de 15
											</SelectItem>
											<SelectItem value='C'>
												C - Adultos
											</SelectItem>
											<SelectItem value='D'>
												D - Solo adultos
											</SelectItem>
										</SelectContent>
									</Select>
								</div>
							</div>
							<div className='space-y-2'>
								<Label
									htmlFor='synopsis'
									className='text-gray-700 font-medium'
								>
									Sinopsis
								</Label>
								<Textarea
									id='synopsis'
									value={formData.synopsis}
									onChange={(e) =>
										setFormData({
											synopsis: e.target.value,
										})
									}
									className='border-gray-300 focus:border-blue-500 focus:ring-blue-500 min-h-[100px]'
									placeholder='Descripción de la película...'
								/>
							</div>
							<div className='space-y-2'>
								<Label
									htmlFor='file'
									className='text-gray-700 font-medium'
								>
									Poster (opcional)
								</Label>
								<Input
									id='file'
									type='file'
									accept='image/*'
									onChange={handleFileChange}
									className='border-gray-300 focus:border-blue-500 focus:ring-blue-500'
								/>
							</div>
						</div>
						<DialogFooter>
							<Button
								variant='outline'
								onClick={() => resetForm()}
								className='border-gray-300 text-gray-700 hover:bg-gray-50'
							>
								Cancelar
							</Button>
							<Button
								onClick={createMovie}
								disabled={isLoading}
								className='bg-blue-600 hover:bg-blue-700 text-white'
							>
								{isLoading ? 'Creando...' : 'Crear Película'}
							</Button>
						</DialogFooter>
					</DialogContent>
				</Dialog>
			</div>

			{/* Error Message */}
			{error && (
				<div className='bg-red-50 border border-red-200 rounded-lg p-4'>
					<p className='text-red-800 text-sm'>{error}</p>
				</div>
			)}

			{/* Movies Grid */}
			{isLoading && movies.length === 0 ? (
				<div className='flex items-center justify-center h-64'>
					<div className='text-center'>
						<Film className='h-12 w-12 text-gray-400 mx-auto mb-4' />
						<p className='text-gray-500'>Cargando películas...</p>
					</div>
				</div>
			) : (
				<div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
					{movies.map((movie) => (
						<Card
							key={movie.id}
							className='bg-white border h-[500px] border-gray-200 shadow-sm hover:shadow-md transition-shadow'
						>
							<div className='aspect-[2/3] relative overflow-hidden rounded-t-lg bg-gray-100'>
								{movie.photo ? (
									<Image
										src={movie.photo}
										alt={movie.name}
										fill
										className='object-cover'
									/>
								) : (
									<div className='flex items-center justify-center h-full'>
										<Film className='h-16 w-16 text-gray-400' />
									</div>
								)}
								<div className='absolute top-2 right-2 flex space-x-1'>
									<Button
										variant='secondary'
										size='sm'
										onClick={() => openEditDialog(movie)}
										className='h-8 w-8 p-0 bg-white/90 hover:bg-white border-0 shadow-sm'
									>
										<Edit className='h-4 w-4 text-gray-600' />
									</Button>
									<Button
										variant='secondary'
										size='sm'
										onClick={() => deleteMovie(movie.id)}
										className='h-8 w-8 p-0 bg-white/90 hover:bg-white border-0 shadow-sm'
										disabled={isLoading}
									>
										<Trash2 className='h-4 w-4 text-red-600' />
									</Button>
								</div>
							</div>
							<CardHeader className='pb-3'>
								<CardTitle className='text-gray-900 text-lg font-semibold line-clamp-2'>
									{movie.name}
								</CardTitle>
								<div className='flex items-center space-x-4 text-sm text-gray-500'>
									<div className='flex items-center'>
										<Clock className='h-4 w-4 mr-1' />
										{movie.duration} min
									</div>
									{movie.classification && (
										<div className='flex items-center'>
											<Tag className='h-4 w-4 mr-1' />
											{movie.classification}
										</div>
									)}
								</div>
							</CardHeader>
							{movie.synopsis && (
								<CardContent className='pt-0'>
									<p className='text-gray-600 text-sm line-clamp-3'>
										{movie.synopsis}
									</p>
								</CardContent>
							)}
						</Card>
					))}
				</div>
			)}

			{/* Edit Dialog */}
			<Dialog
				open={isEditDialogOpen}
				onOpenChange={(open) => {
					if (!open) resetForm()
				}}
			>
				<DialogContent className='bg-white border border-gray-200 shadow-lg max-w-2xl'>
					<DialogHeader>
						<DialogTitle className='text-gray-900'>
							Editar Película
						</DialogTitle>
						<DialogDescription className='text-gray-600'>
							Modifica la información de la película.
						</DialogDescription>
					</DialogHeader>
					<div className='grid gap-4 py-4'>
						<div className='grid grid-cols-2 gap-4'>
							<div className='space-y-2'>
								<Label
									htmlFor='edit-name'
									className='text-gray-700 font-medium'
								>
									Título
								</Label>
								<Input
									id='edit-name'
									value={formData.name}
									onChange={(e) =>
										setFormData({ name: e.target.value })
									}
									className='border-gray-300 focus:border-blue-500 focus:ring-blue-500'
								/>
							</div>
							<div className='space-y-2'>
								<Label
									htmlFor='edit-duration'
									className='text-gray-700 font-medium'
								>
									Duración (min)
								</Label>
								<Input
									id='edit-duration'
									type='number'
									value={formData.duration}
									onChange={(e) =>
										setFormData({
											duration:
												parseInt(e.target.value) || 0,
										})
									}
									className='border-gray-300 focus:border-blue-500 focus:ring-blue-500'
								/>
							</div>
						</div>
						<div className='space-y-2'>
							<Label
								htmlFor='edit-synopsis'
								className='text-gray-700 font-medium'
							>
								Sinopsis
							</Label>
							<Textarea
								id='edit-synopsis'
								value={formData.synopsis}
								onChange={(e) =>
									setFormData({ synopsis: e.target.value })
								}
								className='border-gray-300 focus:border-blue-500 focus:ring-blue-500 min-h-[100px]'
							/>
						</div>
					</div>
					<DialogFooter>
						<Button
							variant='outline'
							onClick={() => resetForm()}
							className='border-gray-300 text-gray-700 hover:bg-gray-50'
						>
							Cancelar
						</Button>
						<Button
							onClick={updateMovie}
							disabled={isLoading}
							className='bg-blue-600 hover:bg-blue-700 text-white'
						>
							{isLoading ? 'Guardando...' : 'Guardar Cambios'}
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	)
}
