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
import { Checkbox } from '@/components/ui/checkbox'
import { useScreeningStore } from '@/features/screenings/model/store'
import { Plus, Edit, Trash2, Film, Calendar, MapPin } from 'lucide-react'

export default function FuncionesPage() {
	const {
		screenings,
		movies,
		rooms,
		isLoading,
		error,
		formData,
		isCreateDialogOpen,
		isEditDialogOpen,
		setFormData,
		setIsCreateDialogOpen,
		loadScreenings,
		loadMovies,
		loadRooms,
		createScreening,
		updateScreening,
		deleteScreening,
		openEditDialog,
		resetForm,
	} = useScreeningStore()

	useEffect(() => {
		loadScreenings()
		loadMovies()
		loadRooms()
	}, [loadScreenings, loadMovies, loadRooms])

	const handleDateTimeChange = (value: string) => {
		setFormData({ datetime: value })
	}

	const handleMovieChange = (value: string) => {
		setFormData({ movieId: parseInt(value) })
	}

	const handleRoomToggle = (roomId: number) => {
		const currentRoomIds = formData.roomIds || []
		const isSelected = currentRoomIds.includes(roomId)

		if (isSelected) {
			setFormData({
				roomIds: currentRoomIds.filter((id) => id !== roomId),
			})
		} else {
			setFormData({ roomIds: [...currentRoomIds, roomId] })
		}
	}

	return (
		<div className='flex-1 space-y-6 p-8 pt-6 '>
			{/* Header */}
			<div className='flex items-center justify-between'>
				<div>
					<h1 className='text-3xl font-bold tracking-tight text-gray-900'>
						Funciones de Cine
					</h1>
					<p className='text-gray-600'>
						Gestiona las funciones y horarios de tu cine
					</p>
				</div>
				<Dialog
					open={isCreateDialogOpen}
					onOpenChange={setIsCreateDialogOpen}
				>
					<DialogTrigger asChild>
						<Button className='border-none bg-transparent text-brand-dark-700 cursor-pointer hover:bg-brand-50'>
							<Plus className='mr-2 h-4 w-4' />
							Nueva Función
						</Button>
					</DialogTrigger>
					<DialogContent className='bg-white border border-gray-200 shadow-lg max-w-2xl'>
						<DialogHeader>
							<DialogTitle className='text-gray-900'>
								Crear Nueva Función
							</DialogTitle>
							<DialogDescription className='text-gray-600'>
								Configura los detalles de la nueva función de
								cine.
							</DialogDescription>
						</DialogHeader>
						<div className='grid gap-6 py-4'>
							<div className='grid grid-cols-2 gap-4'>
								<div className='space-y-2'>
									<Label
										htmlFor='datetime'
										className='text-gray-700 font-medium'
									>
										Fecha y Hora
									</Label>
									<Input
										id='datetime'
										type='datetime-local'
										value={formData.datetime}
										onChange={(e) =>
											handleDateTimeChange(e.target.value)
										}
										className='border-gray-300 focus:border-blue-500 focus:ring-blue-500'
									/>
								</div>
								<div className='space-y-2'>
									<Label
										htmlFor='movie'
										className='text-gray-700 font-medium'
									>
										Película
									</Label>
									<Select
										value={formData.movieId.toString()}
										onValueChange={handleMovieChange}
									>
										<SelectTrigger className='border-gray-300 focus:border-blue-500 focus:ring-blue-500'>
											<SelectValue placeholder='Selecciona una película' />
										</SelectTrigger>
										<SelectContent className='bg-white border border-gray-200'>
											{movies.map((movie) => (
												<SelectItem
													key={movie.id}
													value={movie.id.toString()}
												>
													<div className='flex items-center'>
														<Film className='h-4 w-4 mr-2' />
														{movie.name} (
														{movie.duration} min)
													</div>
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</div>
							</div>

							<div className='space-y-3'>
								<Label className='text-gray-700 font-medium'>
									Salas Asignadas
								</Label>
								<div className='grid grid-cols-2 gap-3 max-h-32 overflow-y-auto p-3 border border-gray-200 rounded-lg'>
									{rooms.map((room) => (
										<div
											key={room.id}
											className='flex items-center space-x-2'
										>
											<Checkbox
												id={`room-${room.id}`}
												checked={
													formData.roomIds?.includes(
														room.id
													) || false
												}
												onCheckedChange={() =>
													handleRoomToggle(room.id)
												}
											/>
											<Label
												htmlFor={`room-${room.id}`}
												className='text-sm font-normal text-gray-700 cursor-pointer flex items-center'
											>
												<MapPin className='h-3 w-3 mr-1' />
												{room.name}
											</Label>
										</div>
									))}
								</div>
								{formData.roomIds &&
									formData.roomIds.length > 0 && (
										<p className='text-sm text-blue-600'>
											{formData.roomIds.length} sala(s)
											seleccionada(s)
										</p>
									)}
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
								onClick={createScreening}
								disabled={
									isLoading ||
									!formData.movieId ||
									!formData.datetime
								}
								className='bg-blue-600 hover:bg-blue-700 text-white'
							>
								{isLoading ? 'Creando...' : 'Crear Función'}
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

			{/* Screenings Grid */}
			{isLoading && screenings.length === 0 ? (
				<div className='flex items-center justify-center h-64'>
					<div className='text-center'>
						<Calendar className='h-12 w-12 text-gray-400 mx-auto mb-4' />
						<p className='text-gray-500'>Cargando funciones...</p>
					</div>
				</div>
			) : (
				<div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
					{screenings.map((screening) => (
						<Card
							key={screening.id}
							className='bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow'
						>
							<CardHeader className='pb-3'>
								<div className='flex items-center justify-between'>
									<CardTitle className='text-gray-900 text-lg font-semibold flex items-center'>
										<Film className='h-5 w-5 mr-2 text-blue-600' />
										{screening.movie.title ||
											screening.movie.name}
									</CardTitle>
									<div className='flex space-x-1'>
										<Button
											variant='ghost'
											size='sm'
											onClick={() =>
												openEditDialog(screening)
											}
											className='h-8 w-8 p-0 text-gray-600 hover:text-blue-600'
										>
											<Edit className='h-4 w-4' />
										</Button>
										<Button
											variant='ghost'
											size='sm'
											onClick={() =>
												deleteScreening(screening.id)
											}
											className='h-8 w-8 p-0 text-gray-600 hover:text-red-600'
											disabled={isLoading}
										>
											<Trash2 className='h-4 w-4' />
										</Button>
									</div>
								</div>
								<CardDescription className='text-gray-600 flex items-center'>
									<Calendar className='h-4 w-4 mr-1' />
									{new Date(
										screening.datetime
									).toLocaleDateString('es-ES', {
										weekday: 'long',
										year: 'numeric',
										month: 'long',
										day: 'numeric',
										hour: '2-digit',
										minute: '2-digit',
									})}
								</CardDescription>
							</CardHeader>
							<CardContent className='space-y-2'>
								<div className='flex items-center text-sm text-gray-600'>
									<span>
										Duración: {screening.movie.duration}{' '}
										minutos
									</span>
								</div>
								{screening.roomScreenings &&
									screening.roomScreenings.length > 0 && (
										<div className='flex items-center text-sm text-gray-600'>
											<MapPin className='h-4 w-4 mr-1' />
											<span>
												{screening.roomScreenings
													.map((rs) => rs.room.name)
													.join(', ')}
											</span>
										</div>
									)}
							</CardContent>
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
				<DialogContent className='bg-white border border-gray-200 shadow-lg'>
					<DialogHeader>
						<DialogTitle className='text-gray-900'>
							Editar Función
						</DialogTitle>
						<DialogDescription className='text-gray-600'>
							Modifica los detalles de la función.
						</DialogDescription>
					</DialogHeader>
					<div className='grid gap-4 py-4'>
						<div className='space-y-2'>
							<Label
								htmlFor='edit-datetime'
								className='text-gray-700 font-medium'
							>
								Fecha y Hora
							</Label>
							<Input
								id='edit-datetime'
								type='datetime-local'
								value={formData.datetime}
								onChange={(e) =>
									handleDateTimeChange(e.target.value)
								}
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
							onClick={updateScreening}
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
