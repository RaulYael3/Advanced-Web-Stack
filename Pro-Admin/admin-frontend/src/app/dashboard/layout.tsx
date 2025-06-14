import { Sidebar } from '@/widgets/sidebar'
import { Header } from '@/widgets/header'
import { ProtectedRoute } from '@/components/auth/ProtectedRoute'

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<ProtectedRoute requireAdmin={true}>
			<div className='min-h-screen bg-background'>
				<Header />
				<div className='flex'>
					<Sidebar />
					<main className='flex-1 p-6'>{children}</main>
				</div>
			</div>
		</ProtectedRoute>
	)
}
