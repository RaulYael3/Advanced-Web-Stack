'use client'
import { Provider } from '@/entities'
import { Select, SelectItem } from '@heroui/react'
export default function SelectProvider({
	providers,
	defaultProvider,
}: {
	providers: Provider[]
	defaultProvider?: string
}) {
	return (
		<Select
			defaultSelectedKeys={
				defaultProvider ? [defaultProvider] : undefined
			}
			label='Proveedor'
			name='provider'
		>
			{providers.length > 0 &&
				providers?.map((provider) => {
					return (
						<SelectItem key={provider.providerId}>
							{provider.providerName}
						</SelectItem>
					)
				})}
		</Select>
	)
}
