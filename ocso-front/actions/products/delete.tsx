'use server'

import { API_URL } from '@/constants'
import { authHeaders } from '@/app/dashboard/helpers/authHeaders'
import { revalidateTag } from 'next/cache'
import { redirect } from 'next/navigation'
export default async function deleteProduct(
	productId: string,
	formData: FormData
) {
	const response = await fetch(`${API_URL}/products/${productId}`, {
		method: 'DELETE',
		headers: {
			...(await authHeaders()),
			'content-type': 'application/json',
		},
	})
	if (response.status === 200) {
		revalidateTag('dashboard:products')
		redirect('/dashboard/products')
	}
}
