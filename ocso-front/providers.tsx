import { HeroUIProvider } from "@heroui/react";

export default function Providers({children}: Readonly<{children: React.ReactNode}>){
    return(
        <HeroUIProvider>
            {children}
        </HeroUIProvider>
    )
}