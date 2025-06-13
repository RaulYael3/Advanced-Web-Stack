import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Film, Clock, Calendar, MapPin } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useState } from 'react'

interface Movie {
	id: number
	name: string
	duration: number
	photo?: string
	synopsis?: string
	classification?: string
	genre?: string
}

interface Screening {
	id: number
	datetime: string
	roomScreenings?: {
		room: {
			name: string
		}
	}[]
}

interface MovieCardProps {
	movie: Movie
	onScreeningSelect: (screening: Screening) => void
}

export default function MovieCard({
	movie,
	onScreeningSelect,
}: MovieCardProps) {
	const [screenings, setScreenings] = useState<Screening[]>([])
	const [isLoading, setIsLoading] = useState(false)

	useEffect(() => {
		const loadScreenings = async () => {
			setIsLoading(true)
			try {
				const API_URL =
					process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'
				const response = await fetch(
					`${API_URL}/screenings?movieId=${movie.id}`,
					{
						credentials: 'include',
					}
				)
				if (response.ok) {
					const data = await response.json()
					setScreenings(data.slice(0, 3)) // Mostrar solo las primeras 3 funciones
				}
			} catch (error) {
				console.error('Error loading screenings:', error)
			} finally {
				setIsLoading(false)
			}
		}

		loadScreenings()
	}, [movie.id])

	return (
		<div
			className='flex items-start gap-6 w-full  min-h-72 p-4 rounded-3xl overflow-hidden'
			style={{
				// Estilo para el contenedor principal
				boxShadow:
					'inset -6px -6px 20px var(--color-brand-50), inset 6px 6px 20px var(--color-brand-800)',
			}}
		>
			{/* Movie Card */}
			<div
				className=' w-sm flex transition-all duration-300 bg-brand-100 rounded-3xl overflow-hidden'
				style={{
					boxShadow:
						'-6px -6px 20px -5px var(--color-brand-50), 6px 6px 20px -10px var(--color-brand-700)',
				}}
			>
				<div
					className='aspect-[2/3] w-5/12 relative overflow-hidden bg-brand-200 m-4 rounded-2xl'
					style={{
						boxShadow:
							'inset 6px 6px 20px -10px var(--color-brand-700), inset -6px -6px 20px var(--color-brand-50)',
					}}
				>
					{movie.photo ? (
						<Image
							src={movie.photo}
							alt={movie.name}
							fill
							className='object-cover'
						/>
					) : (
						<div className='flex items-center justify-center h-full'>
							<Film className='h-16 w-16 text-brand-dark-600/50' />
						</div>
					)}
				</div>
				<Card className='bg-transparent shadow-none border-0 px-0 flex-1 pr-4'>
					<CardHeader className='h-5 p-0'>
						<CardTitle className='text-xl text-brand-dark-800'>
							{movie.name}
						</CardTitle>
					</CardHeader>

					<CardContent className='w-full px-0 h-full flex flex-col justify-between'>
						<p className='flex flex-col gap-2 text-sm text-brand-dark-600 line-clamp-3 h-full pb-4'>
							Sinopsis:
							<span
								className='p-3 h-full rounded-lg'
								style={{
									boxShadow:
										'inset -3px -3px 10px var(--color-brand-50), inset 3px 3px 10px -5px var(--color-brand-700)',
								}}
							>
								{movie.synopsis}
							</span>
						</p>
						<div className='flex gap-2.5'>
							{movie.classification && (
								<div
									className='px-3 py-1 rounded-full text-xs bg-brand-100 text-brand-dark-700'
									style={{
										boxShadow:
											'inset -3px -3px 10px var(--color-brand-50), inset 3px 3px 10px -5px var(--color-brand-700)',
									}}
								>
									{movie.classification}
								</div>
							)}
							<div
								className='px-3 py-1 flex rounded-full w-fit text-xs bg-brand-100 text-brand-dark-700'
								style={{
									boxShadow:
										'inset -3px -3px 10px var(--color-brand-50), inset 3px 3px 10px -5px var(--color-brand-700)',
								}}
							>
								<Clock className='h-4 w-4 mr-1' />
								{movie.duration} min
							</div>
						</div>
					</CardContent>
				</Card>
			</div>

			<div
				className='w-4 h-full min-h-60 rounded-full my-auto'
				style={{
					boxShadow:
						'inset -3px -3px 10px var(--color-brand-50), inset 3px 3px 10px var(--color-brand-800)',
				}}
			/>

			{/* Screenings Panel */}
			<div className='flex-1  rounded-3xl p-6'>
				<h3 className='text-lg font-bold text-brand-dark-800 mb-4 flex items-center'>
					<Calendar className='h-5 w-5 mr-2' />
					Funciones Disponibles
				</h3>

				{isLoading ? (
					<div
						className='p-4 rounded-2xl bg-brand-100 text-center'
						style={{
							boxShadow:
								'inset -4px -4px 12px var(--color-brand-50), inset 4px 4px 12px -6px var(--color-brand-700)',
						}}
					>
						<p className='text-brand-dark-600'>Cargando...</p>
					</div>
				) : screenings.length > 0 ? (
					<div className='space-y-3 w-36'>
						{screenings.map((screening) => (
							<Button
								key={screening.id}
								onClick={() => onScreeningSelect(screening)}
								className='w-full p-4 h-auto rounded-2xl cursor-pointer bg-transparent border-none text-left hover:bg-brand-200 transition-all duration-200'
								style={{
									boxShadow: `-4px -4px 12px var(--color-brand-50), 4px 4px 12px -6px var(--color-brand-600),
										inset -4px -4px 12px var(--color-brand-50), inset 4px 4px 12px var(--color-brand-600)
										`,
								}}
							>
								<div className='flex flex-col gap-2'>
									<div className='flex items-center justify-between'>
										<span className='font-semibold text-brand-dark-800'>
											{new Date(
												screening.datetime
											).toLocaleDateString('es-ES', {
												weekday: 'short',
												day: 'numeric',
												month: 'short',
											})}
										</span>
										<span className='text-blue-600 font-bold'>
											{new Date(
												screening.datetime
											).toLocaleTimeString('es-ES', {
												hour: '2-digit',
												minute: '2-digit',
											})}
										</span>
									</div>
									{screening.roomScreenings &&
										screening.roomScreenings.length > 0 && (
											<div className='flex items-center text-xs text-brand-dark-600'>
												<MapPin className='h-3 w-3 mr-1' />
												{screening.roomScreenings
													.map((rs) => rs.room.name)
													.join(', ')}
											</div>
										)}
								</div>
							</Button>
						))}
						{screenings.length === 3 && (
							<p className='text-xs text-brand-dark-600 text-center mt-2'>
								Mostrando primeras 3 funciones
							</p>
						)}
					</div>
				) : (
					<div
						className='p-4 rounded-2xl bg-brand-100 text-center'
						style={{
							boxShadow:
								'inset -4px -4px 12px var(--color-brand-50), inset 4px 4px 12px -6px var(--color-brand-700)',
						}}
					>
						<p className='text-brand-dark-600'>
							No hay funciones disponibles
						</p>
					</div>
				)}
			</div>
		</div>
	)
}
