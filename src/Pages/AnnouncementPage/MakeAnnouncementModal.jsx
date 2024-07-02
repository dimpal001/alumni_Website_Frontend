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
import { useContext, useState } from 'react'
import { UserContext } from '../../UserContext'
const MakeAnnouncementModal = ({ isOpen, onClose, fetchDetails }) => {
  const { user } = useContext(UserContext)
  const [image, setImage] = useState('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const handleUpload = () => {
    const token = sessionStorage.getItem('token')

    if (title === '') {
      toast.error('Enter a valid title')
      return
    }
    if (description === '') {
      toast.error('Enter a valid description')
      return
    }

    axios
      .post(
        `${api}/api/announcement/upload/${user._id}`,
        {
          name: user.name,
          title: title,
          description: description,
          attachment: image,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        fetchDetails()
        onClose()
        toast.success(response.data.message)
      })
      .catch((error) => {
        console.log(error)
        toast.error(error.response.data.message)
      })
  }

  const handleFileChange = (e) => {
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

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent className='dark:bg-slate-800 dark:text-white'>
          <ModalHeader>Make an announcement</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div className='w-full'>
              <p className='text-lg font-extrabold'>
                Submitted by <span className='text-primary'>{user.name}</span>
              </p>
              <p className='mb-5'>
                On{' '}
                <span className='text-primary'>
                  {new Date().toLocaleDateString()}
                </span>
              </p>
              <input
                placeholder='Enter a title'
                type='text'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className='bg-slate-200 w-full font-extrabold rounded-md px-5 dark:bg-slate-950 py-1 hover:border-0 hover:outline-0 focus:border-0 focus:outline-none'
              />
              <textarea
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                placeholder='Enter a description...'
                className='bg-slate-200 my-2 w-full rounded-md px-5 dark:bg-slate-950 py-3 hover:border-0 hover:outline-0 focus:border-0 focus:outline-none'
                cols='30'
                rows='7'
              ></textarea>
              <label htmlFor='attachment' className='cursor-pointer'>
                <div className='bg-primary text-center rounded-md py-1 font-bold'>
                  Add attachment
                </div>
              </label>
              <input
                className='hidden'
                onChange={handleFileChange}
                type='file'
                id='attachment'
              />
              {image && <img src={image} className='w-[80px] h-[90px]' />}
            </div>
          </ModalBody>

          <ModalFooter>
            <Button mr={3} onClick={onClose}>
              Close
            </Button>
            <Button onClick={handleUpload} colorScheme='green'>
              Upload
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default MakeAnnouncementModal
