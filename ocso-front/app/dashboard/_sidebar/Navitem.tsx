"use client"
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

interface NavItemProps {
    icon: ReactNode
    path: string
}

const NavItem = ({icon, path}: NavItemProps) => {
    const currentPath = usePathname();
        return (
        <a href={path} className={path === currentPath 
            ? "bg-cyan-300 w-full flex justify-center transition-colors py-1.5" 
            : "bg-cyan-200 w-full flex justify-center transition-colors py-1.5"
        }>
            {icon}
        </a>
    )
}

export default NavItem;