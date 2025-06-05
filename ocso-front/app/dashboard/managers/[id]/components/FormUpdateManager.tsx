import updateManager from '@/actions/managers/update'
import { Manager } from '@/entities'
import { Button, Input } from '@heroui/react'

export default function FormUpdateManager({ manager }: { manager: Manager }) {
	const updateManagerWithId = updateManager.bind(null, manager.managerId)
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
			<Button color='primary' type='submit'>
				Actualizar
			</Button>
		</form>
	)
}
