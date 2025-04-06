'use server'

import { API_URL, TOKEN_NAME } from "@/constants"
import axios from "axios"
import { cookies } from "next/headers"

export async function createLocation(formData: FormData) {
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
    axios.post(`${API_URL}/locations`, {
        ...locations
    }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}   

