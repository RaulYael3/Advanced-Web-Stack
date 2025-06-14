/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
	theme: {
		extend: {
			colors: {
				brand: {
					50: 'var(--color-brand-50)',
					100: 'var(--color-brand-100)',
					200: 'var(--color-brand-200)',
					700: 'var(--color-brand-700)',
					dark: {
						200: 'var(--color-brand-dark-200)',
						400: 'var(--color-brand-dark-400)',
						500: 'var(--color-brand-dark-500)',
						600: 'var(--color-brand-dark-600)',
						700: 'var(--color-brand-dark-700)',
						800: 'var(--color-brand-dark-800)',
					},
				},
			},
		},
	},
	plugins: [],
}
