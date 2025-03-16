import { HeroUIProvider } from "@heroui/system";

export default function Providers({children}: Readonly<{children: React.ReactNode}>){
    return(
        <HeroUIProvider>
            {children}
        </HeroUIProvider>
    )
}