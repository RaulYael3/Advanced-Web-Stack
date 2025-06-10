'use client'
import { Location } from '@/entities'
import { Select, SelectItem } from '@heroui/react'
export default function SelectLocations({
	stores,
	defaultStore,
}: {
	stores: Location[]
	defaultStore?: number | undefined
}) {
	return (
		<Select
			label='Tienda'
			name='location'
			defaultSelectedKeys={
				defaultStore ? [String(defaultStore)] : undefined
			}
		>
			{stores.map((store: Location) => (
				<SelectItem key={String(store.locationId)}>
					{store.locationName}
				</SelectItem>
			))}
		</Select>
	)
}
