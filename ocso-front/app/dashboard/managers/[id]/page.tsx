import { API_URL } from '@/constants'
import { Manager } from '@/entities'
import { authHeaders } from '@/helpers/authHeaders'
import { Card, CardBody, CardHeader, Divider } from '@heroui/react'
import ManagerCard from './components/ManagerCard'

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
	return <ManagerCard manager={data} />
}
