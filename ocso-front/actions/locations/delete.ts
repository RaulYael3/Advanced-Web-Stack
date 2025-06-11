"usu server"

import { API_URL } from "@/constants"
import { authHeaders } from "@/app/dashboard/helpers/authHeaders"
import { revalidateTag } from "next/cache"
import { redirect } from "next/navigation"

export default async function DeleteLocation(formData: FormData) {
    const locationId = formData.get("deleteValue")

    if(!locationId) throw new Error("No location id provided")

    fetch(`${API_URL}/locations/${locationId}`,{
        method: "DELETE",
        headers:{...await authHeaders()}
    })

    revalidateTag("dashboard:locations")
    redirect(`/dashboard`)
}