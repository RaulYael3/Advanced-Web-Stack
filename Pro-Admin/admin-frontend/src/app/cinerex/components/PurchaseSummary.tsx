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
		<div
			className='bg-brand-100 rounded-3xl p-6'
			style={{
				boxShadow:
					'-6px -6px 20px var(--color-brand-50), 6px 6px 20px -10px var(--color-brand-700)',
			}}
		>
			<CardHeader className='p-0 pb-6'>
				<CardTitle className='text-brand-dark-800 text-xl'>
					Resumen de Compra
				</CardTitle>
			</CardHeader>
			<CardContent className='p-0 space-y-6'>
				{movie && (
					<div
						className='p-4 rounded-2xl bg-brand-100'
						style={{
							boxShadow:
								'inset -4px -4px 12px var(--color-brand-50), inset 4px 4px 12px -6px var(--color-brand-700)',
						}}
					>
						<p className='font-semibold text-brand-dark-800'>
							{movie.name}
						</p>
						{screening && (
							<p className='text-brand-dark-600 mt-1'>
								{new Date(screening.datetime).toLocaleString(
									'es-ES'
								)}
							</p>
						)}
					</div>
				)}

				<div
					className='p-4 rounded-2xl bg-brand-100'
					style={{
						boxShadow:
							'inset -4px -4px 12px var(--color-brand-50), inset 4px 4px 12px -6px var(--color-brand-700)',
					}}
				>
					<p className='font-semibold text-brand-dark-800'>
						Asientos:
					</p>
					<p className='text-brand-dark-600 mt-1'>
						{seats.map((s) => `${s.row}${s.code}`).join(', ')}
					</p>
				</div>

				<div
					className='p-4 rounded-2xl bg-brand-100'
					style={{
						boxShadow:
							'inset -4px -4px 12px var(--color-brand-50), inset 4px 4px 12px -6px var(--color-brand-700)',
					}}
				>
					<p className='font-bold text-xl text-brand-dark-800'>
						Total: ${seats.length * pricePerTicket}.00
					</p>
				</div>
			</CardContent>
		</div>
	)
}
