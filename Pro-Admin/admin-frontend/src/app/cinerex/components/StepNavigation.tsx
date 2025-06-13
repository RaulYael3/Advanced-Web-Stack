import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'

interface StepNavigationProps {
	title: string
	subtitle?: string
	onBack?: () => void
	showBack?: boolean
}

export default function StepNavigation({
	title,
	subtitle,
	onBack,
	showBack = true,
}: StepNavigationProps) {
	return (
		<div className='flex items-center gap-4'>
			{showBack && onBack && (
				<Button variant='ghost' onClick={onBack}>
					<ArrowLeft className='h-4 w-4 mr-2' />
					Volver
				</Button>
			)}
			<div>
				<h2 className='text-3xl font-bold text-gray-900'>{title}</h2>
				{subtitle && <p className='text-gray-600'>{subtitle}</p>}
			</div>
		</div>
	)
}
