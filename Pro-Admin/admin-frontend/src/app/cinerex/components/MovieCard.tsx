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
		<Card
			className='cursor-pointer hover:shadow-lg transition-shadow'
			onClick={onClick}
		>
			<div className='aspect-[2/3] relative overflow-hidden rounded-t-lg bg-gray-200'>
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
			</div>
			<CardHeader>
				<CardTitle className='text-lg'>{movie.name}</CardTitle>
				<div className='flex items-center gap-4 text-sm text-gray-600'>
					<div className='flex items-center'>
						<Clock className='h-4 w-4 mr-1' />
						{movie.duration} min
					</div>
					{movie.classification && (
						<Badge variant='secondary'>
							{movie.classification}
						</Badge>
					)}
				</div>
			</CardHeader>
			{movie.synopsis && (
				<CardContent>
					<p className='text-sm text-gray-600 line-clamp-3'>
						{movie.synopsis}
					</p>
				</CardContent>
			)}
		</Card>
	)
}
