import { Manager } from '@/entities'
import { Card, CardBody, CardHeader, Divider } from '@heroui/react'
import Link from 'next/link'

export default function ManagerCard({ manager }: { manager: Manager }) {
	return (
		<Card className='mx-20 py- text-center'>
			<CardHeader>
				<p className='w-full'>
					<b className='text-3xl'>{manager.managerFullName}</b>
				</p>
			</CardHeader>
			<Divider />
			<CardBody className='flex flex-row flex-grow-0 items-center justify-center'>
				<div className='flex flex-col w-full'>
					<p className='w-full'>
						Email: <b>{manager.managerEmail}</b>
					</p>
					<p className='w-full'>
						Telefono: <b>{manager.managerPhoneNumber}</b>
					</p>
					<p>
						Sueldo: <b>${manager.managerSalary.toFixed(2)}</b>
					</p>
					<p>
						Tienda:
						<Link
							href={{
								pathname: `/dashboard`,
								query: {
									store: manager.location?.locationId,
								},
							}}
						>
							{manager.location?.locationName}
						</Link>
					</p>
				</div>
				{manager.location ? (
					<>
						<iframe
							className='border-2 border-orange-800 rounded-md my-2'
							width='300'
							height='200'
							src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyAz0Y6dhhUVleZmt7-H4PO1QQWCSEz3LBg&q=${manager.location?.locationLatLng[0]},${manager.location.locationLatLng[1]}`}
						></iframe>
					</>
				) : (
					<p className='w-full'>No tiene tienda asignada</p>
				)}
			</CardBody>
		</Card>
	)
}
