import { Location } from "@/entities"
import { Select, SelectItem } from "@heroui/react"

export default function SelectLocation({location}: {location: Location[]}){
    return(
        <Select>
        {
            location.map((locationIter) =>{
                return (
                    <SelectItem key={locationIter.locationId}>{locationIter.locationName}</SelectItem>
                )
            })
        }
        </Select>
    )
}