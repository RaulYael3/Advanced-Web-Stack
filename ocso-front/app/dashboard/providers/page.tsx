import { API_URL } from '@/constants'
import { authHeaders } from '@/helpers/authHeaders'
import ProviderCard from './_components/ProviderCard'
import { Provider } from '@/entities'
import Link from 'next/link'
import { Button } from '@heroui/button'
import { LuPlus } from 'react-icons/lu'

export default async function ProviderPage() {
	const response = await fetch(`${API_URL}/providers`, {
		headers: {
			...(await authHeaders()),
		},
	})
	const providers: Provider[] = await response.json()

	return (
		<div className='flex flex-col h-[90vh] w-full items-end px-10'>
			<Button className='w-fit' color='primary'>
				<LuPlus size={20} />
			</Button>
			<div className='flex w-full flex-grow-0 flex-wrap gap-20'>
				{providers.map((provider) => (
					<Link
						href={`/dashboard/providers/${provider.providerId}`}
						className='w-4/12 hover:scale-105 transition-transform duration-300'
						key={provider.providerId}
					>
						<ProviderCard
							key={provider.providerId}
							provider={provider}
						/>
					</Link>
				))}
			</div>
		</div>
	)
}
