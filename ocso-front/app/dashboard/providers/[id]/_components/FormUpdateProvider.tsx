import { Provider } from '@/entities'
import { Input, Button } from '@heroui/react'
import DeleteProvider from './DeleteProvider'
import DeleteProviderButton from './DeleteButton'
import updateProvider from '@/actions/provider/update'

export default function FormUpdateProvider({
	provider,
}: {
	provider: Provider
}) {
	const { providerId } = provider
	const updateProviderWithId = updateProvider.bind(null, providerId)
	return (
		<>
			<form
				action={updateProviderWithId}
				className='flex flex-wrap gap-4 flex-grow-0 bg-orange-200 rounded-md px-10 py-10 mr-20 items-center justify-center'
			>
				<Input
					className='max-w-[250px]'
					defaultValue={provider.providerName}
					label='Nombre'
					placeholder='Pecsi'
					name='providerName'
				/>
				<Input
					className='max-w-[250px]'
					defaultValue={provider.providerEmail}
					label='Correo'
					placeholder='business@pecsi.com'
					name='providerEmail'
				/>
				<Input
					className='max-w-[250px]'
					defaultValue={provider.providerPhone}
					label='Número'
					placeholder='444XXXXX'
					name='providerPhoneNumber'
				/>
				<Button color='primary' type='submit'>
					{' '}
					Actualizar{' '}
				</Button>
				<DeleteProvider>
					<h1 className='text-white text-4xl text-center'>
						¿Estás seguro de eliminar al proveedor{' '}
						<b>{provider.providerName}</b>?
					</h1>
					<DeleteProviderButton providerId={providerId} />
				</DeleteProvider>
			</form>
		</>
	)
}
