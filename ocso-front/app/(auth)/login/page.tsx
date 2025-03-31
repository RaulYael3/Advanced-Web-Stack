import { API_URL } from "@/constants"
import axios from "axios"
import React from "react"

export default  function LoginPage(){
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const {data} = await axios.post(`${API_URL}/auth/login`, formData)
        return
    }

    return (
        <form className="flex items-center justify-center min-h-screen bg-cyan-50">
        {/* Contenedor principal con fondo naranja */}
        <div className="bg-cyan-700 p-6 rounded-lg w-full max-w-sm">
          {/* Título */}
            <h2 className="text-xl font-bold mb-4 text-white">
                Registrarse en la plataforma
            </h2>

          {/* Campo de Email */}
            <div className="mb-4 flex flex-col gap-4">

                <input 
                    type="email"
                    name="userEmail"
                    placeholder="Email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none placeholder:text-amber-50/20 text-amber-50"
                />



                <input
                    type="password"
                    name="userPassword"
                    placeholder="password"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none placeholder:text-amber-50/20 text-amber-50"
                    />

            </div>
                {/* Botón de Registrarse */}
                <button className="bg-gray-300 text-neutral-800 py-1 px-4 rounded-lg cursor-pointer mt-4 justify-self-center">
                Registrarse
                </button>

                <p className="text-xs pt-4 justify-self-end">Aun no tienes cuenta? <a href="/signup" className="text-blue-100 underline">Registrate</a></p>

            </div>
        </form>
    )
}