import { BiHome } from "react-icons/bi";
import { LuTruck, LuUser, LuUsers, LuWheat } from "react-icons/lu";
import NavItem from "./Navitem";

export default function Sidebar(){
    return(
        <nav className="w-[5vw] h-[90vh] bg-cyan-200 flex flex-col items-center pt-8 gap-10">

            <NavItem icon={<BiHome className="text-2xl"/>} path="/dashboard"/>
            <NavItem icon={<LuTruck className="text-2xl"/>} path="/dashboard/providers"/>
            <NavItem icon={<LuWheat className="text-2xl"/>} path="/dashboard/products"/>
            <NavItem icon={<LuUser className="text-2xl"/>} path="/dashboard/managers"/>
            <NavItem icon={<LuUsers className="text-2xl"/>} path="/dashboard/employees"/>

        </nav>
    )
}