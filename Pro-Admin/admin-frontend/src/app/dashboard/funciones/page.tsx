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
import { useScreeningStore } from '@/features/screenings/model/store'
import { Plus, Edit, Trash2 } from 'lucide-react'

export default function FuncionesPage() {
	const {
		screenings,
		isLoading,
		error,
		formData,
		isCreateDialogOpen,
		isEditDialogOpen,
		setFormData,
		setIsCreateDialogOpen,
		loadScreenings,
		createScreening,
		updateScreening,
		deleteScreening,
		openEditDialog,
		resetForm,
	} = useScreeningStore()

	useEffect(() => {
		loadScreenings()
	}, [loadScreenings])

	const handleDateTimeChange = (value: string) => {
		setFormData({ datetime: value })
	}

	const handleMovieChange = (value: string) => {
		setFormData({ movieId: parseInt(value) })
	}

	return (
		<div className='flex-1 space-y-4 p-8 pt-6 '>
			<div className='flex items-center justify-between space-y-2'>
				<h2 className='text-3xl font-bold tracking-tight text-brand-dark-800'>
					Funciones
				</h2>
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
					<DialogContent className=' border-none'>
						<DialogHeader>
							<DialogTitle className='text-brand-dark-800'>
								Crear Nueva Función
							</DialogTitle>
							<DialogDescription className='text-brand-dark-600'>
								Ingresa los detalles de la nueva función de
								cine.
							</DialogDescription>
						</DialogHeader>
						<div className='grid gap-4 py-4'>
							<div className='grid gap-2'>
								<Label
									htmlFor='datetime'
									className='text-brand-dark-700'
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
									className='border-none bg-transparent text-brand-dark-700'
								/>
							</div>
							<div>
								<Label
									htmlFor='movie'
									className='text-brand-dark-700'
								>
									Película
								</Label>
								<Select
									value={formData.movieId.toString()}
									onValueChange={handleMovieChange}
								>
									<SelectTrigger className='border-none bg-transparent text-brand-dark-700'>
										<SelectValue placeholder='Selecciona una película' />
									</SelectTrigger>
									<SelectContent className=' border-none'>
										<SelectItem value='1'>
											Película de ejemplo
										</SelectItem>
									</SelectContent>
								</Select>
							</div>
							<div>
								<Label
									htmlFor='rooms'
									className='text-brand-dark-700'
								>
									Salas
								</Label>
								<Select
									value={formData.roomIds.join(',')}
									onValueChange={(value) => {
										const roomIds = value
											.split(',')
											.map((id) => parseInt(id))
										setFormData({ roomIds })
									}}
								>
									<SelectTrigger className='border-none bg-transparent text-brand-dark-700'>
										<SelectValue placeholder='Selecciona salas' />
									</SelectTrigger>
									<SelectContent className=' border-none'>
										<SelectItem value='1'>
											Sala 1
										</SelectItem>
										<SelectItem value='2'>
											Sala 2
										</SelectItem>
										<SelectItem value='3'>
											Sala 3
										</SelectItem>
									</SelectContent>
								</Select>
							</div>
						</div>
						<DialogFooter>
							<Button
								onClick={createScreening}
								disabled={isLoading}
								className='border-none bg-transparent text-brand-dark-700'
							>
								{isLoading ? 'Creando...' : 'Crear Función'}
							</Button>
						</DialogFooter>
					</DialogContent>
				</Dialog>
			</div>

			{error && (
				<div className='p-4 bg-red-100 border border-red-400 text-red-700 rounded'>
					{error}
				</div>
			)}

			{isLoading && screenings.length === 0 ? (
				<div className='text-center py-8'>
					<p className='text-brand-dark-700'>Cargando funciones...</p>
				</div>
			) : (
				<div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
					{screenings.map((screening) => (
						<Card
							key={screening.id}
							className='border-none shadow-none bg-transparent'
							style={{
								boxShadow:
									'-6px -6px 20px var(--color-brand-300), 6px 6px 20px var(--color-brand-700)',
							}}
						>
							<CardHeader>
								<div className='flex items-center justify-between'>
									<CardTitle className='text-brand-dark-800'>
										{screening.movie.title}
									</CardTitle>
									<div className='flex space-x-2'>
										<Button
											variant='ghost'
											size='sm'
											onClick={() =>
												openEditDialog(screening)
											}
											className='h-8 w-8 p-0 text-brand-dark-700'
										>
											<Edit className='h-4 w-4' />
										</Button>
										<Button
											variant='ghost'
											size='sm'
											onClick={() =>
												deleteScreening(screening.id)
											}
											className='h-8 w-8 p-0 text-brand-dark-700'
											disabled={isLoading}
										>
											<Trash2 className='h-4 w-4' />
										</Button>
									</div>
								</div>
								<CardDescription className='text-brand-dark-600'>
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
							<CardContent>
								<p className='text-sm text-brand-dark-700'>
									Duración: {screening.movie.duration} minutos
								</p>
								{screening.roomScreenings &&
									screening.roomScreenings.length > 0 && (
										<p className='text-sm text-brand-dark-700 mt-2'>
											Salas:{' '}
											{screening.roomScreenings
												.map((rs) => rs.room.name)
												.join(', ')}
										</p>
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
				<DialogContent
					className='bg-brand-500 border-none'
					style={{
						boxShadow:
							'-6px -6px 20px var(--color-brand-300), 6px 6px 20px var(--color-brand-700)',
					}}
				>
					<DialogHeader>
						<DialogTitle className='text-brand-dark-800'>
							Editar Función
						</DialogTitle>
						<DialogDescription className='text-brand-dark-600'>
							Modifica los detalles de la función.
						</DialogDescription>
					</DialogHeader>
					<div className='grid gap-4 py-4'>
						<div className='grid gap-2'>
							<Label
								htmlFor='edit-datetime'
								className='text-brand-dark-700'
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
								className='border-none bg-transparent text-brand-dark-700'
								style={{
									boxShadow:
										'inset 6px 6px 20px -15px var(--color-brand-700), inset -6px -6px 20px var(--color-brand-300)',
								}}
							/>
						</div>
					</div>
					<DialogFooter>
						<Button
							onClick={updateScreening}
							disabled={isLoading}
							className='border-none bg-transparent text-brand-dark-700'
							style={{
								boxShadow:
									'-6px -6px 20px var(--color-brand-300), 6px 6px 20px var(--color-brand-700)',
							}}
						>
							{isLoading ? 'Guardando...' : 'Guardar Cambios'}
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	)
}
