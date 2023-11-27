import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
} from '@chakra-ui/react'
import { api } from './API'
import { brandColor } from './CustomDesign'

const SinglPostModal = ({ isOpen, onClose, announcement }) => {
  return (
    <>
      <Modal size={'full'} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent className='dark:bg-slate-900'>
          <ModalCloseButton color={brandColor.first} />
          <ModalBody
            marginTop={4}
            className='flex max-h-screen justify-center items-center'
          >
            <div className='my-3'>
              <div className='rounded-lg'>
                {announcement.attachment && (
                  <img
                    src={`${api}/api/announcement/uploads/${announcement.attachment}`}
                    alt='Announcement Attachment'
                    style={{
                      maxHeight: window.innerHeight - 100,
                      width: 'auto',
                    }}
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
