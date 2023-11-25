import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react'
import ChangePassword from './ChangePassword'

const ChangePasswordModal = ({ isOpen, onClose }) => {
  return (
    <>
      <Modal size={'full'} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent className='dark:bg-slate-900 dark:text-white'>
          <ModalHeader>Change Password</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <ChangePassword />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default ChangePasswordModal
