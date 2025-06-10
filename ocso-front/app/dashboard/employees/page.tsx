import { API_URL } from '@/constants'
import { Employee, Location } from '@/entities'
import { authHeaders } from '@/helpers/authHeaders'
import CreateEmployee from './_components/CreateEmployee'
import FormCreateEmployee from './_components/FormCreateEmployee'
import ListEmployees from './_components/ListEmployee'
import { LuPlus } from 'react-icons/lu'

const EmployeesPage = async () => {
	const response = await fetch(`${API_URL}/employees`, {
		headers: {
			...(await authHeaders()),
		},
		next: {
			tags: ['dashboard:employees'],
		},
	})
	const employees: Employee[] = await response.json()

	const responseLocations = await fetch(`${API_URL}/locations`, {
		headers: {
			...(await authHeaders()),
		},
		next: {
			tags: ['dashboard:employees'],
		},
	})
	const locations: Location[] = await responseLocations.json()

	return (
		<div className='flex flex-wrap flex-grow-0 h-[90vh] gap-4 overflow-y-auto p-10'>
			<ListEmployees employees={employees} locations={locations} />
			<div className='absolute bottom-10 right-10'>
				<CreateEmployee icon={<LuPlus size='20' />}>
					<FormCreateEmployee />
				</CreateEmployee>
			</div>
		</div>
	)
}

export default EmployeesPage
