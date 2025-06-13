'use client'

import { useEffect } from 'react'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { useAuthStore } from '@/features/auth/model/store'
import { useDashboardStore } from '@/features/dashboard/model/store'
import { Users, Film, Calendar, MapPin, Armchair, Clock } from 'lucide-react'

export default function DashboardPage() {
	const { user } = useAuthStore()
	const { stats, isLoading, error, loadStats } = useDashboardStore()

	useEffect(() => {
		loadStats()
	}, [loadStats])
  

	if (isLoading && !stats) {
		return (
			<div className='flex-1 space-y-4 p-8 pt-6'>
				<div className='flex items-center justify-center h-64'>
					<p className='text-gray-500'>Cargando estadísticas...</p>
				</div>
			</div>
		)
	}

	return (
		<div className='flex-1 space-y-6 p-8 pt-6 bg-white min-h-screen'>
			{/* Header */}
			<div className='flex items-center justify-between'>
				<div>
					<h1 className='text-3xl font-bold tracking-tight text-gray-900'>
						Dashboard
					</h1>
					<p className='text-gray-600'>Resumen general de tu cine</p>
				</div>
			</div>

			{/* Error Message */}
			{error && (
				<div className='bg-red-50 border border-red-200 rounded-lg p-4'>
					<p className='text-red-800 text-sm'>{error}</p>
				</div>
			)}

			{/* Stats Grid */}
			<div className='grid gap-6 md:grid-cols-2 lg:grid-cols-5'>
				<Card className='bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow'>
					<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
						<CardTitle className='text-sm font-medium text-gray-600'>
							Total de Usuarios
						</CardTitle>
						<Users className='h-4 w-4 text-blue-600' />
					</CardHeader>
					<CardContent>
						<div className='text-2xl font-bold text-gray-900'>
							{stats?.totalUsers || 0}
						</div>
						<p className='text-xs text-gray-500'>
							Usuarios registrados
						</p>
					</CardContent>
				</Card>

				<Card className='bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow'>
					<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
						<CardTitle className='text-sm font-medium text-gray-600'>
							Películas
						</CardTitle>
						<Film className='h-4 w-4 text-purple-600' />
					</CardHeader>
					<CardContent>
						<div className='text-2xl font-bold text-gray-900'>
							{stats?.totalMovies || 0}
						</div>
						<p className='text-xs text-gray-500'>En cartelera</p>
					</CardContent>
				</Card>

				<Card className='bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow'>
					<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
						<CardTitle className='text-sm font-medium text-gray-600'>
							Funciones
						</CardTitle>
						<Calendar className='h-4 w-4 text-green-600' />
					</CardHeader>
					<CardContent>
						<div className='text-2xl font-bold text-gray-900'>
							{stats?.totalScreenings || 0}
						</div>
						<p className='text-xs text-gray-500'>Programadas</p>
					</CardContent>
				</Card>

				<Card className='bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow'>
					<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
						<CardTitle className='text-sm font-medium text-gray-600'>
							Salas
						</CardTitle>
						<MapPin className='h-4 w-4 text-orange-600' />
					</CardHeader>
					<CardContent>
						<div className='text-2xl font-bold text-gray-900'>
							{stats?.totalRooms || 0}
						</div>
						<p className='text-xs text-gray-500'>Disponibles</p>
					</CardContent>
				</Card>

				<Card className='bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow'>
					<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
						<CardTitle className='text-sm font-medium text-gray-600'>
							Asientos
						</CardTitle>
						<Armchair className='h-4 w-4 text-red-600' />
					</CardHeader>
					<CardContent>
						<div className='text-2xl font-bold text-gray-900'>
							{stats?.totalSeats || 0}
						</div>
						<p className='text-xs text-gray-500'>
							Total disponibles
						</p>
					</CardContent>
				</Card>
			</div>

			{/* Content Grid */}
			<div className='grid gap-6 md:grid-cols-2'>
				{/* Welcome Card */}
				<Card className='bg-white border border-gray-200 shadow-sm'>
					<CardHeader>
						<CardTitle className='text-gray-900'>
							Bienvenido
						</CardTitle>
						<CardDescription className='text-gray-600'>
							Panel de administración de Cinerex
						</CardDescription>
					</CardHeader>
					<CardContent>
						<p className='text-gray-700'>
							Hola{' '}
							<span className='font-medium'>{user?.name}</span>,
							aquí podrás gestionar todos los aspectos de tu cine.
							Utiliza el menú lateral para navegar entre las
							diferentes secciones.
						</p>
					</CardContent>
				</Card>

				{/* Recent Movies */}
				<Card className='bg-white border border-gray-200 shadow-sm'>
					<CardHeader>
						<CardTitle className='text-gray-900 flex items-center'>
							<Film className='h-5 w-5 mr-2 text-purple-600' />
							Películas Recientes
						</CardTitle>
						<CardDescription className='text-gray-600'>
							Últimas películas agregadas
						</CardDescription>
					</CardHeader>
					<CardContent>
						{stats?.recentMovies &&
						stats.recentMovies.length > 0 ? (
							<div className='space-y-3'>
								{stats.recentMovies.map((movie) => (
									<div
										key={movie.id}
										className='flex items-center justify-between p-2 rounded-lg bg-gray-50'
									>
										<div>
											<p className='font-medium text-gray-900'>
												{movie.name}
											</p>
											<p className='text-sm text-gray-500 flex items-center'>
												<Clock className='h-3 w-3 mr-1' />
												{movie.duration} min
											</p>
										</div>
									</div>
								))}
							</div>
						) : (
							<p className='text-gray-500 text-sm'>
								No hay películas recientes
							</p>
						)}
					</CardContent>
				</Card>

				{/* Upcoming Screenings */}
				<Card className='bg-white border border-gray-200 shadow-sm md:col-span-2'>
					<CardHeader>
						<CardTitle className='text-gray-900 flex items-center'>
							<Calendar className='h-5 w-5 mr-2 text-green-600' />
							Próximas Funciones
						</CardTitle>
						<CardDescription className='text-gray-600'>
							Funciones programadas para los próximos días
						</CardDescription>
					</CardHeader>
					<CardContent>
						{stats?.upcomingScreenings &&
						stats.upcomingScreenings.length > 0 ? (
							<div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
								{stats.upcomingScreenings.map((screening) => (
									<div
										key={screening.id}
										className='p-4 rounded-lg border border-gray-200 bg-gray-50'
									>
										<div className='space-y-2'>
											<h4 className='font-medium text-gray-900'>
												{screening.movie.name}
											</h4>
											<p className='text-sm text-gray-600 flex items-center'>
												<Calendar className='h-3 w-3 mr-1' />
												{new Date(
													screening.datetime
												).toLocaleDateString('es-ES', {
													weekday: 'short',
													month: 'short',
													day: 'numeric',
													hour: '2-digit',
													minute: '2-digit',
												})}
											</p>
											{screening.roomScreenings &&
												screening.roomScreenings
													.length > 0 && (
													<p className='text-sm text-gray-600 flex items-center'>
														<MapPin className='h-3 w-3 mr-1' />
														{screening.roomScreenings
															.map(
																(rs) =>
																	rs.room.name
															)
															.join(', ')}
													</p>
												)}
										</div>
									</div>
								))}
							</div>
						) : (
							<p className='text-gray-500 text-sm'>
								No hay funciones programadas
							</p>
						)}
					</CardContent>
				</Card>
			</div>
		</div>
	)
}
