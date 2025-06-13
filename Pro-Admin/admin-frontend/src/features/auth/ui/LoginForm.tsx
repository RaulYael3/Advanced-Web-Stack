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

export const LoginForm = () => {
	const { loginForm, setLoginForm, login } = useAuthStore()

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		login()
	}

	return (
		<Card
			className='border-none shadow-none bg-transparent'
			style={{
				boxShadow: '-6px -6px 20px 10px #FBF7F6, 6px 6px 20px #9b9c98',
			}}
		>
			<CardHeader>
				<CardTitle>Iniciar Sesión</CardTitle>
				<CardDescription>
					Ingresa tus credenciales para acceder al panel
				</CardDescription>
			</CardHeader>
			<form onSubmit={handleSubmit}>
				<CardContent className='space-y-4 gap-4'>
					<div className='space-y-2'>
						<Label htmlFor='email'>Email</Label>
						<Input
							id='email'
							type='email'
							placeholder='tu@email.com'
							value={loginForm.email}
							onChange={(e) =>
								setLoginForm({
									...loginForm,
									email: e.target.value,
								})
							}
							required
							className='border-none bg-transparent'
							style={{
								boxShadow:
									'inset 6px 6px 20px -15px rgba(36, 26, 0, 0.47), inset -6px -6px 20px  #FBF7F6',
							}}
						/>
					</div>
					<div className='space-y-2'>
						<Label htmlFor='password'>Contraseña</Label>
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
							className='border-none bg-transparent'
							style={{
								boxShadow:
									'inset 6px 6px 20px -15px rgba(36, 26, 0, 0.47), inset -6px -6px 20px  #FBF7F6',
							}}
						/>
					</div>
				</CardContent>
				<CardFooter className='mt-8'>
					<Button
						type='submit'
						className='w-full cursor-pointer border-none bg-transparent text-gray-900'
						style={{
							boxShadow:
								'-6px -6px 20px 10px #FBF7F6, 6px 6px 20px #9b9c98',
						}}
					>
						Iniciar Sesión
					</Button>
				</CardFooter>
			</form>
		</Card>
	)
}
