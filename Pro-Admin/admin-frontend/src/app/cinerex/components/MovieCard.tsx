import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Film, Clock } from 'lucide-react'
import Image from 'next/image'

interface Movie {
	id: number
	name: string
	duration: number
	photo?: string
	synopsis?: string
	classification?: string
	genre?: string
}

interface MovieCardProps {
	movie: Movie
	onClick: () => void
}

export default function MovieCard({ movie, onClick }: MovieCardProps) {
	return (
		<div
			className='cursor-pointer transition-all duration-300 hover:scale-105 bg-brand-100 rounded-3xl overflow-hidden'
			style={{
				boxShadow:
					'-6px -6px 20px var(--color-brand-50), 6px 6px 20px -10px var(--color-brand-700)',
			}}
			onClick={onClick}
		>
			<div
				className='aspect-[2/3] relative overflow-hidden bg-brand-200 m-4 rounded-2xl'
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
			<CardHeader>
				<CardTitle className='text-lg text-brand-dark-800'>
					{movie.name}
				</CardTitle>
				<div className='flex items-center gap-4 text-sm text-brand-dark-600'>
					<div className='flex items-center'>
						<Clock className='h-4 w-4 mr-1' />
						{movie.duration} min
					</div>
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
				</div>
			</CardHeader>
			{movie.synopsis && (
				<CardContent>
					<p className='text-sm text-brand-dark-600 line-clamp-3'>
						{movie.synopsis}
					</p>
				</CardContent>
			)}
		</div>
	)
}
