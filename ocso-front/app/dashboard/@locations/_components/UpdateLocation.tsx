'use client'
import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
	useDisclosure,
} from '@heroui/react'

export default function UpdateLocation({
	children,
}: {
	children: React.ReactNode
}) {
	const { isOpen, onOpen, onOpenChange } = useDisclosure()

	return (
		<>
			<Button onPress={onOpen} color='primary'>
				Editar tienda
			</Button>
			<Modal isOpen={isOpen} onOpenChange={onOpenChange}>
				<ModalContent>
					{() => (
						<>
							<ModalHeader className='flex flex-col gap-1'>
								Crear Tienda
							</ModalHeader>
							<ModalBody>{children}</ModalBody>
						</>
					)}
				</ModalContent>
			</Modal>
		</>
	)
}
