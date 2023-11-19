import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
} from '@chakra-ui/react'

const SinglPostModal = ({ isOpen, onClose, announcement }) => {
  // const formattedDate = new Date(
  //   announcement.uploadDateTime
  // ).toLocaleDateString('en-US', {
  //   day: 'numeric',
  //   month: 'short',
  //   year: 'numeric',
  // })
  return (
    <>
      <Modal
        size={{ base: 'full', lg: 'xl' }}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent className='dark:bg-slate-900'>
          <ModalCloseButton />
          <ModalBody>
            <div className='p-2 my-3'>
              <div className='rounded-lg'>
                {announcement.attachment && (
                  <img
                    src={`http://localhost:3000/api/announcement/uploads/${announcement.attachment}`}
                    alt='Announcement Attachment'
                    className='rounded-lg'
                  />
                )}
              </div>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default SinglPostModal
