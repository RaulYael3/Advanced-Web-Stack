import { Employee } from '@/entities'
import {
	Button,
	Card,
	CardBody,
	CardFooter,
	CardHeader,
	Divider,
	Image,
} from '@heroui/react'
import Link from 'next/link'

export default function EmployeePhotoCard({
	employee,
}: {
	employee: Employee
}) {
	return (
		<Card className='max-h-72' isFooterBlurred>
			<CardHeader className='absolute top-0 bg-black bg-opacity-25 z-10'>
				<h1 className='font-bold text-xl text-white drop-shadow-sm'>
					{employee.employeeName + ' ' + employee.employeeLastName}
				</h1>
			</CardHeader>
			<Divider />
			<Image
				src={employee.employeePhoto}
				className='z-0 object-cover'
				classNames={{ img: 'size-72' }}
			/>
			<CardFooter className='absolute bottom-0 py-2 h-14'>
				<Link href={`/dashboard/employees/${employee.employeeId}`}>
					<Button variant='ghost'> Actualizar datos </Button>
				</Link>
			</CardFooter>
		</Card>
	)
}
