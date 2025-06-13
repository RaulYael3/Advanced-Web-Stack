interface LoadingSpinnerProps {
	message?: string
}

export default function LoadingSpinner({
	message = 'Cargando...',
}: LoadingSpinnerProps) {
	return (
		<div className='flex items-center justify-center h-64'>
			<p className='text-gray-500'>{message}</p>
		</div>
	)
}
