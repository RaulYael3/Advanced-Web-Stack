import { Button, Input } from '@heroui/react'

import { Location } from '@/entities'
import createManager from '@/actions/managers/create'
import SelectStore from '../[id]/_components/SelectStore'

export default function FormCreateManager({ stores }: { stores: Location[] }) {
	return (
		<form action={createManager} className='flex flex-col gap-4'>
			<h1 className='text-4xl font-bold text-white'>Crear Manager </h1>
			<Input label='Nombre completo' name='managerFullName' />
			<Input label='Salario' name='managerSalary' />
			<Input label='Correo' name='managerEmail' />
			<Input label='Número de teléfono' name='managerPhoneNumber' />
			<SelectStore stores={stores} />
			<Button color='primary' type='submit'>
				Crear Manager
			</Button>
		</form>
	)
}
