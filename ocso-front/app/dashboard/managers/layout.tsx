'use client'
import ManagersCard from './_components/MaanagersCard'

export default function LayoutManagers({
	children,
	count,
}: {
	children: React.ReactNode
	count: React.ReactNode
}) {
	return (
		<>
			<div className='w-4/12 max-h-[90vh] h-[90vh] overflow-y-auto'>
				<ManagersCard />
			</div>
			<div className='w-7/12'>
				{children} {count}
			</div>
		</>
	)
}
