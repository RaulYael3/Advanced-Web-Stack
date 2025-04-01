import { API_URL, TOKEN_NAME } from "@/constants"
import { Employee } from "@/entities"
import { Card, CardBody, CardHeader, Divider } from "@heroui/react"
import axios from "axios"
import { cookies } from "next/headers"

export default async function EmployeeLocation({store}:{store: string | string[] | undefined}){
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
                <Card className="mx-10 my-1">
                    <CardHeader>
                        <p className="w-full">Nombre: <b>{fullName}</b></p>
                    </CardHeader>
                    <Divider/>
                    <CardBody>
                        <p className="w-full">Email: <b>{employee.employeeEmail}</b></p>
                        <p className="w-full">Telefono: <b>{employee.employeePhoneNumber}</b></p>
                    </CardBody>
                </Card>
            )
        })
    )
    
}