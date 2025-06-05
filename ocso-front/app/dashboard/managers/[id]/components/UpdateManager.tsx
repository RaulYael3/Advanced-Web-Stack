'use client'
import {
	Modal,
	ModalContent,
	ModalBody,
	Button,
	useDisclosure,
} from '@heroui/react'
import { LuPencil } from 'react-icons/lu'

export default function UpdateManager({
	children,
}: {
	children: React.ReactNode
}) {
	const { isOpen, onOpen, onOpenChange } = useDisclosure()

	return (
		<>
			<Button onPress={onOpen} color='primary'>
				<LuPencil size='20' />
			</Button>
			<Modal
				isOpen={isOpen}
				className='bg-orange-400'
				onOpenChange={onOpenChange}
			>
				<ModalContent>
					{() => (
						<>
							<ModalBody>{children}</ModalBody>
						</>
					)}
				</ModalContent>
			</Modal>
		</>
	)
}
