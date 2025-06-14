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
			className='bg-brand-100 rounded-3xl p-8 text-center max-w-2xl mx-auto'
			style={{
				boxShadow:
					'-6px -6px 20px var(--color-brand-50), 6px 6px 20px -10px var(--color-brand-700)',
			}}
		>
			<div className='mb-8'>
				<div className='text-6xl mb-4'>🎉</div>
				<h1 className='text-3xl font-bold text-brand-dark-800 mb-4'>
					¡Compra Exitosa!
				</h1>
				<p className='text-lg text-brand-dark-600 mb-2'>
					Tus boletos han sido comprados exitosamente
				</p>
				<p className='text-sm text-brand-dark-500'>
					Hemos enviado la confirmación a: <strong>{email}</strong>
				</p>
			</div>

			<div
				className='bg-brand-100 rounded-2xl p-6 mb-8'
				style={{
					boxShadow:
						'inset -4px -4px 12px var(--color-brand-50), inset 4px 4px 12px -6px var(--color-brand-700)',
				}}
			>
				<h3 className='text-lg font-semibold text-brand-dark-800 mb-4'>
					Detalles de la Compra
				</h3>
				<div className='space-y-2 text-sm text-brand-dark-600'>
					<p>📧 Los boletos han sido enviados a tu email</p>
					<p>🎬 Presenta tu confirmación en el cine</p>
					<p>⏰ Llega 15 minutos antes de la función</p>
				</div>
			</div>

			<Button
				onClick={onReset}
				className='px-8 py-3 border-none bg-transparent text-brand-dark-700 hover:bg-brand-200 rounded-2xl font-medium transition-colors'
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
