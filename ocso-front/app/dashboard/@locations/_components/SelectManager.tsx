'use client'

import { Select, SelectItem } from "@heroui/react"
import { Manager, Location } from "@/entities"

export default function SelectManager({
    managers, 
    locations
}: {  
    managers: Manager[],
    locations: Location[]
}) {
    const disabledKeys = locations.map((location) => {
        return location.manager?.managerId
    })

    return (
        <Select name="manager" disabledKeys={disabledKeys}>
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