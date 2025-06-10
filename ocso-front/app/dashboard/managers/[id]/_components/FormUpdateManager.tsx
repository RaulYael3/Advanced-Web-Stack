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
		<form
			action={updateManagerWithId}
			className='bg-orange-400 rounded-md flex flex-col flex-grow-0 gap-2'
		>
			<h1 className='tet-2xl text-white font-semibold text-center'>
				Actuazlizar manager
			</h1>
			<Input
				isRequired
				label='ID del manager'
				defaultValue={manager.managerFullName}
				placeholder='Nombre del manager'
				name='managerFullName'
			/>
			<Input
				isRequired
				label='Email del manager'
				defaultValue={manager.managerEmail}
				placeholder='Email del manager'
				name='managerEmail'
			/>
			<Input
				isRequired
				label='Teléfono del manager'
				defaultValue={manager.managerPhoneNumber}
				placeholder='Teléfono del manager'
				name='managerPhoneNumber'
			/>
			<Input
				isRequired
				label='Salario del manager'
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
