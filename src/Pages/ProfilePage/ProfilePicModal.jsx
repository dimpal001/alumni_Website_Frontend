import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'

const ProfilePicModal = ({ isOpen, onClose, image }) => {
  return (
    <>
      <Modal
        size={{ base: 'full', lg: 'md' }}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent className='dark:bg-slate-800 dark:text-white'>
          <ModalCloseButton />
          <ModalBody className='flex justify-center items-center' padding={0}>
            <img src={image} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default ProfilePicModal
