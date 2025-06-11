"use server";

import { API_URL } from "@/constants";
import { authHeaders } from "@/app/dashboard/helpers/authHeaders";
import { revalidateTag } from "next/cache";

export default async function createEmployee(formData: FormData){
  formData.delete("$ACTION_REF_0")
  formData.delete("$ACTION_0:1")
  formData.delete("$ACTION_0:0")
  const response = await fetch (`${API_URL}/employees`, {
    method: "POST",
    headers: {
      ...await authHeaders()
    },
    body: formData,
  })
  console.log(await response.json())
  if (response.status === 201) revalidateTag("dashboard:employees");
  return;
}