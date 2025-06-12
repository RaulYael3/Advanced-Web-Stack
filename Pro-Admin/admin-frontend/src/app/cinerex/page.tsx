export default function CinerexPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Cinerex</h1>
        <p className="mt-1 text-sm text-gray-500">
          Gestión de contenido y configuración de Cinerex
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* Tarjeta de Configuración General */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <h3 className="text-lg font-medium text-gray-900">Configuración General</h3>
            <p className="mt-1 text-sm text-gray-500">
              Configura los parámetros generales de la plataforma
            </p>
          </div>
        </div>

        {/* Tarjeta de Gestión de Contenido */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <h3 className="text-lg font-medium text-gray-900">Gestión de Contenido</h3>
            <p className="mt-1 text-sm text-gray-500">
              Administra el contenido de la plataforma
            </p>
          </div>
        </div>

        {/* Tarjeta de Estadísticas */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <h3 className="text-lg font-medium text-gray-900">Estadísticas</h3>
            <p className="mt-1 text-sm text-gray-500">
              Visualiza las estadísticas de la plataforma
            </p>
          </div>
        </div>
      </div>
    </div>
  )
} 