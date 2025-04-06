"usu server"

import { API_URL } from "@/constants"
import axios from "axios"
import { cookies } from "next/headers"

export default async function DeleteLocation(formData: FormData) {
    const locationId = formData.get("deleteValue")

    if(!locationId) throw new Error("No location id provided")

    const token = (await cookies()).get("token")?.value
    axios.delete(`${API_URL}/locations/${locationId}`,{
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
}