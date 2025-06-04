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
	const disabledKeys = locations.map((location) => {
		return location.manager?.managerId
	})

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
