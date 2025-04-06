import { Input } from "@heroui/react"
import { createLocation } from "@/actions/locations/create"
import axios from "axios"
import { API_URL, TOKEN_NAME } from "@/constants"
import { cookies } from "next/headers"
import SelectManager from "./SelectManager"

export default async function FormNewLocation({}) {
    const token = (await cookies()).get(TOKEN_NAME)?.value
    const {data} = await axios.get(`${API_URL}/managers`, {
        headers:{
            Authorization: `Bearer ${token}`
        }
    })

    return(
        <form action={createLocation} className="flex flex-col gap-4">
            <Input label="Nombre de tienda" name="locationName"/>
            <Input label="Direccion" name="locationAddress"/>
            <Input label="Latitud" name="locationLat"/>
            <Input label="Longitud" name="locationLng"/>
            <SelectManager managers={data}/>
            <button>Subir</button>
        </form>
    )
}