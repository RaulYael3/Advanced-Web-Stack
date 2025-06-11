'use server'

import { API_URL } from "@/constants"
import { authHeaders } from "@/app/dashboard/helpers/authHeaders"
import { revalidateTag } from "next/cache"
import { redirect } from "next/navigation"

export default async function updateManager(managerId: string, formData: FormData){
    let manager: any = {}
    for(const key of formData.keys()) {
        manager[key] = formData.get(key)
    }
    manager['managerSalary'] = +manager['managerSalary']
    manager['location'] = +manager['location'] 
    if(!manager['location']) delete manager['location']


    const headers = await authHeaders()
    const response  = await fetch(`${API_URL}/managers`, {
        method: 'PATCH',
        body: JSON.stringify(manager),
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        }
    })
    if(response.status === 201){
        revalidateTag("dashboard:managers")
        revalidateTag(`dashboard:managers${managerId}`)
        redirect("/dashboard/managers")
    }
}