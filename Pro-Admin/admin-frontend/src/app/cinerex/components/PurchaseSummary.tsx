import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface Movie {
	name: string
}

interface Screening {
	datetime: string
}

interface Seat {
	row: string
	code: string
}

interface PurchaseSummaryProps {
	movie?: Movie
	screening?: Screening
	seats: Seat[]
	pricePerTicket?: number
}

export default function PurchaseSummary({
	movie,
	screening,
	seats,
	pricePerTicket = 12,
}: PurchaseSummaryProps) {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Resumen de Compra</CardTitle>
			</CardHeader>
			<CardContent className='space-y-4'>
				{movie && (
					<div>
						<p className='font-semibold'>{movie.name}</p>
						{screening && (
							<p className='text-gray-600'>
								{new Date(screening.datetime).toLocaleString(
									'es-ES'
								)}
							</p>
						)}
					</div>
				)}
				<div>
					<p className='font-semibold'>Asientos:</p>
					<p className='text-gray-600'>
						{seats.map((s) => `${s.row}${s.code}`).join(', ')}
					</p>
				</div>
				<div>
					<p className='font-semibold'>
						Total: ${seats.length * pricePerTicket}.00
					</p>
				</div>
			</CardContent>
		</Card>
	)
}
