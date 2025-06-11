import { API_URL } from '@/constants'
import { Employee } from '@/entities'
import { authHeaders } from '@/helpers/authHeaders'
import { Card, CardBody, CardHeader, Divider } from '@heroui/react'

export default async function EmployeeLocation({
	store,
}: {
	store: string | string[] | undefined
}) {
	const response = await fetch(`${API_URL}/employees/location/${store}`, {
		method: 'GET',
		headers: { ...(await authHeaders()) },
		next: {
			tags: [`dashboard:locations:employees`],
		},
	})

	const data: Employee[] = await response.json()
	if (!data) return null
	console.log('Datos de empleados:', data)
	return (
		data &&
		data.map((employee: Employee) => {
			const fullName =
				employee.employeeName + ' ' + employee.employeeLastName
			return (
				<Card className='mx-10 my-1'>
					<CardHeader>
						<p className='w-full'>
							Nombre: <b>{fullName}</b>
						</p>
					</CardHeader>
					<Divider />
					<CardBody>
						<p className='w-full'>
							Email: <b>{employee.employeeEmail}</b>
						</p>
						<p className='w-full'>
							Telefono: <b>{employee.employeePhoneNumber}</b>
						</p>
					</CardBody>
				</Card>
			)
		})
	)
}
