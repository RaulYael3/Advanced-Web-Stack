'use server'

import { API_URL, TOKEN_NAME } from "@/constants"
import { Location } from "@/entities"
import { authHeaders } from "@/app/dashboard/helpers/authHeaders"
import { revalidateTag } from "next/cache"
import { redirect } from "next/navigation"
import { cookies } from "next/headers"

export async function updateLocation(store: string, formData: FormData) {
    const token = (await cookies()).get(TOKEN_NAME)?.value
    let locations: any = {}
    let locationLatLng = [0,0]
    for(const key of formData.keys()) {
        const value = formData.get(key)
        if(value) {
            if(key.includes('locationLat')) {
                locationLatLng[0] = +value
                continue
            } else if(key.includes('locationLng')) {
                locationLatLng[1] = +value
                continue
            } else {
                locations[key] = formData.get(key)
            }
        }
    }

    locations.locationLatLng = locationLatLng
    const response = await fetch(`${API_URL}/locations/${store}`, {
        body: JSON.stringify(locations),
        method: 'PATCH',
        headers: {...await authHeaders()}
    })

    const {locationId} = await response.json()
    if (response.status === 200) {
        revalidateTag(`dashboard:locations:${store}`)
        redirect(`/dashboard?store=${locationId}`)
    }
}   

