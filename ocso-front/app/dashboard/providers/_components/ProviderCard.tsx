import { Provider } from '@/entities'
import { Card, CardBody, CardHeader, Divider } from '@heroui/react'

export default function ProviderCard({ provider }: { provider: Provider }) {
	return (
		<Card className='w-4/12'>
			<CardHeader>{provider.providerName}</CardHeader>
			<Divider />
			<CardBody>
				<p>
					Correlo elcectronico: <b>{provider.providerEmail}</b>
				</p>
				<p>
					Telefono: <b>{provider.providerPhone}</b>
				</p>
				<p>
					Productos:{' '}
					{provider.products.length > 0 ? (
						<b>{provider.products.length}</b>
					) : (
						<span>Sin productos</span>
					)}
				</p>
			</CardBody>
		</Card>
	)
}
