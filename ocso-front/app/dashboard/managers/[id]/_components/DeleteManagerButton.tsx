import deleteManager from '@/actions/managers/delete'
import { Button } from '@heroui/button'
import { LuTrash } from 'react-icons/lu'

export default function DeleteManager({ managerId }: { managerId: string }) {
	const deleteByManagerId = deleteManager.bind(null, managerId)
	return (
		<form action={deleteByManagerId} className='flex'>
			<Button type='submit' color='danger'>
				<LuTrash size={20} />
			</Button>
		</form>
	)
}
