import {
  Button,
  Divider,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useToast,
} from '@chakra-ui/react'
import { useContext, useState } from 'react'
import { UserContext } from '../../UserContext'
import Male from '../../assets/male.svg'
import Female from '../../assets/female.svg'
import { IoMdImages } from 'react-icons/io'
import axios from 'axios'
import { CButton1 } from './CustomDesign'

const UploadAnnouncementModal = ({ isOpen, onClose }) => {
  const { user } = useContext(UserContext)
  const toast = useToast()
  const [announcement, setAnnouncement] = useState({
    title: '',
    description: '',
    file: null,
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e) => {
    setAnnouncement({
      ...announcement,
      [e.target.name]: e.target.value,
    })
  }

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]
    const allowedExtensions = ['jpeg', 'jpg', 'png']
    const fileExtension = selectedFile.name.split('.').pop().toLowerCase()

    if (allowedExtensions.includes(fileExtension)) {
      setAnnouncement({
        ...announcement,
        file: selectedFile,
      })
    } else {
      toast({
        title: 'Invalid file format. Please select a JPEG, JPG, or PNG file.',
        status: 'error',
        isClosable: true,
        duration: 5000,
        position: 'top',
      })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (announcement.title === '') {
      toast({
        title: 'Write a title',
        status: 'error',
        isClosable: true,
        duration: 3000,
        position: 'top',
      })
      return
    }
    if (announcement.description === '') {
      toast({
        title: 'Write a description',
        status: 'error',
        isClosable: true,
        duration: 3000,
        position: 'top',
      })
      return
    }
    setIsLoading(true)

    const formData = new FormData()
    formData.append('user', user)
    formData.append('name', user.name)
    formData.append('gender', user.gender)
    formData.append('title', announcement.title)
    formData.append('description', announcement.description)
    formData.append('file', announcement.file)
    console.log(formData)

    const jwtToken = sessionStorage.getItem('jwtToken')

    await axios
      .post('http://localhost:3000/api/announcement/upload', formData, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(() => {
        toast({
          title:
            user.type === 'admin'
              ? 'Announcement has been posted.'
              : 'Announcement has been sent to the admin',
          description:
            user.type === 'alumni' &&
            'Once your announcement gets approved, it will be displayed in the announcements feed',
          status: 'success',
          isClosable: true,
          duration: 3000,
          position: 'top',
        })
        onClose()
      })
      .catch(() => {
        toast({
          title: 'Error posting your announcement.',
          status: 'error',
          isClosable: true,
          duration: 3000,
          position: 'top',
        })
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent className='dark:bg-slate-900'>
          <ModalHeader>Create announcement</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Divider className='mt-[-15px]' />
            <div>
              <div>
                <div className='flex px-2 py-2'>
                  <img
                    src={user.gender === 'male' ? Male : Female}
                    className='w-[40px]'
                    alt='User'
                  />
                  <p className=' pt-2 text-lg pl-1 font-bold'>{user.name}</p>
                </div>
                <div className='px-3 py-2'>
                  <input
                    name='title'
                    onChange={handleChange}
                    required
                    type='text'
                    placeholder='Title...'
                    className='px-3 font-bold placeholder:font-normal focus:outline-none dark:bg-slate-800 py-1 w-full rounded-md'
                  />
                </div>
                <div className='px-3 py-2'>
                  <textarea
                    name='description'
                    onChange={handleChange}
                    required
                    cols='30'
                    rows='5'
                    placeholder='Description...'
                    className='px-3 font-bold placeholder:font-normal focus:outline-none dark:bg-slate-800 py-1 w-full rounded-md'
                  ></textarea>
                </div>
                <div className='px-3'>
                  <label htmlFor='attachment'>
                    <input
                      className='hidden'
                      type='file'
                      id='attachment'
                      name='file'
                      onChange={handleFileChange}
                      accept='image/jpeg, image/jpg, image/png' // Specify accepted file types
                      required
                    />
                    <Button
                      className='w-full cursor-pointer dark:bg-slate-800'
                      size={'sm'}
                      leftIcon={<IoMdImages size={20} />}
                      as='span'
                    >
                      Add attachment
                    </Button>
                  </label>
                </div>
                {announcement.file && (
                  <div className='px-3 py-2'>
                    <img
                      src={URL.createObjectURL(announcement.file)}
                      alt='Selected Image'
                      className='max-w-[100px] max-h-[100px] object-cover rounded-md'
                    />
                  </div>
                )}
                <div className='px-3 py-4'>
                  <CButton1
                    onClick={handleSubmit}
                    size={'sm'}
                    width={'100%'}
                    title={'Post'}
                    isLoading={isLoading}
                    loadingText={'Posting...'}
                  />
                </div>
              </div>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default UploadAnnouncementModal
