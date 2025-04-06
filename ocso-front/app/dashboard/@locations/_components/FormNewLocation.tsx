import { Input } from "@heroui/react"
import { createLocation } from "@/actions/locations/create"

export default function FormNewLocation({}) {

    return(
        <form action={createLocation} className="flex flex-col gap-4">
            <Input label="Nombre de tienda" name="locationName"/>
            <button>Subir</button>
        </form>
    )
}