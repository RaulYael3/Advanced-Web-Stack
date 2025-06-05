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
			if (store.manager) {
				return store.locationId.toString()
			}
		})
		.filter((storeId) => storeId !== undefined)

	return (
		<Select
			label='Tienda'
			name='location'
			defaultSelectedKeys={defaultStore ? [defaultStore] : []}
			disabledKeys={disabledStores}
		>
			{stores.map((store: Location) => (
				<SelectItem>{store.locationName}</SelectItem>
			))}
		</Select>
	)
}
