import deleteProvider from '@/actions/provider/delete'
import { Button } from '@heroui/button'

export default function DeleteProviderButton({
	providerId,
}: {
	providerId: string
}) {
	const deleteProviderById = deleteProvider.bind(null, providerId)
	return (
		<form action={deleteProviderById} className='flex'>
			<Button className='w-full' type='submit' color='danger'>
				Estoy seguro
			</Button>
		</form>
	)
}
