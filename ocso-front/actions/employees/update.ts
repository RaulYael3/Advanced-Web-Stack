"use server";

import { API_URL } from "@/constants";
import { authHeaders } from "@/helpers/authHeaders";
import { revalidateTag } from "next/cache";

export default async function updateEmployee(employeeId: string, formData: FormData){
  const cleanData = new FormData()
  for (const [key, value] of formData.entries()) {
    if (!key.startsWith("$")) {
      cleanData.append(key, value);
    }
  }
  const response = await fetch (`${API_URL}/employees/${employeeId}`, {
    method: "PATCH",
    headers: {
      ...await authHeaders()
    },
    body: cleanData,
  })
  console.log(await response.json())
  if (response.status === 200) revalidateTag("dashboard:employees");
  if (response.status === 200) revalidateTag(`dashboard:employees:${employeeId}`);
  return;
}