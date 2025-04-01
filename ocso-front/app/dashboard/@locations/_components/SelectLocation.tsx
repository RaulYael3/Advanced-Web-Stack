import { Location } from "@/entities"
import { Select, SelectItem } from "@heroui/react"
import { useRouter } from "next/router"

export default function SelectLocation({location}: {location: Location[]}){
    const router = useRouter( )

    return(
        <Select label="Tienda" placeholder="Selecciona una tienda" classNames={{
            mainWrapper: "hover: ring-2 ring-red-300 rounded-xl transition-all"
        }}
            onChange={((e) => {
                router.push(`/dashboard?store=${e.target.value}`)
            })}
        >
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