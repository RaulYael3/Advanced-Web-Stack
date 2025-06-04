import { Input } from '@heroui/react'
import { createLocation } from '@/actions/locations/create'
import { API_URL } from '@/constants'
import SelectManager from './SelectManager'
import { authHeaders } from '@/helpers/authHeaders'
import { Manager } from '@/entities'

export default async function FormNewLocation({
	searchParams,
}: {
	searchParams: { [key: string]: string | string[] | undefined }
}) {
	if (!searchParams?.store) return null

	/**
	 * Fetches the list of managers from the API.
	 *
	 * @remarks
	 * This function sends a GET request to the `${API_URL}/managers` endpoint
	 * to retrieve the list of managers. It includes authentication headers
	 * obtained from the `authHeaders` function.
	 *
	 * @throws {Error} If the fetch request fails or the response is invalid.
	 *
	 * @returns {Promise<Response>} A promise that resolves to the response object
	 * containing the list of managers.
	 */
	const responseMangers = await fetch(`${API_URL}/managers`, {
		headers: { ...(await authHeaders()) },
		next: {
			tags: ['dashboard:managers'],
		},
	})
	const dataMangers: Manager[] = await responseMangers.json()

	const responseLocations = await fetch(`${API_URL}/locations`, {
		headers: { ...(await authHeaders()) },
		next: {
			tags: ['dashboard:locations'],
		},
	})
	const dataLocations: Location[] = await responseLocations.json()

	return (
		<form
			action={createLocation}
			className='flex flex-col gap-6 bg-orange-400 py-2 px-4 w-full rounded-lg'
		>
			<h1 className='text-3xl font-bold text-white'>
				Crear nueva tienda
			</h1>
			<Input
				label='Nombre de tienda'
				placeholder='Ocso Juriquilla'
				name='locationName'
			/>
			<Input
				label='Direccion'
				placeholder='Av de la luz S/N'
				name='locationAddress'
			/>
			<Input label='Latitud' placeholder='-120' name='locationLat' />
			<Input label='Longitud' placeholder='20' name='locationLng' />
			<SelectManager managers={dataMangers} locations={dataLocations} />
			<button
				type='submit'
				className='bg-amber-500 rounded-2xl py-3 p-7 justify-center'
			>
				Subir
			</button>
		</form>
	)
}
