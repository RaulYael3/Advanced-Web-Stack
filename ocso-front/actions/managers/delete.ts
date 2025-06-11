'use server'

import { API_URL } from "@/constants"
import { authHeaders } from "@/app/dashboard/helpers/authHeaders"
import { revalidateTag } from "next/cache"
import { redirect } from "next/navigation"


export default async function deleteManager(managerId: string, formData: FormData){
    let manager: any = {}
    for(const key of formData.keys()) {
        manager[key] = formData.get(key)
    }

    const headers = await authHeaders()
    const response  = await fetch(`${API_URL}/managers${managerId}`, {
        method: 'DELETE',
        headers: {
            ...headers,
        }
    })

    if(response.status === 200) {
        revalidateTag("dashboard:managers")
        redirect('/dashboard/managers')
    }
}