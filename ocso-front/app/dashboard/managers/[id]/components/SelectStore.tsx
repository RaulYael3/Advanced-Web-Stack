import { Location } from '@/entities'
import { Select, SelectItem } from '@heroui/react'

export default function SelectStore({
	stores,
	defaultStore,
}: {
	stores: Location[]
	defaultStore: number
}) {
	const disabledStores = stores
		.map((store) => {
			if (store.manager && store.locationId !== defaultStore) {
				return store.locationId.toString()
			}
		})
		.filter((storeId) => storeId !== undefined)

	return (
		defaultStore && (
			<Select
				label='Tienda'
				name='location'
				defaultSelectedKeys={
					defaultStore ? [defaultStore.toString()] : []
				}
				disabledKeys={disabledStores}
			>
				{stores.map((store: Location) => (
					<SelectItem key={String(store.locationId)}>
						{store.locationName}
					</SelectItem>
				))}
			</Select>
		)
	)
}
