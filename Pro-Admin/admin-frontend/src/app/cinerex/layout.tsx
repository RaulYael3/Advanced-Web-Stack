import { Header } from '@/widgets/header'
import { ProtectedRoute } from '@/components/auth/ProtectedRoute'

export default function CinerexLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<ProtectedRoute requireAdmin={false}>
			<div className='bg-brand-100 min-h-screen'>
				{/* Header global */}
				<Header />

				{/* Contenido principal */}
				<main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
					{children}
				</main>
			</div>
		</ProtectedRoute>
	)
}
