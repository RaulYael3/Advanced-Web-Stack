import { Seat } from '@/features/rooms/api/rooms.api'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'

export interface DashboardStats {
	totalUsers: number
	totalMovies: number
	totalScreenings: number
	totalRooms: number
	totalSeats: number
	recentMovies: {
		id: number
		name: string
		duration: number
	}[]
	upcomingScreenings: {
		id: number
		datetime: string
		movie: {
			name: string
		}
		roomScreenings: {
			room: {
				name: string
			}
		}[]
	}[]
}

export const dashboardApi = {
	getStats: async (): Promise<DashboardStats> => {
		try {
			// Hacer múltiples llamadas para obtener los datos
			const [usersRes, moviesRes, screeningsRes, roomsRes, seatsRes] =
				await Promise.all([
					fetch(`${API_URL}/users`, { credentials: 'include' }),
					fetch(`${API_URL}/movies`, { credentials: 'include' }),
					fetch(`${API_URL}/screenings`, { credentials: 'include' }),
					fetch(`${API_URL}/rooms`, { credentials: 'include' }),
					fetch(`${API_URL}/seats`, { credentials: 'include' }),
				])

			const users = await usersRes.json()
			const movies = await moviesRes.json()
			const screenings = await screeningsRes.json()
			const rooms = await roomsRes.json()
			const seats = await seatsRes.json()

			// Filtrar próximas funciones (próximas 7 días)
			const now = new Date()
			const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000)
			const upcomingScreenings = screenings
				.filter((screening: unknown) => {
					const screeningDate = new Date(screening.datetime)
					return screeningDate >= now && screeningDate <= nextWeek
				})
				.slice(0, 5)

			const totalSeats = seats.reduce(
				(total: number, seat: Seat) => total + Number(seat.code),
				0
			)

			return {
				totalUsers: users.length || 0,
				totalMovies: movies.length || 0,
				totalScreenings: screenings.length || 0,
				totalRooms: rooms.length || 0,
				totalSeats: totalSeats || 0,
				recentMovies: movies.slice(0, 5),
				upcomingScreenings,
			}
		} catch (error) {
			console.error('Error fetching dashboard stats:', error)
			throw error
		}
	},
}
