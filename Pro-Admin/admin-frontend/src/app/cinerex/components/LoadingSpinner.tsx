interface LoadingSpinnerProps {
	message?: string
}

export default function LoadingSpinner({
	message = 'Cargando...',
}: LoadingSpinnerProps) {
	return (
		<div className='flex items-center justify-center h-64'>
			<div
				className='text-center p-8 rounded-3xl bg-brand-100'
				style={{
					boxShadow:
						'-6px -6px 20px var(--color-brand-50), 6px 6px 20px -10px var(--color-brand-700)',
				}}
			>
				<div
					className='w-16 h-16 mx-auto mb-4 rounded-full bg-brand-100 animate-pulse'
					style={{
						boxShadow:
							'inset -6px -6px 15px var(--color-brand-50), inset 6px 6px 15px -8px var(--color-brand-700)',
					}}
				></div>
				<p className='text-brand-dark-600 font-medium'>{message}</p>
			</div>
		</div>
	)
}
