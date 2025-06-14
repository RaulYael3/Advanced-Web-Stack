'use server'

import { API_URL } from "@/constants"
import { authHeaders } from "@/app/dashboard/helpers/authHeaders"
import { revalidateTag } from "next/cache"

export default async function createManager(formData: FormData){
    let manager: any = {}
    for(const key of formData.keys()) {
        manager[key] = formData.get(key)
    }

    const headers = await authHeaders()
    const response  = await fetch(`${API_URL}/managers`, {
        method: 'POST',
        body: JSON.stringify(manager),
        headers: {
            ...headers,
        }
    })
    if(response.status === 201) revalidateTag("dashboard:managers")
}