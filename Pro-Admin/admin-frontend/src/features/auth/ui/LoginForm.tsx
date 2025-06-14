'use client'

import { useAuthStore } from '../model/store'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { useRouter } from 'next/navigation'

export const LoginForm = () => {
	const { loginForm, setLoginForm, login, user } = useAuthStore()
	const router = useRouter()
	console.log('LoginForm user:', router.push)
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		await login()

		// Verificar si el login fue exitoso
		const currentUser = useAuthStore.getState().user
		if (currentUser?.id !== undefined && currentUser?.id !== null) {
			if (currentUser.role === 'admin') {
				router.push('/dashboard')
			} else {
				router.push('/cinerex')
			}
		}
	}

	// router.push('/cinerex')

	return (
		<Card
			className=' border-none shadow-none bg-transparent text-brand-950'
			style={{
				boxShadow:
					'-6px -6px 20px  var(--color-brand-50), 6px 6px 20px var(--color-brand-700)',
			}}
		>
			<CardHeader className='text-brand-dark-800'>
				<CardTitle>Iniciar Sesión</CardTitle>
				<CardDescription className='text-brand-dark-600'>
					Ingresa tus credenciales para acceder al panel
				</CardDescription>
			</CardHeader>
			<form
				onSubmit={handleSubmit}
				className='flex flex-col justify-between h-full pt-10'
			>
				<CardContent className='space-y-4 gap-4'>
					<div className='space-y-2'>
						<Label htmlFor='email'>Email</Label>
						<Input
							id='email'
							type='email'
							value={loginForm.email}
							onChange={(e) =>
								setLoginForm({
									...loginForm,
									email: e.target.value,
								})
							}
							required
							className='border-none bg-transparent text-brand-dark-600'
							style={{
								boxShadow:
									'inset 6px 6px 20px -15px var(--color-brand-700), inset -6px -6px 20px var(--color-brand-50)',
							}}
						/>
					</div>
					<div className='space-y-2'>
						<Label
							htmlFor='password'
							className='text-brand-dark-700'
						>
							Contraseña
						</Label>
						<Input
							id='password'
							type='password'
							value={loginForm.password}
							onChange={(e) =>
								setLoginForm({
									...loginForm,
									password: e.target.value,
								})
							}
							required
							className='border-none bg-transparent text-brand-dark-600'
							style={{
								boxShadow:
									'inset 6px 6px 20px -15px var(--color-brand-700), inset -6px -6px 20px var(--color-brand-50)',
							}}
						/>
					</div>
				</CardContent>
				<CardFooter className='mt-8'>
					<Button
						type='submit'
						className='w-full cursor-pointer border-none bg-transparent text-brand-dark-700 hover:bg-brand-200'
						style={{
							boxShadow:
								'-6px -6px 20px 10px var(--color-brand-50), 6px 6px 20px var(--color-brand-700)',
						}}
					>
						Iniciar Sesión
					</Button>
				</CardFooter>
			</form>
		</Card>
	)
}
