'use server'

import { API_URL } from '@/constants'
import { authHeaders } from '@/helpers/authHeaders'
import { revalidateTag } from 'next/cache'
import { redirect } from 'next/navigation'

export default async function deleteProvider(
	providerId: string,
	formData: FormData
) {
	const response = await fetch(`${API_URL}/providers/${providerId}`, {
		method: 'DELETE',
		headers: {
			...(await authHeaders()),
		},
	})
	if (response.status === 200) {
		revalidateTag('dashboard:providers')
		redirect('/dashboard/providers')
	}
}
