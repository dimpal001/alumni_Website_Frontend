import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useToast,
} from '@chakra-ui/react'
import axios from 'axios'
import { useState } from 'react'
import { MdDeleteForever } from 'react-icons/md'
import { api } from './API'

const DeleteUser = ({
  isOpen,
  onClose,
  userId,
  onParenModalClose,
  alumniName,
}) => {
  const [isLoading, setIsLoading] = useState(false)
  const toast = useToast()

  const handleDelete = async () => {
    const jwtToken = sessionStorage.getItem('jwtToken')
    console.log(userId)
    setIsLoading(true)
    axios
      .delete(`${api}/api/auth/${userId}`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      })
      .then(() => {
        toast({
          title: 'User has been deleted !',
          status: 'success',
          isClosable: true,
          duration: 2200,
          position: 'top',
        })
        setIsLoading(false)
        onParenModalClose()
        onClose()
      })
      .catch((error) => {
        console.log(error)
        toast({
          title: 'Failed deleting user, Try again !',
          status: 'error',
          isClosable: true,
          duration: 2200,
          position: 'top',
        })
        onClose()
        setIsLoading(false)
      })
      .finally(() => {
        setIsLoading(false)
        onParenModalClose()
        onClose()
      })
  }

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent className='max-sm:mx-3 dark:bg-slate-900 dark:text-white'>
          <ModalHeader>
            Delete <span className='text-error'>{alumniName}</span> ?
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <p>This action cannot be undone !</p>
          </ModalBody>

          <ModalFooter>
            <Button size={'sm'} mr={3} onClick={onClose}>
              Close
            </Button>
            <Button
              isLoading={isLoading}
              loadingText={'Deleting...'}
              rightIcon={<MdDeleteForever size={15} />}
              background={'red.500'}
              _hover={{ background: 'red.600' }}
              color={'white'}
              size={'sm'}
              onClick={handleDelete}
            >
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default DeleteUser
