'use client'

import { useState } from 'react'

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
	const [errors, setErrors] = useState<{ name?: string; email?: string }>({})

	const validateForm = () => {
		const newErrors: { name?: string; email?: string } = {}

		if (!customerInfo.name.trim()) {
			newErrors.name = 'El nombre es requerido'
		}

		if (!customerInfo.email.trim()) {
			newErrors.email = 'El email es requerido'
		} else if (!/\S+@\S+\.\S+/.test(customerInfo.email)) {
			newErrors.email = 'Email inválido'
		}

		setErrors(newErrors)
		return Object.keys(newErrors).length === 0
	}

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		if (validateForm()) {
			onPurchase()
		}
	}

	return (
		<div
			className='bg-brand-100 rounded-3xl p-6'
			style={{
				boxShadow:
					'-6px -6px 20px var(--color-brand-50), 6px 6px 20px -10px var(--color-brand-700)',
			}}
		>
			<h3 className='text-xl font-semibold text-brand-dark-800 mb-6'>
				Información del Cliente
			</h3>

			<form onSubmit={handleSubmit} className='space-y-4'>
				<div>
					<label className='block text-sm font-medium text-brand-dark-700 mb-2'>
						Nombre Completo
					</label>
					<input
						type='text'
						value={customerInfo.name}
						onChange={(e) =>
							onCustomerInfoChange({
								...customerInfo,
								name: e.target.value,
							})
						}
						className='w-full p-3 border-none bg-transparent text-brand-dark-700 rounded-xl'
						style={{
							boxShadow:
								'inset 4px 4px 12px -6px var(--color-brand-700), inset -4px -4px 12px var(--color-brand-50)',
						}}
						placeholder='Tu nombre completo'
						disabled={isLoading}
					/>
					{errors.name && (
						<p className='text-red-500 text-xs mt-1'>
							{errors.name}
						</p>
					)}
				</div>

				<div>
					<label className='block text-sm font-medium text-brand-dark-700 mb-2'>
						Email
					</label>
					<input
						type='email'
						value={customerInfo.email}
						onChange={(e) =>
							onCustomerInfoChange({
								...customerInfo,
								email: e.target.value,
							})
						}
						className='w-full p-3 border-none bg-transparent text-brand-dark-700 rounded-xl'
						style={{
							boxShadow:
								'inset 4px 4px 12px -6px var(--color-brand-700), inset -4px -4px 12px var(--color-brand-50)',
						}}
						placeholder='tu@email.com'
						disabled={isLoading}
					/>
					{errors.email && (
						<p className='text-red-500 text-xs mt-1'>
							{errors.email}
						</p>
					)}
				</div>

				<button
					type='submit'
					disabled={isLoading}
					className='w-full py-4 mt-8 border-none bg-transparent text-brand-dark-700 hover:bg-brand-200 rounded-2xl font-semibold transition-colors disabled:opacity-50'
					style={{
						boxShadow:
							'-6px -6px 20px var(--color-brand-50), 6px 6px 20px -10px var(--color-brand-700)',
					}}
				>
					{isLoading ? 'Procesando...' : 'Comprar Boletos'}
				</button>
			</form>
		</div>
	)
}
