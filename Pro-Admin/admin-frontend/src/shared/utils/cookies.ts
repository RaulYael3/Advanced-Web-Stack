export const cookieUtils = {
	set: (
		name: string,
		value: string,
		options: {
			path?: string
			maxAge?: number
			secure?: boolean
			sameSite?: 'strict' | 'lax' | 'none'
		} = {}
	) => {
		const {
			path = '/',
			maxAge = 86400, // 24 horas por defecto
			secure = true,
			sameSite = 'strict',
		} = options

		document.cookie = `${name}=${value}; path=${path}; max-age=${maxAge}; ${
			secure ? 'secure;' : ''
		} samesite=${sameSite}`
	},

	get: (name: string): string | null => {
		const cookies = document.cookie.split(';')
		for (const cookie of cookies) {
			const [cookieName, cookieValue] = cookie.trim().split('=')
			if (cookieName === name) {
				return cookieValue
			}
		}
		return null
	},

	remove: (name: string, path: string = '/') => {
		document.cookie = `${name}=; path=${path}; expires=Thu, 01 Jan 1970 00:00:00 GMT`
	},
}
