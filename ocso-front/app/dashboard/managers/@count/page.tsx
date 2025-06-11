import { API_URL } from '@/constants'
import { Manager } from '@/entities'
import { authHeaders } from '@/app/dashboard/helpers/authHeaders'
import { Card } from '@heroui/react'

export default async function CountManagerPage() {
	const headers = await authHeaders()
	const response = await fetch(`${API_URL}/managers`, {
		headers: {
			...headers,
		},
		next: {
			tags: ['dashboard:managers'],
		},
	})
	const data: Manager[] = await response.json()
	const countNoStore = data.filter((manager) => !manager.location).length
	const averageSalary =
		data.reduce((acc, manager) => acc + (manager.managerSalary || 0), 0) /
		data.length

	return (
		<Card className='w-fit py-4 px-6 text-center'>
			<h1>
				Hay {data.length} manager{data.length > 1 ? 's' : ''}{' '}
			</h1>
			<h1>Hay {countNoStore} sin tienda</h1>
			<h2>El salario promedio es de: {averageSalary}$</h2>
		</Card>
	)
}
