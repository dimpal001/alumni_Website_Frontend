import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from '@chakra-ui/react'
import axios from 'axios'
import { api } from '../../Components/API'
import toast from 'react-hot-toast'
import { useState } from 'react'
const RemoveProfilePicModal = ({ isOpen, onClose, id, fetchDetails }) => {
  const [isLoading, setIsLoading] = useState(false)
  const handleDelete = async () => {
    setIsLoading(true)
    const token = sessionStorage.getItem('token')
    await axios
      .post(
        `${api}/api/profile/upload-profile/${id}`,
        {
          profilePic: '',
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        toast.success('Profile picture has been removed')
        fetchDetails()
      })
      .catch((error) => {
        console.log(error)
        toast.error('Failed to upload profile picture')
      })
      .finally(() => {
        onClose()
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent className='dark:bg-slate-800 dark:text-white'>
          <ModalHeader>Remove profile picture ?</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <p>This action cannot be undone</p>
          </ModalBody>

          <ModalFooter>
            <Button mr={3} onClick={onClose}>
              Close
            </Button>
            <Button
              onClick={handleDelete}
              isLoading={isLoading}
              loadingText={'Removing...'}
              colorScheme='red'
            >
              Remove
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default RemoveProfilePicModal
