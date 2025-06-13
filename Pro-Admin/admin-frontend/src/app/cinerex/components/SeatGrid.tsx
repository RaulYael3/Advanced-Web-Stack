interface Seat {
	id: number
	code: string
	row: string
	isOccupied?: boolean
}

interface SeatGridProps {
	seats: Seat[]
	selectedSeats: Seat[]
	onSeatClick: (seat: Seat) => void
}

export default function SeatGrid({
	seats,
	selectedSeats,
	onSeatClick,
}: SeatGridProps) {
	return (
		<div
			className='bg-brand-100 rounded-3xl p-8'
			style={{
				boxShadow:
					'-6px -6px 20px var(--color-brand-50), 6px 6px 20px -10px var(--color-brand-700)',
			}}
		>
			<div className='text-center mb-8'>
				<div
					className='bg-brand-100 text-brand-dark-800 py-4 px-8 rounded-2xl inline-block font-bold text-lg'
					style={{
						boxShadow:
							'inset 6px 6px 20px -10px var(--color-brand-700), inset -6px -6px 20px var(--color-brand-50)',
					}}
				>
					🎬 PANTALLA
				</div>
			</div>

			<div
				className='grid gap-3 justify-center'
				style={{
					gridTemplateColumns: 'repeat(auto-fit, minmax(48px, 1fr))',
				}}
			>
				{seats.map((seat) => (
					<button
						key={seat.id}
						onClick={() => onSeatClick(seat)}
						disabled={seat.isOccupied}
						className={`
              w-12 h-12 rounded-xl text-xs font-bold transition-all duration-200 border-none
              ${
					seat.isOccupied
						? 'bg-red-200 text-red-800 cursor-not-allowed'
						: selectedSeats.some((s) => s.id === seat.id)
						? 'bg-blue-500 text-white'
						: 'bg-brand-100 text-brand-dark-700 hover:bg-brand-200'
				}
            `}
						style={
							!seat.isOccupied &&
							!selectedSeats.some((s) => s.id === seat.id)
								? {
										boxShadow:
											'-4px -4px 12px var(--color-brand-50), 4px 4px 12px -6px var(--color-brand-700)',
								  }
								: selectedSeats.some((s) => s.id === seat.id)
								? {
										boxShadow:
											'inset -4px -4px 12px rgba(0,0,0,0.2), inset 4px 4px 12px rgba(255,255,255,0.1)',
								  }
								: {}
						}
					>
						{seat.row}
						{seat.code}
					</button>
				))}
			</div>

			<div className='flex justify-center gap-8 mt-8 text-sm'>
				<div className='flex items-center'>
					<div
						className='w-6 h-6 bg-brand-100 rounded-lg mr-3'
						style={{
							boxShadow:
								'-2px -2px 8px var(--color-brand-50), 2px 2px 8px -4px var(--color-brand-700)',
						}}
					></div>
					<span className='text-brand-dark-700'>Disponible</span>
				</div>
				<div className='flex items-center'>
					<div className='w-6 h-6 bg-blue-500 rounded-lg mr-3'></div>
					<span className='text-brand-dark-700'>Seleccionado</span>
				</div>
				<div className='flex items-center'>
					<div className='w-6 h-6 bg-red-200 rounded-lg mr-3'></div>
					<span className='text-brand-dark-700'>Ocupado</span>
				</div>
			</div>
		</div>
	)
}
