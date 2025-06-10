'use client'
import {
	Modal,
	ModalContent,
	ModalBody,
	Button,
	useDisclosure,
	Image,
} from '@heroui/react'
import { ReactNode } from 'react'

export default function CreateEmployee({
	children,
	icon,
	photo,
}: {
	children: ReactNode
	icon: ReactNode
	photo: string | undefined
}) {
	const { isOpen, onOpen, onOpenChange } = useDisclosure()

	return (
		<div>
			<Image
				src={photo}
				onClick={onOpen}
				isZoomed
				className='object-cover'
				classNames={{
					img: 'size-60',
				}}
			/>
			<Modal
				className='bg-orange-400'
				isOpen={isOpen}
				onOpenChange={onOpenChange}
			>
				<ModalContent className='w-full'>
					{() => (
						<>
							<ModalBody>{children}</ModalBody>
						</>
					)}
				</ModalContent>
			</Modal>
		</div>
	)
}
