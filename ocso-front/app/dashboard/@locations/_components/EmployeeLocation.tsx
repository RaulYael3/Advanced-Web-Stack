import { API_URL, TOKEN_NAME } from "@/constants"
import { Employee } from "@/entities"
import axios from "axios"
import { cookies } from "next/headers"

export default async function EmployeeLocation({store}:{store: string}){
    const token = (await cookies()).get(TOKEN_NAME)?.value
    const {data} = await axios.get<Employee[]>(`${API_URL}/employees/location/${store}`,{
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
    if(!data) return null
    return(
        data.map((employee) => {
            const fullName = employee.employeeName + " " + employee.employeeLastName
            return(
                <div>{fullName}</div>
            )
        })
    )
    
}