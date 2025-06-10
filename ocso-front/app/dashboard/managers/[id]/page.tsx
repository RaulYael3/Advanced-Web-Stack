import { API_URL } from '@/constants'
import { Manager } from '@/entities'
import { authHeaders } from '@/helpers/authHeaders'
import { Card, CardBody, CardHeader, Divider } from '@heroui/react'
import ManagerCard from './_components/ManagerCard'
import DeleteManager from './_components/DeleteManagerButton'
import UpdateManager from './_components/UpdateManager'
import FormUpdateManager from './_components/FormUpdateManager'

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
		<div className='flex flex-col gap-10 flex-grow items-center'>
			<UpdateManager>
				<FormUpdateManager manager={data} />
			</UpdateManager>
			<ManagerCard manager={data} />
			<DeleteManager managerId={data.managerId} />
		</div>
	)
}
