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
		<Card>
			<CardHeader>
				<CardTitle>Datos del Cliente</CardTitle>
			</CardHeader>
			<CardContent className='space-y-4'>
				<div>
					<Label htmlFor='name'>Nombre Completo</Label>
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
					/>
				</div>
				<div>
					<Label htmlFor='email'>Email</Label>
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
					/>
				</div>
				<Button
					className='w-full'
					onClick={onPurchase}
					disabled={
						!customerInfo.name || !customerInfo.email || isLoading
					}
				>
					{isLoading ? 'Procesando...' : 'Comprar Boletos'}
				</Button>
			</CardContent>
		</Card>
	)
}
