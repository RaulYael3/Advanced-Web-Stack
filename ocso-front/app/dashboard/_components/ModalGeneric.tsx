'use client'
import {
	Modal,
	ModalContent,
	ModalBody,
	Button,
	useDisclosure,
} from '@heroui/react'
import { ReactNode } from 'react'

export default function ModalGeneric({
	children,
	icon,
}: {
	children: ReactNode
	icon: ReactNode
}) {
	const { isOpen, onOpen, onOpenChange } = useDisclosure()

	return (
		<div>
			<Button color='primary' onPress={onOpen}>
				{icon}
			</Button>
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
