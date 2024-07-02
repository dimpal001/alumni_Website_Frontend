import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'
import DemoImg from '../../assets/user.png'
import { useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { api } from '../../Components/API'
import { CButton } from '../../Components/CustomDesigns'

const ChangeProfileModal = ({ isOpen, onClose, id, fetchDetails }) => {
  const [image, setImage] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const [imageName, setImageName] = useState('')

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]

    const fileSizeInKB = selectedFile.size / 1024
    if (fileSizeInKB > 100) {
      toast.error('Image size should be below 100kb')
      return
    }
    setImageName(selectedFile.name)

    var reader = new FileReader()
    reader.readAsDataURL(e.target.files[0])
    reader.onload = () => {
      console.log(reader.result)
      setImage(reader.result)
    }
    reader.onerror = (error) => {
      console.log(error)
    }
  }

  const handleUpload = async () => {
    if (image === '') {
      toast.error('Select an image')
      return
    }
    try {
      const token = sessionStorage.getItem('token')
      setIsLoading(true)
      await axios
        .post(
          `${api}/api/profile/upload-profile/${id}`,
          {
            profilePic: image,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          toast.success(response.data.message)
          fetchDetails()
        })
        .catch((error) => {
          console.log(error)
          toast.error('Failed to upload profile picture')
        })
        .finally(() => {
          onClose()
          setIsLoading(false)
        })
    } catch (error) {
      console.error('Error uploading profile picture:', error)
    }
  }

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent className='dark:bg-slate-800 dark:text-white'>
          <ModalHeader>Change profile picture</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div className='w-full'>
              <div className='flex justify-center'>
                <div className='flex w-[200px] border rounded-md justify-center '>
                  <img
                    className='w-[200px] rounded-md'
                    src={image ? image : DemoImg}
                    alt=''
                  />
                </div>
              </div>
              <label htmlFor='image'>
                <div className='border hover:bg-primary cursor-pointer text-center mt-3 p-3 rounded-md'>
                  {' '}
                  Select an image{' '}
                </div>
              </label>
              <input
                id='image'
                className='hidden mt-3'
                type='file'
                accept='image/jpeg, image/png, image/jpg'
                name='profilePicture'
                onChange={handleFileChange}
              />
              {imageName && (
                <p className='mt-2 text-center text-sm text-gray-500'>
                  Selected Image: {imageName}
                </p>
              )}
            </div>
          </ModalBody>

          <ModalFooter>
            <CButton
              width={'100%'}
              onClick={handleUpload}
              isLoading={isLoading}
              loadingText={'Uploading...'}
              title={'Upload'}
            />
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default ChangeProfileModal
