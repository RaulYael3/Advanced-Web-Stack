import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'Cinerex',
	description: 'Donde la magia de la película se hace realidad',
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang='es'>
			<body className={inter.className}>
				<main className=''>{children}</main>
			</body>
		</html>
	)
}
