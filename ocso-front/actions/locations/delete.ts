"usu server"

import { API_URL } from "@/constants"
import axios from "axios"
import { cookies } from "next/headers"

export default async function DeleteLocation(){
    const token = (await cookies()).get("token")?.value
    axios.delete(`${API_URL}/locations/`,{
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
}