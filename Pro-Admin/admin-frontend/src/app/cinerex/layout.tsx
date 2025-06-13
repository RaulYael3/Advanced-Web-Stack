export default function CinerexLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<div className='h-screen pt-10 bg-brand-100'>
			<nav
				className='bg-brand-100 h-24 shadow-sm  max-w-[1240px] mx-auto border-b rounded-2xl overflow-hidden'
				style={{
					boxShadow: `-6px -6px 20px var(--color-brand-50),  6px 6px 20px -10px  var(--color-brand-700),
						inset -6px -6px 20px -5px var(--color-brand-50), inset 6px 6px 20px -10px var(--color-brand-700)
						`,
				}}
			>
				<div className='max-w-7xl h-full mx-auto px-4 sm:px-6 lg:px-8'>
					<div className='flex justify-between items-center py-3 h-full'>
						<div
							className='flex h-full w-fit items-center justify-items-start px-4 rounded-2xl border-8 border-transparent'
							style={{
								boxShadow: ` -6px -6px 20px var(--color-brand-50),  6px 6px 20px -10px var(--color-brand-700),
									inset -6px -6px 20px var(--color-brand-50), inset 6px 6px 20px -10px var(--color-brand-700)
									`,
							}}
						>
							<h1 className='text-4xl font-bold text-brand-dark-800/45'>
								Cinerex
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
