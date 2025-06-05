import updateManager from '@/actions/managers/update'
import { API_URL } from '@/constants'
import { Manager } from '@/entities'
import { authHeaders } from '@/helpers/authHeaders'
import { Button, Input } from '@heroui/react'
import SelectStore from './SelectStore'

export default async function FormUpdateManager({
	manager,
}: {
	manager: Manager
}) {
	const updateManagerWithId = updateManager.bind(null, manager.managerId)

	const headers = await authHeaders()
	const response = await fetch(`${API_URL}/managers`, {
		headers: {
			...headers,
		},
	})
	const stores = await response.json()

	return (
		<form action={updateManagerWithId} className='bg-orange-400 rounded-md'>
			<h1>Actuazlizar manager</h1>
			<Input
				defaultValue={manager.managerFullName}
				placeholder='Nombre del manager'
				name='managerFullName'
			/>
			<Input
				defaultValue={manager.managerEmail}
				placeholder='Email del manager'
				name='managerEmail'
			/>
			<Input
				defaultValue={manager.managerPhoneNumber}
				placeholder='Teléfono del manager'
				name='managerPhoneNumber'
			/>
			<Input
				defaultValue={String(manager.managerSalary)}
				placeholder='Salario del manager'
				name='managerSalary'
			/>

			<SelectStore
				stores={stores}
				defaultStore={manager?.location!.locationId}
			/>

			<Button color='primary' type='submit'>
				Actualizar
			</Button>
		</form>
	)
}
