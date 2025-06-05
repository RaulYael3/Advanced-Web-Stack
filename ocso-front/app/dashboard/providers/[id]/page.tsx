import { API_URL } from '@/constants'
import { authHeaders } from '@/helpers/authHeaders'

export default async function ProviderPage() {
	const response = await fetch(`${API_URL}/providers`, {
		headers: {
			...(await authHeaders()),
		},
	})
	const providers = await response.json()

	return 'Show all provider'
}
