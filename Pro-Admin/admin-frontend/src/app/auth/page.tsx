'use client'

import { useState } from 'react'

import { LoginForm } from '@/features/auth/ui/LoginForm'
import { RegisterForm } from '@/features/auth/ui/RegisterForm'
import logo from '@/assets/logo.png'

export default function AuthPage() {
	const [isLogin, setIsLogin] = useState(true)

	return (
		<div className='overflow-hidden mx-auto bg-brand-100 pt-8 relativem h-screen max-h-lvh flex flex-col justify-between align-middle lg:min-w-full lg:px-0'>
			<div className='mx-auto flex w-full flex-col justify-between flex-1 sm:w-[350px] lg:w-[800px]'>
				{/* Title always at top */}
				<div className='flex flex-col space-y-2 text-center pt-8 lg:pt-0'>
					<h1 className='text-2xl font-semibold tracking-tight text-brand-dark-800'>
						{isLogin ? 'Bienvenido a Cinerex' : 'Únete a Cinerex'}
					</h1>
					<p className='text-sm text-brand-dark-800'>
						{isLogin
							? 'Ingresa tus credenciales para acceder'
							: 'Crea tu cuenta para comenzar'}
					</p>
				</div>

				{/* Forms in the center */}
				<div className='flex-1 flex items-center '>
					{/* Mobile: Show only one form */}
					<div className='lg:hidden w-full'>
						{isLogin ? <LoginForm /> : <RegisterForm />}
					</div>

					{/* Desktop: Both forms in a single card with toggle */}
					<div className='hidden lg:block w-full'>
						{/* Desktop Card Container */}
						<div
							className='bg-transparent rounded-lg p-10 relative'
							style={{
								boxShadow:
									'inset -6px -6px 20px -5px var(--color-brand-50), inset 6px 6px 20px var(--color-brand-700)',
							}}
						>
							{/* Sliding background indicator */}
							<div
								className={`absolute top-[20px] bottom-2 w-[calc(50%-40px)] h-[calc(100%-40px)] z-10 bg-contain bg-center rounded-md transition-transform duration-300 ease-in-out ${
									isLogin
										? 'translate-x-[calc(0%-15px)]'
										: 'translate-x-[calc(100%+15px)]'
								}`}
								style={{
									boxShadow:
										'-6px -6px 20px var(--color-brand-50), 6px 6px 20px var(--color-brand-700)',
									backgroundImage: `url(${logo.src})`,
								}}
							/>

							<div className='grid grid-cols-2 gap-8'>
								<LoginForm />

								<RegisterForm />
							</div>
						</div>
					</div>
				</div>

				{/* Toggle buttons for mobile - always at bottom */}
				<div className='pb-8'>
					<div
						className='relative bg-brand-100 rounded-lg p-2 overflow-hidden'
						style={{
							boxShadow:
								'inset 6px 6px 20px -10px rgba(36, 26, 0, 0.47), inset -6px -6px 20px var(--color-brand-50)',
						}}
					>
						{/* Sliding background indicator */}
						<div
							className={`absolute top-2 bottom-2 w-[calc(50%-4px)] bg-transparent rounded-md transition-transform duration-300 ease-in-out ${
								isLogin
									? 'translate-x-0'
									: 'translate-x-[calc(100%-8px)]'
							}`}
							style={{
								boxShadow:
									'-6px -6px 20px var(--color-brand-50), 6px 6px 20px -5px var(--color-brand-700)',
							}}
						/>

						{/* Buttons */}
						<div className='relative flex'>
							<button
								className={`flex-1 py-3 px-4 text-sm font-medium rounded-md transition-colors duration-300 ${
									isLogin
										? 'text-brand-dark-900'
										: 'text-brand-dark-600'
								}`}
								onClick={() => setIsLogin(true)}
							>
								Iniciar Sesión
							</button>
							<button
								className={`flex-1 py-3 px-4 text-sm font-medium rounded-md transition-colors duration-300 ${
									!isLogin
										? 'text-brand-dark-900'
										: 'text-brand-dark-600'
								}`}
								onClick={() => setIsLogin(false)}
							>
								Registrarse
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
