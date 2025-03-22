import { ReactNode } from "react";

interface NavItemProps {
    icon: ReactNode
    path: string
}

const NavItem = ({icon, path}: NavItemProps) => {
    return (
        <a href={path}>
            {icon}
        </a>
    )
}

export default NavItem;