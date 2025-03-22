import { Input } from "@heroui/react"

export default function SignupPage(){
    return (
        <div className="flex items-center justify-center min-h-screen bg-cyan-50">
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
                    placeholder="Email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none placeholder:text-amber-50/20 text-amber-50"
                />



                <input
                    type="password"
                    placeholder="password"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none placeholder:text-amber-50/20 text-amber-50"
                    />


                <input
                    type="password"
                    placeholder="password"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none placeholder:text-amber-50/20 text-amber-50"
                    />
            </div>
                {/* Botón de Registrarse */}
                <button className="bg-gray-300 text-neutral-800 py-1 px-4 rounded-lg cursor-pointer mt-4 place-self-center">
                Registrarse
                </button>

                <p className="text-xs pt-4 justify-self-end">¿Ya tienes cuenta? <a href="/login" className="text-blue-100 underline">Iniciar Sesion</a></p>

            </div>
        </div>
    )
}