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
const DeleteAlumniModal = ({
  isOpen,
  onClose,
  alumniId,
  alumniName,
  fetchDetails,
}) => {
  const [isLoading, setIsLoading] = useState(false)
  const handleDelete = () => {
    setIsLoading(true)
    const token = sessionStorage.getItem('token')
    axios
      .delete(`${api}/api/auth/delete/${alumniId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data)
        fetchDetails()
        onClose()
        toast.success(response.data.message)
      })
      .catch((error) => {
        console.log(error)
        toast.error(error.response.data.message)
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
          <ModalHeader>
            Delete <span className='text-primary'>{alumniName}</span>{' '}
            permanently ?
          </ModalHeader>
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
              loadingText={'Deleting...'}
              colorScheme='red'
            >
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default DeleteAlumniModal
