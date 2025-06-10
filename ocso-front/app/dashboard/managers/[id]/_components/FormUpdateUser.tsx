'use client'
import updateUser from '@/actions/users/update'
import { User } from '@/entities'
import { Button, Input } from '@heroui/react'
import { generate } from 'generate-password'
import { useState } from 'react'
import { LuEye } from 'react-icons/lu'

export default function FormUpdateUser({ user }: { user: User }) {
	const { userId } = user
	const [password, setPassword] = useState<string>()
	const [visible, setVisible] = useState<boolean>(false)
	const updateUserById = updateUser.bind(null, userId)
	return (
		<form action={updateUserById} className='py-10 flex flex-col gap-2'>
			<h1 className='text-white text-xl font-bold text-center'>
				Actualizar Usuario
			</h1>
			<Input
				defaultValue={user.userEmail}
				name='userEmail'
				label='Correo de cuenta'
			/>
			<Input
				value={password}
				type={visible ? 'text' : 'password'}
				name='userPassword'
				label='Contraseña'
				endContent={
					<button
						type='button'
						onMouseUp={() => setVisible(false)}
						onMouseDown={() => setVisible(true)}
					>
						<LuEye size='30 ' />
					</button>
				}
			/>
			<Button
				color='danger'
				onPress={() => {
					setPassword(
						generate({
							length: 10,
						})
					)
				}}
			>
				Generar Contraseña
			</Button>
			<Button color='primary' type='submit'>
				Actualizar Usuario
			</Button>
		</form>
	)
}
