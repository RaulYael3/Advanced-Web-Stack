import { API_URL } from '@/constants'
import { authHeaders } from '@/helpers/authHeaders'
import ProviderCard from './_components/ProviderCard'
import { Provider } from '@/entities'
import Link from 'next/link'

export default async function ProviderPage() {
	const response = await fetch(`${API_URL}/providers`, {
		headers: {
			...(await authHeaders()),
		},
	})
	const providers: Provider[] = await response.json()

	return (
		<div className='flex w-full flex-row flex-grow-0 flex-wrap px-10'>
			{providers.map((provider) => (
				<Link
					href={`/dashboard/providers/${provider.providerId}`}
					className='w-4/12'
					key={provider.providerId}
				>
					<ProviderCard
						key={provider.providerId}
						provider={provider}
					/>
				</Link>
			))}
		</div>
	)
}
