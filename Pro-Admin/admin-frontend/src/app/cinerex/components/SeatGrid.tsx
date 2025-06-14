interface IndividualSeat {
	id: number
	seatNumber: number
	row: string
	isOccupied: boolean
}

interface SeatGridProps {
	seats: IndividualSeat[]
	selectedSeats: IndividualSeat[]
	onSeatClick: (seat: IndividualSeat) => void
}

export default function SeatGrid({
	seats,
	selectedSeats,
	onSeatClick,
}: SeatGridProps) {
	// Verificar si hay asientos
	if (!seats || seats.length === 0) {
		return (
			<div
				className='bg-brand-100 rounded-3xl p-8 text-center'
				style={{
					boxShadow:
						'-6px -6px 20px var(--color-brand-50), 6px 6px 20px -10px var(--color-brand-700)',
				}}
			>
				<p className='text-brand-dark-800 font-medium'>
					No hay asientos disponibles en esta función.
				</p>
			</div>
		)
	}

	// Organizar asientos por fila (ya vienen como asientos individuales)
	const seatsByRow = seats.reduce((acc, seat) => {
		if (!acc[seat.row]) {
			acc[seat.row] = []
		}
		acc[seat.row].push(seat)
		return acc
	}, {} as Record<string, IndividualSeat[]>)

	// Ordenar filas alfabéticamente
	const sortedRows = Object.keys(seatsByRow).sort()

	// Ordenar asientos por número dentro de cada fila
	sortedRows.forEach((row) => {
		seatsByRow[row].sort((a, b) => a.seatNumber - b.seatNumber)
	})

	return (
		<div
			className='bg-brand-100 rounded-3xl p-8'
			style={{
				boxShadow:
					'-6px -6px 20px var(--color-brand-50), 6px 6px 20px -10px var(--color-brand-700)',
			}}
		>
			{/* Pantalla */}
			<div className='text-center mb-12'>
				<div
					className='bg-brand-100 text-brand-dark-800 py-4 px-12 rounded-2xl inline-block font-bold text-lg'
					style={{
						boxShadow:
							'inset 6px 6px 20px -10px var(--color-brand-700), inset -6px -6px 20px var(--color-brand-50)',
					}}
				>
					🎬 PANTALLA
				</div>
			</div>

			{/* Grilla de asientos por filas */}
			<div className='space-y-4 max-w-4xl mx-auto'>
				{sortedRows.length > 0 ? (
					sortedRows.map((row) => (
						<div
							key={row}
							className='flex items-center justify-center gap-2'
						>
							{/* Debug info por fila */}
							<span className='text-xs text-gray-500 mr-2'>
								{seatsByRow[row]?.length || 0} asientos
							</span>

							{/* Etiqueta de fila */}
							<div
								className='w-8 h-8 flex items-center justify-center rounded-lg bg-brand-100 text-brand-dark-800 font-bold text-sm mr-4'
								style={{
									boxShadow:
										'inset -3px -3px 8px var(--color-brand-50), inset 3px 3px 8px -4px var(--color-brand-700)',
								}}
							>
								{row}
							</div>

							{/* Asientos de la fila */}
							<div className='flex gap-2 flex-wrap justify-center'>
								{seatsByRow[row]?.map((seat) => {
									const isSelected = selectedSeats.some(
										(s) => s.id === seat.id
									)
									const isOccupied = seat.isOccupied

									return (
										<button
											key={`${seat.row}-${seat.seatNumber}-${seat.id}`}
											onClick={() => {
												console.log(
													'Clicked seat:',
													seat
												)
												!isOccupied && onSeatClick(seat)
											}}
											disabled={isOccupied}
											className={`
												w-10 h-10 rounded-lg text-xs font-bold transition-all duration-200 border-none
												${
													isOccupied
														? 'bg-red-400 text-red-100 cursor-not-allowed'
														: isSelected
														? 'bg-blue-500 text-white'
														: 'bg-brand-100 text-brand-dark-700 hover:bg-brand-200'
												}
											`}
											style={
												!isOccupied && !isSelected
													? {
															boxShadow:
																'-3px -3px 8px var(--color-brand-50), 3px 3px 8px -4px var(--color-brand-700)',
													  }
													: isSelected
													? {
															boxShadow:
																'inset -3px -3px 8px rgba(0,0,0,0.3), inset 3px 3px 8px rgba(255,255,255,0.1)',
													  }
													: isOccupied
													? {
															boxShadow:
																'inset -2px -2px 6px rgba(220,38,38,0.3), inset 2px 2px 6px rgba(0,0,0,0.2)',
													  }
													: {}
											}
										>
											{seat.seatNumber}
										</button>
									)
								}) || (
									<span className='text-red-500'>
										No seats in this row
									</span>
								)}
							</div>

							{/* Etiqueta de fila derecha */}
							<div
								className='w-8 h-8 flex items-center justify-center rounded-lg bg-brand-100 text-brand-dark-800 font-bold text-sm ml-4'
								style={{
									boxShadow:
										'inset -3px -3px 8px var(--color-brand-50), inset 3px 3px 8px -4px var(--color-brand-700)',
								}}
							>
								{row}
							</div>
						</div>
					))
				) : (
					<div className='text-center text-brand-dark-600'>
						<p>No se pudieron organizar los asientos por filas</p>
						<p className='text-xs mt-2'>
							Datos raw: {JSON.stringify(seats.slice(0, 3))}
						</p>
					</div>
				)}
			</div>

			{/* Leyenda */}
			<div className='flex justify-center gap-8 mt-12 text-sm'>
				<div className='flex items-center'>
					<div
						className='w-6 h-6 bg-brand-100 rounded-lg mr-3'
						style={{
							boxShadow:
								'-2px -2px 6px var(--color-brand-50), 2px 2px 6px -3px var(--color-brand-700)',
						}}
					></div>
					<span className='text-brand-dark-700 font-medium'>
						Disponible
					</span>
				</div>
				<div className='flex items-center'>
					<div
						className='w-6 h-6 bg-blue-500 rounded-lg mr-3'
						style={{
							boxShadow: 'inset -2px -2px 6px rgba(0,0,0,0.3)',
						}}
					></div>
					<span className='text-brand-dark-700 font-medium'>
						Seleccionado
					</span>
				</div>
				<div className='flex items-center'>
					<div
						className='w-6 h-6 bg-red-400 rounded-lg mr-3'
						style={{
							boxShadow:
								'inset -2px -2px 6px rgba(220,38,38,0.3)',
						}}
					></div>
					<span className='text-brand-dark-700 font-medium'>
						Ocupado
					</span>
				</div>
			</div>

			{/* Información de selección */}
			{selectedSeats.length > 0 && (
				<div
					className='mt-8 text-center p-4 rounded-2xl bg-brand-100'
					style={{
						boxShadow:
							'inset -4px -4px 12px var(--color-brand-50), inset 4px 4px 12px -6px var(--color-brand-700)',
					}}
				>
					<p className='text-brand-dark-800 font-medium'>
						Asientos seleccionados:{' '}
						{selectedSeats
							.map((s) => `${s.row}${s.seatNumber}`)
							.join(', ')}
					</p>
				</div>
			)}
		</div>
	)
}
