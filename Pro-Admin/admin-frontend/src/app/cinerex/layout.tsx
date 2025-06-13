export default function CinerexLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<div className='min-h-screen bg-gray-50'>
			<nav className='bg-white shadow-sm border-b'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
					<div className='flex justify-between items-center h-16'>
						<div className='flex items-center'>
							<h1 className='text-2xl font-bold text-gray-900'>
								🎬 Cinerex
							</h1>
						</div>
						<div className='text-sm text-gray-600'>
							Tu cine favorito
						</div>
					</div>
				</div>
			</nav>
			<main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
				{children}
			</main>
		</div>
	)
}
