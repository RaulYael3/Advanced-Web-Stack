'use client'
import { Product, Provider } from '@/entities'
import Link from 'next/link'
import ProductCard from './ProductCard'
import { useEffect, useState } from 'react'
import { Input, Select, SelectItem } from '@heroui/react'

export default function FilteredCards({
	products = [],
	providers = [],
}: {
	products: Product[]
	providers: Provider[]
}) {
	const [filtered, setFiltered] = useState<string>('')
	const [provider, setProvider] = useState<string>()
	const [show, setShow] = useState(false)
	const [productsList, setProductsList] = useState<Product[]>(products)
	useEffect(() => {
		const safeProducts = Array.isArray(products) ? products : []

		if (safeProducts.length === 0) {
			setProductsList([])
			setShow(true)
			return
		}

		const filteredProducts = safeProducts.filter((product) => {
			const matchesName = product.name
				.toLowerCase()
				.includes(filtered.toLowerCase())

			if (!provider) {
				return matchesName
			}

			return matchesName && product.provider.providerId === provider
		})

		setProductsList(filteredProducts)
		setShow(true)
	}, [filtered, provider, products])

	if (!Array.isArray(providers) || !Array.isArray(products)) {
		return <div>Cargando...</div>
	}
	return (
		<div className='max-h-[90vh] min-h-[90vh] overflow-y-auto flex flex-col gap-4 border-r-orange-400 border-r-2 pt-10 px-10'>
			<Select
				label='Proveedor'
				onChange={(e) => {
					setProvider(e.target.value)
				}}
			>
				{providers?.map((provider) => (
					<SelectItem key={provider.providerId}>
						{provider.providerName}
					</SelectItem>
				))}
			</Select>
			<Input
				autoFocus={true}
				onChange={(e) => {
					setFiltered(e.target.value)
				}}
				label='Nombre del producto'
			/>
			{show &&
				productsList.length > 0 &&
				productsList?.map((product) => {
					return (
						<Link
							className='hover:scale-110 transition-transform'
							key={product.productId}
							href={{
								pathname: `/dashboard/products/${product.productId}`,
							}}
						>
							<ProductCard product={product} />
						</Link>
					)
				})}
		</div>
	)
}
