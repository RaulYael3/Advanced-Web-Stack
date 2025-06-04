'use client'

import { Select, SelectItem } from '@heroui/react'
import { Manager, Location } from '@/entities'

interface SelectManagerProps {
	managers: Manager[]
	locations: Location[]
	defaultManager?: string
}

export default function SelectManager({
	managers,
	locations,
	defaultManager,
}: SelectManagerProps) {
	const disabledKeys = locations
		.map((location) => {
			if (location.manager?.managerId !== defaultManager)
				return location.manager?.managerId
		})
		.filter((managersId) => managersId !== undefined)

	return (
		<Select
			defaultSelectedKeys={
				defaultManager !== undefined ? [defaultManager] : []
			}
			name='manager'
			disabledKeys={disabledKeys}
		>
			{managers.map((manager) => (
				<SelectItem key={manager.managerId}>
					{manager.managerFullName}
				</SelectItem>
			))}
		</Select>
	)
}
