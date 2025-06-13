'use client'

import { useState } from 'react'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { LoginForm } from '@/features/auth/ui/LoginForm'
import { RegisterForm } from '@/features/auth/ui/RegisterForm'

export default function AuthPage() {
	const [isLogin, setIsLogin] = useState(true)

	return (
		<div className=' bg-brand-600 py-2 relativem min-h-svh max-h-lvh flex-col justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0'>
			<div className='relative hidden h-full flex-col bg-brand-800 p-10 text-brand-dark-800 lg:flex dark:border-r'>
				<div className='absolute inset-0 bg-brand-900/90' />
				<div className='relative z-20 flex items-center text-lg font-medium'>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						viewBox='0 0 24 24'
						fill='none'
						stroke='currentColor'
						strokeWidth='2'
						strokeLinecap='round'
						strokeLinejoin='round'
						className='mr-2 h-6 w-6'
					>
						<path d='M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3' />
					</svg>
					Cinerex
				</div>
				<div className='relative z-20 mt-auto'>
					<blockquote className='space-y-2'>
						<p className='text-lg'>
							Donde la magia de la película se hace realidad
						</p>
					</blockquote>
				</div>
			</div>
			<div className='lg:p-8 flex flex-col lg:min-h-0'>
				<div className='mx-auto flex w-full flex-col justify-between flex-1 sm:w-[350px]'>
					{/* Title always at top */}
					<div className='flex flex-col space-y-2 text-center pt-8 lg:pt-0'>
						<h1 className='text-2xl font-semibold tracking-tight text-brand-dark-800'>
							{isLogin
								? 'Bienvenido a Cinerex'
								: 'Únete a Cinerex'}
						</h1>
						<p className='text-sm text-brand-dark-800'>
							{isLogin
								? 'Ingresa tus credenciales para acceder'
								: 'Crea tu cuenta para comenzar'}
						</p>
					</div>

					{/* Forms in the center */}
					<div className='flex-1 flex items-center'>
						{/* Mobile: Show only one form */}
						<div className='lg:hidden w-full'>
							{isLogin ? <LoginForm /> : <RegisterForm />}
						</div>

						{/* Desktop: Show both forms with separator */}
						<div className='hidden lg:block space-y-6 w-full'>
							<LoginForm />
							<RegisterForm />
						</div>
					</div>

					{/* Toggle buttons for mobile - always at bottom */}
					<div className='lg:hidden pb-8'>
						<div
							className='relative bg-brand-500 rounded-lg p-2'
							style={{
								boxShadow:
									'inset 6px 6px 20px -15px rgba(36, 26, 0, 0.47), inset -6px -6px 20px #FBF7F6',
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
										'-6px -6px 20px 10px #FBF7F6, 6px 6px 20px #9b9c98',
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
		</div>
	)
}
