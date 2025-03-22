import Header from "./_components/Header"
import Sidebar from "./_sidebar/Sidebar"

export default function LayoutDashboard({
    children
    }:Readonly<{
        children: React.ReactNode
    }>){
    return (
        <div className="w-screen h-screen overflow-hidden grid bg-cyan-100">
            <Header />
            <div className="flex flex-row items-center">
                <Sidebar />
                {children}
            </div>
        </div>
    )
}