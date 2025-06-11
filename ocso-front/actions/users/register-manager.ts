"use server";
import { API_URL } from "@/constants"
import { authHeaders } from "@/app/dashboard/helpers/authHeaders"

export default async function registerManager(managerId: string, formData: FormData) {
  let data:any = {}
  data.userEmail = formData.get("userEmail")
  data.userPassword = formData.get("userPassword")
  data.userRoles = "Manager"

  const response = await fetch(`${API_URL}/auth/register/${managerId}?role=manager`, {
    method: "POST",
    headers: {
      ...await authHeaders(),
      'content-type': 'application/json',
    },
    body: JSON.stringify(data)
  })
  console.log(await response.json());
}