# Pro-Admin

## Estructura del Proyecto

Pro-Admin/
├── pro-admin/ # Backend (NestJS)
└── admin-frontend/ # Frontend Admin + Cinerex (Next.js)

yaml
Always show details

Copy

---

## 1. Configurar el Backend

Editar el archivo `.env` con tu configuración personalizada.

---

## 2. Configurar la Base de Datos

Configura PostgreSQL y asegúrate de que esté corriendo antes de iniciar el backend.

---

## 3. Configurar el Frontend

Editar `.env.local` con la URL de la API y otras variables necesarias.

---

## 🏃‍♂️ Ejecutar el Proyecto

### Desarrollo

-   **Backend**  
     Iniciar con:
    ```bash
    npm run start:dev
    Disponible en: http://localhost:4000
    ```

Frontend
Iniciar con:

bash
Always show details

Copy
npm run dev
Disponible en: http://localhost:3000

Producción
Backend: Configura y ejecuta con npm run build y npm run start:prod

Frontend: Usa Next.js build: npm run build y npm start

👥 Usuarios por Defecto
Administrador
Email: admin@cinerex.com

Password: admin123

Rol: admin

Cliente
Email: cliente@ejemplo.com

Password: cliente123

Rol: customer

🎯 Funcionalidades
Panel Administrativo (/dashboard)
✅ Gestión de Salas de Cine

✅ Creación de asientos por filas

✅ Gestión de Películas

✅ Programación de Funciones

✅ Visualización de boletos vendidos

✅ Reportes y estadísticas

Aplicación Pública (/cinerex)
✅ Catálogo de películas

✅ Selección de horarios

✅ Mapa de asientos interactivo

✅ Compra de boletos

✅ Historial de compras (/cinerex/mis-boletos)

✅ Actualización en tiempo real de asientos ocupados

🔐 Autenticación y Autorización
Roles de Usuario
Admin: Acceso completo al panel administrativo

Customer: Acceso a la aplicación pública

Protección de Rutas
/dashboard/\*: Solo administradores

/cinerex/\*: Usuarios autenticados

/auth/\*: Usuarios no autenticados

Middleware de Seguridad
🎨 Diseño UI/UX
Sistema de diseño neumórfico

Colores personalizados con CSS variables

Sombras suaves y efectos de profundidad

Componentes reutilizables con Tailwind CSS

Responsive Design

📊 Base de Datos
Entidades Principales
Users: Usuarios (admin / cliente)

Customers: Información de clientes

Rooms: Salas de cine

Seats: Asientos individuales

Movies: Películas

Screenings: Funciones / horarios

Tickets: Boletos comprados

Relaciones:
Relaciones entre entidades mediante TypeORM

🔧 Comandos Útiles
Backend
bash
Always show details

Copy
npm run start:dev
npm run build
Frontend
bash
Always show details

Copy
npm run dev
npm run build
🐳 Docker (Opcional)
Incluye configuración opcional con Docker para entorno de producción.

🚨 Solución de Problemas
Error de Conexión a Base de Datos
Verifica que PostgreSQL esté corriendo

Revisa el archivo .env

Asegúrate de que la base de datos exista

Error de CORS
Verifica NEXT_PUBLIC_API_URL en .env.local

Revisa configuración de CORS en backend

Problemas de Autenticación
Verifica JWT_SECRET

Limpia localStorage y cookies del navegador

📝 API Documentation
Swagger UI: http://localhost:4000/api

OpenAPI JSON: http://localhost:4000/api-json

🤝 Contribución
Fork del proyecto

Crear rama: git checkout -b feature/nueva-funcionalidad

Commit: git commit -m 'Agregar nueva funcionalidad'

Push: git push origin feature/nueva-funcionalidad

Abrir un Pull Request

📄 Licencia
Este proyecto está bajo la Licencia MIT. Ver el archivo LICENSE para más detalles.

🎓 Proyecto Académico
Desarrollado para el curso de Taller de Desarrollo Web Avanzado.

🛠 Tecnologías Utilizadas
Backend: NestJS, TypeORM, PostgreSQL, JWT

Frontend: Next.js 14, React, TypeScript, Tailwind CSS

Estado: Zustand

UI: Diseño neumórfico

Autenticación: JWT

Base de Datos: PostgreSQL con relaciones complejas

⭐ Si te gusta este proyecto, ¡dale una estrella en GitHub!
