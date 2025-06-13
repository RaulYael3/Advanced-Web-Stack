/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
	theme: {
		extend: {
			colors: {
				brand: {
					900: '#7b7d79',
					800: '#9b9c98',
					700: '#bbbbb6',
					600: '#dad9d5',
					500: '#f9f7f3',
					400: '#faf7f5',
					300: '#fbf7f6',
					200: '#fcf8f8',
					100: '#fdf9fa',
				},
			},
		},
	},
	plugins: [],
}
