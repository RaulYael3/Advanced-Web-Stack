import {
	useDisclosure,
	Button,
	Modal,
	ModalContent,
	ModalBody,
} from '@heroui/react'
import { ReactNode } from 'react'
import { LuTrash } from 'react-icons/lu'

export default function DeleteProvider({ children }: { children: ReactNode }) {
	const { isOpen, onOpen, onOpenChange } = useDisclosure()

	return (
		<div>
			<Button onPress={onOpen} color='danger'>
				<LuTrash size='20' />
			</Button>
			<Modal
				className='bg-orange-400'
				isOpen={isOpen}
				onOpenChange={onOpenChange}
			>
				<ModalContent className='w-full'>
					{(onClose) => (
						<>
							<ModalBody>
								{children}
								<Button onPress={onClose}> Cancelar </Button>
							</ModalBody>
						</>
					)}
				</ModalContent>
			</Modal>
		</div>
	)
}
