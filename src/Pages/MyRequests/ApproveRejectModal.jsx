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
import { brandColor } from '../../Components/CustomDesigns'
import { useState } from 'react'
import axios from 'axios'
import { api } from '../../Components/API'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
const ApproveRejectModal = ({ isOpen, onClose, id, status, afterSubmit }) => {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = () => {
    setIsLoading(true)
    const token = sessionStorage.getItem('token')
    axios
      .post(`${api}/api/alumni-request/action/${id}/${status}`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data)
        afterSubmit()
        toast.success(response.data.message)
        navigate('/my-requests')
      })
      .catch((error) => {
        console.log(error)
        toast.error(error.response.data.message)
      })
      .finally(() => {
        onClose()
        setIsLoading(false)
      })
  }

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent className='dark:bg-slate-800 dark:text-white'>
          <ModalHeader>
            {status === 'approved' ? 'Approve ?' : 'Reject ?'}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <p className='text-lg'>This action cannot be undone</p>
          </ModalBody>

          <ModalFooter className='flex gap-x-3'>
            <Button onClick={onClose}>Cancel</Button>
            <Button
              onClick={handleSubmit}
              isLoading={isLoading}
              loadingText={
                status === 'approved' ? 'Approving...' : 'Rejecting...'
              }
              _hover={{
                background:
                  status == 'approved'
                    ? brandColor.successHover
                    : brandColor.errorHover,
              }}
              background={
                status === 'approved'
                  ? `${brandColor.primary}`
                  : `${brandColor.error}`
              }
              color={'white'}
            >
              {status === 'approved' ? 'Approve' : 'Reject'}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default ApproveRejectModal
