import Header from "./_components/Header"
import Sidebar from "./_components/_sidebar/Sidebar"

export default function LayoutDashboard({
    children,
    locations
    }:Readonly<{
        children: React.ReactNode
        locations: React.ReactNode
    }>){
    return (
        <div className="w-screen h-screen overflow-hidden grid bg-cyan-100">
            <Header />
            <div className="flex flex-row items-center">
                <Sidebar />
                {children}
                {locations && <div>{locations}</div>}
            </div>
        </div>
    )
}