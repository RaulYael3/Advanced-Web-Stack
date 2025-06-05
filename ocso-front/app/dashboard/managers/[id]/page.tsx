import { API_URL } from '@/constants'
import { Manager } from '@/entities'
import { authHeaders } from '@/helpers/authHeaders'
import { Card, CardBody, CardHeader, Divider } from '@heroui/react'

export default async function ManagerPage({
	params,
}: {
	params: { id: string }
}) {
	const headers = await authHeaders()
	const response = await fetch(`${API_URL}/managers/${params.id}`, {
		method: 'GET',
		headers: {
			...headers,
		},
		next: {
			tags: [`dashborad:managers:${params.id}`, 'dashboard:managers'],
		},
	})
	const data: Manager = await response.json()
	return (
		<Card className='mx-20 py-2'>
			<CardHeader>
				<p className='w-full'>
					Nombre: <b>{data.managerFullName}</b>
				</p>
			</CardHeader>
			<Divider />
			<CardBody>
				<p className='w-full'>
					Email: <b>{data.managerEmail}</b>
				</p>
				<p className='w-full'>
					Telefono: <b>{data.managerPhoneNumber}</b>
				</p>
				{data.location ? (
					<>
						<p>Tienda: {data.location?.locationName}</p>
						<iframe
							className='border-2 border-orange-800 rounded-md my-2'
							width='300'
							height='200'
							src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyAz0Y6dhhUVleZmt7-H4PO1QQWCSEz3LBg&q=${data.location?.locationLatLng[0]},${data.location.locationLatLng[1]}`}
						></iframe>
					</>
				) : (
					<p className='w-full'>No tiene tienda asignada</p>
				)}
			</CardBody>
		</Card>
	)
}
