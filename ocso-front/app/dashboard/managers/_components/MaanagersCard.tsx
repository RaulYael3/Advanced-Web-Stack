import { API_URL } from '@/constants'
import { Employee, Manager } from '@/entities'
import { authHeaders } from '@/app/dashboard/helpers/authHeaders'
import { Card, CardBody, CardHeader, Divider } from '@heroui/react'
import Link from 'next/link'

export default async function ManagersCard() {
	const response = await fetch(`${API_URL}/managers`, {
		method: 'GET',
		headers: { ...(await authHeaders()) },
		next: {
			tags: [`dashboard:managers`],
		},
	})

	const data: Manager[] = await response.json()
	if (!data) return null

	return data.map((manager: Manager) => {
		return (
			<Link
				href={{ pathname: `/dashboard/managers/${manager.managerId}` }}
			>
				<Card className='mx-10 my-1'>
					<CardHeader>
						<p className='w-full'>
							Nombre: <b>{manager.managerFullName}</b>
						</p>
					</CardHeader>
					<Divider />
					<CardBody>
						<p className='w-full'>
							Email: <b>{manager.managerEmail}</b>
						</p>
						<p className='w-full'>
							Telefono: <b>{manager.managerPhoneNumber}</b>
						</p>
					</CardBody>
				</Card>
			</Link>
		)
	})
}
