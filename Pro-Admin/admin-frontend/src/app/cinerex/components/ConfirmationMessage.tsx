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
		<div className='text-center space-y-6'>
			<div className='flex justify-center'>
				<CheckCircle className='h-24 w-24 text-green-600' />
			</div>
			<h2 className='text-3xl font-bold text-gray-900'>
				¡Compra Exitosa!
			</h2>
			<p className='text-gray-600'>
				Tus boletos han sido enviados a {email}
			</p>
			<Button onClick={onReset}>Comprar Más Boletos</Button>
		</div>
	)
}
