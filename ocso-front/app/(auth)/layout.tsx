import React from "react"

export default function AuthLayout({children}:
    Readonly<{children: React.ReactNode}>
){
    return(
        <div className="bg-cyan-50 w-screen h-screen overflow-hidden grid">
            <div className="place-content-center place-self-center">
                {children}
            </div>
        </div>
    )
}