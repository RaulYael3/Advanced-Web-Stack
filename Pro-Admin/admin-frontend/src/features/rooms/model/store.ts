import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import {
	roomsApi,
	seatsApi,
	Room,
	Seat,
	CreateRoomDto,
	CreateSeatDto,
} from '../api/rooms.api'

interface RoomState {
	rooms: Room[]
	selectedRoom: Room | null
	seats: Seat[]
	isLoading: boolean
	error: string | null
	formData: CreateRoomDto
	seatFormData: CreateSeatDto
	isCreateDialogOpen: boolean
	isEditDialogOpen: boolean
	isSeatDialogOpen: boolean
	editingRoom: Room | null

	// Actions
	setFormData: (data: Partial<CreateRoomDto>) => void
	setSeatFormData: (data: Partial<CreateSeatDto>) => void
	setSelectedRoom: (room: Room | null) => void
	setIsCreateDialogOpen: (open: boolean) => void
	setIsEditDialogOpen: (open: boolean) => void
	setIsSeatDialogOpen: (open: boolean) => void
	setEditingRoom: (room: Room | null) => void
	loadRooms: () => Promise<void>
	loadSeats: (roomId: number) => Promise<void>
	createRoom: () => Promise<void>
	updateRoom: () => Promise<void>
	deleteRoom: (id: number) => Promise<void>
	createSeat: () => Promise<void>
	deleteSeat: (id: number) => Promise<void>
	openEditDialog: (room: Room) => void
	openSeatDialog: (room: Room) => void
	resetForm: () => void
}

const initialFormData: CreateRoomDto = {
	name: '',
}

const initialSeatFormData: CreateSeatDto = {
	code: '',
	row: '',
	roomId: 0,
}

export const useRoomStore = create<RoomState>()(
	devtools(
		(set, get) => ({
			rooms: [],
			selectedRoom: null,
			seats: [],
			isLoading: false,
			error: null,
			formData: initialFormData,
			seatFormData: initialSeatFormData,
			isCreateDialogOpen: false,
			isEditDialogOpen: false,
			isSeatDialogOpen: false,
			editingRoom: null,

			setFormData: (data) =>
				set((state) => ({
					formData: { ...state.formData, ...data },
				})),

			setSeatFormData: (data) =>
				set((state) => ({
					seatFormData: { ...state.seatFormData, ...data },
				})),

			setSelectedRoom: (room) => set({ selectedRoom: room }),

			setIsCreateDialogOpen: (open) => set({ isCreateDialogOpen: open }),

			setIsEditDialogOpen: (open) => set({ isEditDialogOpen: open }),

			setIsSeatDialogOpen: (open) => set({ isSeatDialogOpen: open }),

			setEditingRoom: (room) => set({ editingRoom: room }),

			loadRooms: async () => {
				set({ isLoading: true, error: null })
				try {
					const rooms = await roomsApi.getAll()
					set({ rooms, isLoading: false })
				} catch (error) {
					console.error('Error loading rooms:', error)
					set({
						error: 'Error al cargar las salas',
						isLoading: false,
					})
				}
			},

			loadSeats: async (roomId: number) => {
				set({ isLoading: true, error: null })
				try {
					const seats = await seatsApi.getByRoom(roomId)
					set({ seats, isLoading: false })
				} catch (error) {
					console.error('Error loading seats:', error)
					set({
						error: 'Error al cargar los asientos',
						isLoading: false,
					})
				}
			},

			createRoom: async () => {
				const { formData } = get()
				set({ isLoading: true, error: null })
				try {
					await roomsApi.create(formData)
					set({
						isCreateDialogOpen: false,
						formData: initialFormData,
						isLoading: false,
					})
					get().loadRooms()
				} catch (error) {
					console.error('Error creating room:', error)
					set({
						error: 'Error al crear la sala',
						isLoading: false,
					})
				}
			},

			updateRoom: async () => {
				const { editingRoom, formData } = get()
				if (!editingRoom) return

				set({ isLoading: true, error: null })
				try {
					await roomsApi.update(editingRoom.id, formData)
					set({
						isEditDialogOpen: false,
						editingRoom: null,
						formData: initialFormData,
						isLoading: false,
					})
					get().loadRooms()
				} catch (error) {
					console.error('Error updating room:', error)
					set({
						error: 'Error al actualizar la sala',
						isLoading: false,
					})
				}
			},

			deleteRoom: async (id: number) => {
				if (
					!confirm('¿Estás seguro de que quieres eliminar esta sala?')
				) {
					return
				}

				set({ isLoading: true, error: null })
				try {
					await roomsApi.delete(id)
					set({ isLoading: false })
					get().loadRooms()
				} catch (error) {
					console.error('Error deleting room:', error)
					set({
						error: 'Error al eliminar la sala',
						isLoading: false,
					})
				}
			},

			createSeat: async () => {
				const { seatFormData } = get()
				set({ isLoading: true, error: null })
				try {
					await seatsApi.create(seatFormData)
					set({
						isSeatDialogOpen: false,
						seatFormData: initialSeatFormData,
						isLoading: false,
					})
					if (seatFormData.roomId) {
						get().loadSeats(seatFormData.roomId)
					}
				} catch (error) {
					console.error('Error creating seat:', error)
					set({
						error: 'Error al crear el asiento',
						isLoading: false,
					})
				}
			},

			deleteSeat: async (id: number) => {
				if (
					!confirm(
						'¿Estás seguro de que quieres eliminar este asiento?'
					)
				) {
					return
				}

				const { selectedRoom } = get()
				set({ isLoading: true, error: null })
				try {
					await seatsApi.delete(id)
					set({ isLoading: false })
					if (selectedRoom) {
						get().loadSeats(selectedRoom.id)
					}
				} catch (error) {
					console.error('Error deleting seat:', error)
					set({
						error: 'Error al eliminar el asiento',
						isLoading: false,
					})
				}
			},

			openEditDialog: (room: Room) => {
				set({
					editingRoom: room,
					formData: {
						name: room.name,
					},
					isEditDialogOpen: true,
				})
			},

			openSeatDialog: (room: Room) => {
				set({
					selectedRoom: room,
					seatFormData: {
						...initialSeatFormData,
						roomId: room.id,
					},
					isSeatDialogOpen: true,
				})
				get().loadSeats(room.id)
			},

			resetForm: () => {
				set({
					formData: initialFormData,
					seatFormData: initialSeatFormData,
					editingRoom: null,
					isCreateDialogOpen: false,
					isEditDialogOpen: false,
					isSeatDialogOpen: false,
					error: null,
				})
			},
		}),
		{
			name: 'room-store',
		}
	)
)
