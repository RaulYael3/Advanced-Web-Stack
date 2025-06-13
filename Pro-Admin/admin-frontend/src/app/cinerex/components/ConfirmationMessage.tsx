import { Button } from '@/components/ui/button'
import { CheckCircle } from 'lucide-react'

interface ConfirmationMessageProps {
	email: string
	onReset: () => void
}

export default function ConfirmationMessage({
	email,
	onReset,
}: ConfirmationMessageProps) {
	return (
		<div
			className='text-center space-y-8 p-12 bg-brand-100 rounded-3xl'
			style={{
				boxShadow:
					'-6px -6px 20px var(--color-brand-50), 6px 6px 20px -10px var(--color-brand-700)',
			}}
		>
			<div className='flex justify-center'>
				<div
					className='p-6 rounded-full bg-brand-100'
					style={{
						boxShadow:
							'inset -8px -8px 24px var(--color-brand-50), inset 8px 8px 24px -12px var(--color-brand-700)',
					}}
				>
					<CheckCircle className='h-24 w-24 text-green-600' />
				</div>
			</div>
			<h2 className='text-4xl font-bold text-brand-dark-800'>
				¡Compra Exitosa!
			</h2>
			<p className='text-brand-dark-600 text-lg'>
				Tus boletos han sido enviados a {email}
			</p>
			<Button
				onClick={onReset}
				className='border-none bg-transparent text-brand-dark-700 hover:bg-brand-200 px-8 py-4 rounded-2xl font-bold text-lg'
				style={{
					boxShadow:
						'-6px -6px 20px var(--color-brand-50), 6px 6px 20px -10px var(--color-brand-700)',
				}}
			>
				Comprar Más Boletos
			</Button>
		</div>
	)
}
