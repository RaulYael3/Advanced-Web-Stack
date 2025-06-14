import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl

	// Verificar si es una ruta del dashboard
	if (pathname.startsWith('/dashboard')) {
		// Obtener el token del cookie
		const token = request.cookies.get('auth-token')?.value

		// Si no hay token, redirigir al login
		if (!token) {
			return NextResponse.redirect(new URL('/auth/login', request.url))
		}

		// Aquí podrías validar el token y el rol
		// Por ahora, asumimos que si hay token, está autenticado
		// La validación del rol se hará en el cliente
	}

	return NextResponse.next()
}

export const config = {
	matcher: ['/dashboard/:path*'],
}
