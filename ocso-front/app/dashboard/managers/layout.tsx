import ManagerCard from './_components/MaanagerCard'

export default function LayoutManagers({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<>
			<div className='w-4/12 max-h-[90vh] h-[90vh] overflow-y-auto'>
				<ManagerCard />
			</div>
			<div>{children}</div>
		</>
	)
}
