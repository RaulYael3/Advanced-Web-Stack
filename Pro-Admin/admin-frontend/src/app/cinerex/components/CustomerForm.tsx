'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface CustomerInfo {
	name: string
	email: string
}

interface CustomerFormProps {
	customerInfo: CustomerInfo
	onCustomerInfoChange: (info: CustomerInfo) => void
	onPurchase: () => void
	isLoading: boolean
}

export default function CustomerForm({
	customerInfo,
	onCustomerInfoChange,
	onPurchase,
	isLoading,
}: CustomerFormProps) {
	return (
		<div
			className='bg-brand-100 rounded-3xl p-6'
			style={{
				boxShadow:
					'-6px -6px 20px var(--color-brand-50), 6px 6px 20px -10px var(--color-brand-700)',
			}}
		>
			<CardHeader className='p-0 pb-6'>
				<CardTitle className='text-brand-dark-800 text-xl'>
					Datos del Cliente
				</CardTitle>
			</CardHeader>
			<CardContent className='p-0 space-y-6'>
				<div>
					<Label
						htmlFor='name'
						className='text-brand-dark-700 font-medium mb-2 block'
					>
						Nombre Completo
					</Label>
					<Input
						id='name'
						value={customerInfo.name}
						onChange={(e) =>
							onCustomerInfoChange({
								...customerInfo,
								name: e.target.value,
							})
						}
						placeholder='Tu nombre completo'
						className='border-none bg-transparent text-brand-dark-700 p-4 rounded-2xl'
						style={{
							boxShadow:
								'inset 6px 6px 20px -15px var(--color-brand-700), inset -6px -6px 20px var(--color-brand-50)',
						}}
					/>
				</div>
				<div>
					<Label
						htmlFor='email'
						className='text-brand-dark-700 font-medium mb-2 block'
					>
						Email
					</Label>
					<Input
						id='email'
						type='email'
						value={customerInfo.email}
						onChange={(e) =>
							onCustomerInfoChange({
								...customerInfo,
								email: e.target.value,
							})
						}
						placeholder='tu@email.com'
						className='border-none bg-transparent text-brand-dark-700 p-4 rounded-2xl'
						style={{
							boxShadow:
								'inset 6px 6px 20px -15px var(--color-brand-700), inset -6px -6px 20px var(--color-brand-50)',
						}}
					/>
				</div>
				<Button
					className='w-full border-none bg-transparent text-brand-dark-700 hover:bg-brand-200 py-4 rounded-2xl font-bold text-lg'
					onClick={onPurchase}
					disabled={
						!customerInfo.name || !customerInfo.email || isLoading
					}
					style={{
						boxShadow:
							'-6px -6px 20px var(--color-brand-50), 6px 6px 20px -10px var(--color-brand-700)',
					}}
				>
					{isLoading ? 'Procesando...' : 'Comprar Boletos'}
				</Button>
			</CardContent>
		</div>
	)
}
