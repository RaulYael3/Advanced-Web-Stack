"usu server"

import { API_URL } from "@/constants"
import { authHeaders } from "@/helpers/authHeaders"

export default async function DeleteLocation(formData: FormData) {
    const locationId = formData.get("deleteValue")

    if(!locationId) throw new Error("No location id provided")

    const response = await fetch(`${API_URL}/locations/${locationId}`,{
        method: "DELETE",
        headers:{...await authHeaders()}
    })
}