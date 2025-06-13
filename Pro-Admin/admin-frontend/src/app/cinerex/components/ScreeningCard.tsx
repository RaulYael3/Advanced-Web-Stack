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
		<div
			className='cursor-pointer transition-all duration-300 hover:scale-105 bg-brand-100 rounded-3xl p-6'
			style={{
				boxShadow:
					'-6px -6px 20px var(--color-brand-50), 6px 6px 20px -10px var(--color-brand-700)',
			}}
			onClick={onClick}
		>
			<CardHeader className='p-0'>
				<div className='flex items-center justify-between'>
					<div className='flex items-center'>
						<div
							className='p-3 rounded-2xl bg-brand-100 mr-4'
							style={{
								boxShadow:
									'inset -6px -6px 15px var(--color-brand-50), inset 6px 6px 15px -8px var(--color-brand-700)',
							}}
						>
							<Calendar className='h-6 w-6 text-blue-600' />
						</div>
						<div>
							<CardTitle className='text-lg text-brand-dark-800'>
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
					<div className='flex items-center text-brand-dark-600 mt-4'>
						<MapPin className='h-4 w-4 mr-2' />
						{screening.roomScreenings
							.map((rs) => rs.room.name)
							.join(', ')}
					</div>
				)}
			</CardHeader>
		</div>
	)
}
