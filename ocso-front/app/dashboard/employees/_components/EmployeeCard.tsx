import { Employee } from '@/entities'
import {
	Card,
	CardBody,
	CardFooter,
	CardHeader,
	Divider,
	Button,
} from '@heroui/react'
import Link from 'next/link'

export default function EmployeeCard({ employee }: { employee: Employee }) {
	return (
		<Card className='size-72 max-h-72 min-h-72 bg-orange-50'>
			<CardHeader>
				<h1 className='font-bold text-xl'>
					{employee.employeeName + ' ' + employee.employeeLastName}
				</h1>
			</CardHeader>
			<Divider />
			<CardBody>
				<p>
					Correo: <b>{employee.employeeEmail}</b>
				</p>
				<p>
					Número de teléfono: <b>{employee.employeePhoneNumber}</b>
				</p>
			</CardBody>
			<CardFooter className='absolute bottom-0 py-2 h-14'>
				<Link href={`/dashboard/employees/${employee.employeeId}`}>
					<Button variant='ghost'> Actualizar datos </Button>
				</Link>
			</CardFooter>
		</Card>
	)
}
