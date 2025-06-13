import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import { Calendar, MapPin } from 'lucide-react'

interface Screening {
	id: number
	datetime: string
	roomScreenings?: {
		room: {
			name: string
		}
	}[]
}

interface ScreeningCardProps {
	screening: Screening
	onClick: () => void
}

export default function ScreeningCard({
	screening,
	onClick,
}: ScreeningCardProps) {
	return (
		<Card
			className='cursor-pointer hover:shadow-lg transition-shadow'
			onClick={onClick}
		>
			<CardHeader>
				<div className='flex items-center justify-between'>
					<div className='flex items-center'>
						<Calendar className='h-5 w-5 mr-2 text-blue-600' />
						<div>
							<CardTitle className='text-lg'>
								{new Date(
									screening.datetime
								).toLocaleDateString('es-ES', {
									weekday: 'long',
									month: 'long',
									day: 'numeric',
								})}
							</CardTitle>
							<p className='text-lg font-semibold text-blue-600'>
								{new Date(
									screening.datetime
								).toLocaleTimeString('es-ES', {
									hour: '2-digit',
									minute: '2-digit',
								})}
							</p>
						</div>
					</div>
				</div>
				{screening.roomScreenings && (
					<div className='flex items-center text-gray-600'>
						<MapPin className='h-4 w-4 mr-1' />
						{screening.roomScreenings
							.map((rs) => rs.room.name)
							.join(', ')}
					</div>
				)}
			</CardHeader>
		</Card>
	)
}
