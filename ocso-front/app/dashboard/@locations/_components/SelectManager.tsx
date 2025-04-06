'use client'

import { Select, SelectItem } from "@heroui/react"
import { Manager } from "@/entities"

export default function SelectManager({managers}: { managers: Manager[] }) {
    return (
        <Select>
            {
                managers.map((manager) => (
                    <SelectItem key={manager.managerId} >
                        {manager.managerFullName}
                    </SelectItem>
                ))
            }
        </Select>
    )
}