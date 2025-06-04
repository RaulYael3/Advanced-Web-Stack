'use client'
import { API_URL } from '@/constants'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

export default function LoginPage() {
	const [submiting, setSubmiting] = useState(false)

	const router = useRouter()

	const handleSubmit = async (e: React.FormEvent) => {
		setSubmiting(true)
		e.preventDefault()
		const formData = new FormData(e.target)
		let authData = {}
		authData.userEmail = formData.get('userEmail')
		authData.userPassword = formData.get('userPassword')
		try {
			const response = await fetch(`${API_URL}/auth/login`, {
				body: JSON.stringify(authData),
				method: 'POST',
				credentials: 'include',
			})

			if (response.status === 201) router.push('/dashboard')

			setSubmiting(false)
		} catch (e) {
			setSubmiting(false)
		}
		return
	}

	return (
		<form
			className='flex items-center justify-center min-h-screen bg-cyan-50'
			onSubmit={handleSubmit}
		>
			{/* Contenedor principal con fondo naranja */}
			<div className='bg-cyan-700 p-6 rounded-lg w-full max-w-sm'>
				{/* Título */}
				<h2 className='text-xl font-bold mb-4 text-white'>
					Ingresa en la plataforma
				</h2>

				{/* Campo de Email */}
				<div className='mb-4 flex flex-col gap-4'>
					<input
						type='email'
						name='userEmail'
						placeholder='Email'
						className='w-full px-3 py-2 border border-gray-300 rounded-md outline-none placeholder:text-amber-50/20 text-amber-50'
					/>

					<input
						type='password'
						name='userPassword'
						placeholder='password'
						className='w-full px-3 py-2 border border-gray-300 rounded-md outline-none placeholder:text-amber-50/20 text-amber-50'
					/>
				</div>
				{/* Botón de Registrarse */}
				<button
					type='submit'
					disabled={submiting}
					className='bg-gray-300 text-neutral-800 py-1 px-4 rounded-lg cursor-pointer mt-4 justify-self-center'
				>
					Registrarse
				</button>

				<p className='text-xs pt-4 justify-self-end'>
					Aun no tienes cuenta?{' '}
					<a href='/signup' className='text-blue-100 underline'>
						Registrate
					</a>
				</p>
			</div>
		</form>
	)
}
