'use client'
import {
	Modal,
	ModalContent,
	ModalBody,
	Button,
	useDisclosure,
} from '@heroui/react'
import { LuPencil } from 'react-icons/lu'

export default function UpdateLocation({
	children,
	store,
}: {
	children: React.ReactNode
	store: string | string[] | undefined
}) {
	if (!store) return null
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
