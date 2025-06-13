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

export const RegisterForm = () => {
	const { registerForm, setRegisterForm, register } = useAuthStore()

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		register()
	}

	return (
		<Card
			className='border-none shadow-none bg-transparent'
			style={{
				boxShadow: '-6px -6px 20px 10px #FAF7F5, 6px 6px 20px #9b9c98',
			}}
		>
			<CardHeader>
				<CardTitle className='text-brand-dark-800'>Registro</CardTitle>
				<CardDescription className='text-brand-dark-600'>
					Crea una cuenta para acceder al panel
				</CardDescription>
			</CardHeader>
			<form onSubmit={handleSubmit}>
				<CardContent className='space-y-4 gap-4'>
					<div className='space-y-2'>
						<Label htmlFor='name' className='text-brand-dark-700'>
							Nombre
						</Label>
						<Input
							id='name'
							type='text'
							value={registerForm.name}
							onChange={(e) =>
								setRegisterForm({
									...registerForm,
									name: e.target.value,
								})
							}
							required
							className='border-none bg-transparent text-brand-dark-600'
							style={{
								boxShadow:
									'inset 6px 6px 20px -15px rgba(36, 26, 0, 0.47), inset -6px -6px 20px  #FBF7F6',
							}}
						/>
					</div>
					<div className='space-y-2'>
						<Label htmlFor='email' className='text-brand-dark-700'>
							Email
						</Label>
						<Input
							id='email'
							type='email'
							value={registerForm.email}
							onChange={(e) =>
								setRegisterForm({
									...registerForm,
									email: e.target.value,
								})
							}
							required
							className='border-none bg-transparent text-brand-dark-700'
							style={{
								boxShadow:
									'inset 6px 6px 20px -15px rgba(36, 26, 0, 0.47), inset -6px -6px 20px  #FBF7F6',
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
							value={registerForm.password}
							onChange={(e) =>
								setRegisterForm({
									...registerForm,
									password: e.target.value,
								})
							}
							required
							className='border-none bg-transparent text-brand-dark-700'
							style={{
								boxShadow:
									'inset 6px 6px 20px -15px rgba(36, 26, 0, 0.47), inset -6px -6px 20px  #FBF7F6',
							}}
						/>
					</div>
					<div className='space-y-2'>
						<Label
							htmlFor='confirmPassword'
							className='text-brand-dark-700'
						>
							Confirmar Contraseña
						</Label>
						<Input
							id='confirmPassword'
							type='password'
							value={registerForm.confirmPassword}
							onChange={(e) =>
								setRegisterForm({
									...registerForm,
									confirmPassword: e.target.value,
								})
							}
							required
							className='border-none bg-transparent text-brand-dark-700'
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
						className='w-full cursor-pointer border-none bg-transparent text-brand-dark-700'
						style={{
							boxShadow:
								'-6px -6px 20px 10px #FBF7F6, 6px 6px 20px #9b9c98',
						}}
					>
						Registrarse
					</Button>
				</CardFooter>
			</form>
		</Card>
	)
}
