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
		<div className='flex w-fit items-center gap-6'>
			{showBack && onBack && (
				<Button
					variant='ghost'
					onClick={onBack}
					className='border-none bg-transparent text-brand-dark-700 hover:bg-brand-200 px-6 py-3'
					style={{
						boxShadow:
							'-6px -6px 20px var(--color-brand-50), 6px 6px 20px -10px var(--color-brand-700)',
					}}
				>
					<ArrowLeft className='h-4 w-4 mr-2' />
					Volver
				</Button>
			)}
			<div
				className='flex-1 p-6 rounded-md bg-brand-100'
				style={{
					boxShadow: ` -6px -6px 20px var(--color-brand-50),  6px 6px 20px -10px var(--color-brand-700),
						inset -4px -4px 12px var(--color-brand-50), inset 4px 4px 12px -6px var(--color-brand-700)`,
				}}
			>
				<h2 className='text-3xl font-bold text-brand-dark-800'>
					{title}
				</h2>
				{subtitle && (
					<p className='text-brand-dark-600 mt-2'>{subtitle}</p>
				)}
			</div>
		</div>
	)
}
