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
		<div className='bg-white rounded-lg p-6'>
			<div className='text-center mb-6'>
				<div className='bg-gray-800 text-white py-2 px-4 rounded-lg inline-block'>
					🎬 PANTALLA
				</div>
			</div>

			<div
				className='grid gap-2'
				style={{
					gridTemplateColumns: 'repeat(auto-fit, minmax(40px, 1fr))',
				}}
			>
				{seats.map((seat) => (
					<button
						key={seat.id}
						onClick={() => onSeatClick(seat)}
						disabled={seat.isOccupied}
						className={`
              w-10 h-10 rounded-md text-xs font-medium transition-colors
              ${
					seat.isOccupied
						? 'bg-red-200 text-red-800 cursor-not-allowed'
						: selectedSeats.some((s) => s.id === seat.id)
						? 'bg-blue-600 text-white'
						: 'bg-gray-200 hover:bg-gray-300 text-gray-800'
				}
            `}
					>
						{seat.row}
						{seat.code}
					</button>
				))}
			</div>

			<div className='flex justify-center gap-6 mt-6 text-sm'>
				<div className='flex items-center'>
					<div className='w-4 h-4 bg-gray-200 rounded mr-2'></div>
					Disponible
				</div>
				<div className='flex items-center'>
					<div className='w-4 h-4 bg-blue-600 rounded mr-2'></div>
					Seleccionado
				</div>
				<div className='flex items-center'>
					<div className='w-4 h-4 bg-red-200 rounded mr-2'></div>
					Ocupado
				</div>
			</div>
		</div>
	)
}
