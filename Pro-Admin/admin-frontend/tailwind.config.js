/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                brand: {
                    bg900: '#7b7d79',
                    bg800: '#9b9c98',
                    bg700: '#bbbbb6',
                    bg600: '#dad9d5',
                    bg500: '#f9f7f3',
                    bg400: '#faf7f5',   
                    bg300: '#fbf7f6',
                    bg200: '#fcf8f8',
                    bg100: '#fdf9fa',
                }
            }
        },
    },
    plugins: [],
}
