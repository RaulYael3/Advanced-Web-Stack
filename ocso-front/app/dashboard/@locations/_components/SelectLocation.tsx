'use client'

import { Location } from '@/entities'
import { Select, SelectItem } from '@heroui/react'
import { useRouter } from 'next/navigation'

export default function SelectLocation({
	location,
	store,
}: {
	location: Location[]
	store: string | string[] | undefined
}) {
	const router = useRouter()
	if (!store) return null

	return (
		<Select
			label='Tienda'
			placeholder='Selecciona una tienda'
			classNames={{
				mainWrapper:
					'hover: ring-2 ring-red-300 rounded-xl transition-all',
			}}
			selectedKeys={store}
			onChange={(e) => {
				router.push(`/dashboard?store=${e.target.value}`)
			}}
		>
			{location.map((locationIter) => {
				return (
					<SelectItem key={locationIter.locationId}>
						{locationIter.locationName}
					</SelectItem>
				)
			})}
		</Select>
	)
}
