import { Input } from "@heroui/react"
import { createLocation } from "@/actions/locations/create"
import axios from "axios"
import { API_URL, TOKEN_NAME } from "@/constants"
import { cookies } from "next/headers"
import SelectManager from "./SelectManager"

export default async function FormNewLocation({searchParams}:{
    searchParams: {[key: string]: string | string[] | undefined}
}) {
    if(!searchParams?.store) return null

    const token = (await cookies()).get(TOKEN_NAME)?.value
    
    const responseMangers = await axios.get(`${API_URL}/managers`, {
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
    const responseLocations = await axios.get(`${API_URL}/locations`, {
        headers:{
            Authorization: `Bearer ${token}`
        }
    })

    return(
        <form action={createLocation} className="flex flex-col gap-6 bg-orange-400 py-2 px-4 w-full rounded-lg">
            <h1 className="text-3xl font-bold text-white">Crear nueva tienda</h1>
            <Input label="Nombre de tienda" placeholder="Ocso Juriquilla" name="locationName"/>
            <Input label="Direccion" placeholder="Av de la luz S/N" name="locationAddress"/>
            <Input label="Latitud" placeholder="-120" name="locationLat"/>
            <Input label="Longitud" placeholder="20" name="locationLng"/>
            <SelectManager managers={responseMangers.data} locations={responseLocations.data}/>
            <button type="submit" className="bg-amber-500 rounded-2xl py-3 p-7 justify-center">Subir</button>
        </form>
    )
}