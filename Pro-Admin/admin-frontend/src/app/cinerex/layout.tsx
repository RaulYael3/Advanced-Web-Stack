import { Header } from '@/widgets/header'

export default function CinerexLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<div className='pt-10 bg-brand-100 h-screen'>
			{/* Header global */}
			<Header />

			{/* Contenido principal */}
			<main className='max-w-7xl mx-auto  px-4 sm:px-6 lg:px-8 py-8'>
				{children}
			</main>
		</div>
	)
}
