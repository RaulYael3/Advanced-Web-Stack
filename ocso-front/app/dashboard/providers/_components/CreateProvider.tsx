'use client'
import {
	Modal,
	ModalContent,
	ModalBody,
	Button,
	useDisclosure,
} from '@heroui/react'
import { ReactNode } from 'react'
import { LuPlus } from 'react-icons/lu'

export default function CreateProvider({ children }: { children: ReactNode }) {
	const { isOpen, onOpen, onOpenChange } = useDisclosure()

	return (
		<div>
			<Button onPress={onOpen} color='primary'>
				<LuPlus size='20' />
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
