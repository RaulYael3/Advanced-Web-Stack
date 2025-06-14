'use client'

import { useEffect, useMemo } from 'react'
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
import { useRoomStore } from '@/features/rooms/model/store'
import { Plus, Edit, Trash2, Users, MapPin, Armchair } from 'lucide-react'

export default function SalasPage() {
	const {
		rooms,
		selectedRoom,
		seats,
		isLoading,
		error,
		formData,
		seatFormData,
		isCreateDialogOpen,
		isEditDialogOpen,
		isSeatDialogOpen,
		setFormData,
		setSeatFormData,
		setIsCreateDialogOpen,
		loadRooms,
		createRoom,
		updateRoom,
		deleteRoom,
		createSeat,
		deleteSeat,
		openEditDialog,
		openSeatDialog,
		resetForm,
	} = useRoomStore()

	useEffect(() => {
		loadRooms()
	}, [loadRooms])

	const totalSeats = useMemo(() => {
		return seats.reduce((acc, seat) => {
			return acc + (Number(seat.code) || 0)
		}, 0)
	}, [rooms])

	return (
		<div className='flex-1 space-y-6 p-8 pt-6 '>
			{/* Header */}
			<div className='flex items-center justify-between'>
				<div>
					<h1 className='text-3xl font-bold tracking-tight text-gray-900'>
						Salas de Cine
					</h1>
					<p className='text-gray-600'>
						Gestiona las salas y asientos de tu cine
					</p>
				</div>
				<Dialog
					open={isCreateDialogOpen}
					onOpenChange={setIsCreateDialogOpen}
				>
					<DialogTrigger asChild>
						<Button className='border-none bg-transparent text-brand-dark-700 cursor-pointer hover:bg-brand-50'>
							<Plus className='mr-2 h-4 w-4' />
							Nueva Sala
						</Button>
					</DialogTrigger>
					<DialogContent className='bg-white border border-gray-200 shadow-lg'>
						<DialogHeader>
							<DialogTitle className='text-gray-900'>
								Crear Nueva Sala
							</DialogTitle>
							<DialogDescription className='text-gray-600'>
								Ingresa el nombre de la nueva sala.
							</DialogDescription>
						</DialogHeader>
						<div className='grid gap-4 py-4'>
							<div className='space-y-2'>
								<Label
									htmlFor='name'
									className='text-gray-700 font-medium'
								>
									Nombre de la Sala
								</Label>
								<Input
									id='name'
									value={formData.name}
									onChange={(e) =>
										setFormData({ name: e.target.value })
									}
									className='border-gray-300 focus:border-blue-500 focus:ring-blue-500'
									placeholder='Ej: Sala 1, Sala Premium, etc.'
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
								onClick={createRoom}
								disabled={isLoading}
								className='bg-blue-600 hover:bg-blue-700 text-white'
							>
								{isLoading ? 'Creando...' : 'Crear Sala'}
							</Button>
						</DialogFooter>
					</DialogContent>
				</Dialog>
			</div>

			{/* Rooms Grid */}
			{isLoading && rooms.length === 0 ? (
				<div className='flex items-center justify-center h-64'>
					<div className='text-center'>
						<MapPin className='h-12 w-12 text-gray-400 mx-auto mb-4' />
						<p className='text-gray-500'>Cargando salas...</p>
					</div>
				</div>
			) : (
				<div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
					{rooms.map((room) => (
						<Card
							key={room.id}
							className='bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow'
						>
							<CardHeader className='pb-3'>
								<div className='flex items-center justify-between'>
									<CardTitle className='text-gray-900 text-lg font-semibold flex items-center'>
										<MapPin className='h-5 w-5 mr-2 text-blue-600' />
										{room.name}
									</CardTitle>
									<div className='flex space-x-1'>
										<Button
											variant='ghost'
											size='sm'
											onClick={() => openEditDialog(room)}
											className='h-8 w-8 p-0 text-gray-600 hover:text-blue-600'
										>
											<Edit className='h-4 w-4' />
										</Button>
										<Button
											variant='ghost'
											size='sm'
											onClick={() => deleteRoom(room.id)}
											className='h-8 w-8 p-0 text-gray-600 hover:text-red-600'
											disabled={isLoading}
										>
											<Trash2 className='h-4 w-4' />
										</Button>
									</div>
								</div>
							</CardHeader>
							<CardContent className='space-y-3'>
								<div className='flex items-center justify-between'>
									<span className='text-sm text-gray-600'>
										Asientos
									</span>
									<span className='text-sm font-medium text-gray-900'>
										{totalSeats || 0}
									</span>
								</div>
								<Button
									variant='outline'
									size='sm'
									onClick={() => openSeatDialog(room)}
									className='w-full text-blue-600 border-blue-200 hover:bg-blue-50'
								>
									<Armchair className='h-4 w-4 mr-2' />
									Gestionar Asientos
								</Button>
							</CardContent>
						</Card>
					))}
				</div>
			)}

			{/* Edit Room Dialog */}
			<Dialog
				open={isEditDialogOpen}
				onOpenChange={(open) => {
					if (!open) resetForm()
				}}
			>
				<DialogContent className='bg-white border border-gray-200 shadow-lg'>
					<DialogHeader>
						<DialogTitle className='text-gray-900'>
							Editar Sala
						</DialogTitle>
						<DialogDescription className='text-gray-600'>
							Modifica el nombre de la sala.
						</DialogDescription>
					</DialogHeader>
					<div className='grid gap-4 py-4'>
						<div className='space-y-2'>
							<Label
								htmlFor='edit-name'
								className='text-gray-700 font-medium'
							>
								Nombre de la Sala
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
							onClick={updateRoom}
							disabled={isLoading}
							className='bg-blue-600 hover:bg-blue-700 text-white'
						>
							{isLoading ? 'Guardando...' : 'Guardar Cambios'}
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>

			{/* Seat Management Dialog */}
			<Dialog
				open={isSeatDialogOpen}
				onOpenChange={(open) => {
					if (!open) resetForm()
				}}
			>
				<DialogContent className='bg-white border border-gray-200 shadow-lg max-w-4xl'>
					<DialogHeader>
						<DialogTitle className='text-gray-900'>
							Gestionar Asientos - {selectedRoom?.name}
						</DialogTitle>
						<DialogDescription className='text-gray-600'>
							Agrega filas de asientos para esta sala.
						</DialogDescription>
					</DialogHeader>
					<div className='grid gap-6 py-4'>
						{/* Add Seat Row Form */}
						<div className='grid grid-cols-3 gap-4 p-4 border border-gray-200 rounded-lg'>
							<div className='space-y-2'>
								<Label
									htmlFor='seat-row'
									className='text-gray-700 font-medium'
								>
									Fila
								</Label>
								<Input
									id='seat-row'
									value={seatFormData.row || ''}
									onChange={(e) => {
										console.log(
											'Row input changed to:',
											e.target.value
										)
										setSeatFormData({
											row: e.target.value.toUpperCase(),
										})
									}}
									className='border-gray-300 focus:border-blue-500 focus:ring-blue-500'
									placeholder='A, B, C...'
									maxLength={1}
								/>
								{!seatFormData.row && (
									<p className='text-xs text-red-500'>
										La fila es requerida
									</p>
								)}
							</div>
							<div className='space-y-2'>
								<Label
									htmlFor='seat-count'
									className='text-gray-700 font-medium'
								>
									Cantidad de Asientos
								</Label>
								<Input
									id='seat-count'
									type='number'
									min='1'
									max='50'
									value={seatFormData.seatCount || 1}
									onChange={(e) => {
										const value =
											parseInt(e.target.value) || 1
										console.log(
											'SeatCount input changed to:',
											value
										)
										setSeatFormData({
											seatCount: Math.max(1, value),
										})
									}}
									className='border-gray-300 focus:border-blue-500 focus:ring-blue-500'
									placeholder='10'
								/>
								{seatFormData.seatCount < 1 && (
									<p className='text-xs text-red-500'>
										Mínimo 1 asiento
									</p>
								)}
							</div>
							<div className='space-y-2'>
								<Label className='text-gray-700 font-medium'>
									Acción
								</Label>
								<Button
									onClick={() => {
										console.log(
											'Create button clicked with data:',
											seatFormData
										)
										createSeat()
									}}
									disabled={
										isLoading ||
										!seatFormData.row ||
										seatFormData.seatCount < 1
									}
									className='w-full bg-green-600 hover:bg-green-700 text-white disabled:opacity-50'
								>
									<Plus className='h-4 w-4 mr-2' />
									{isLoading ? 'Creando...' : 'Crear Fila'}
								</Button>
							</div>
						</div>

						{/* Seats Display by Rows */}
						<div>
							<h3 className='text-lg font-medium text-gray-900 mb-4'>
								Asientos Actuales ({totalSeats})
							</h3>
							{seats.length > 0 ? (
								<div className='space-y-3'>
									{Object.entries(
										seats.reduce((acc, seat) => {
											if (!acc[seat.row])
												acc[seat.row] = []
											acc[seat.row].push(seat)
											return acc
										}, {} as Record<string, any[]>)
									)
										.sort(([a], [b]) => a.localeCompare(b))
										.map(([row, rowSeats]) => (
											<div
												key={row}
												className='p-3 border border-gray-200 rounded-lg'
											>
												<div className='flex items-center justify-between mb-2'>
													<span className='font-medium text-gray-900'>
														Fila {row}
													</span>
													<span className='text-sm text-gray-600'>
														{rowSeats.length}{' '}
														asientos
													</span>
												</div>
												<div className='flex gap-1 flex-wrap'>
													{rowSeats
														.sort(
															(a, b) =>
																a.seatNumber -
																b.seatNumber
														)
														.map((seat) => (
															<div
																key={seat.id}
																className='relative group'
															>
																<div className='w-8 h-8 flex items-center justify-center text-xs border border-gray-300 rounded bg-gray-50'>
																	{
																		seat.seatNumber
																	}
																</div>
																<Button
																	variant='ghost'
																	size='sm'
																	onClick={() =>
																		deleteSeat(
																			seat.id
																		)
																	}
																	className='absolute -top-1 -right-1 h-4 w-4 p-0 bg-red-500 hover:bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity'
																>
																	<Trash2 className='h-2 w-2' />
																</Button>
															</div>
														))}
												</div>
											</div>
										))}
								</div>
							) : (
								<div className='text-center py-8 text-gray-500'>
									<Armchair className='h-12 w-12 mx-auto mb-2 opacity-50' />
									<p>No hay asientos configurados</p>
									<p className='text-sm'>
										Agrega una fila para comenzar
									</p>
								</div>
							)}
						</div>
					</div>
					<DialogFooter>
						<Button
							onClick={() => resetForm()}
							className='bg-blue-600 hover:bg-blue-700 text-white'
						>
							Cerrar
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	)
}
