import {
  Divider,
  FormControl,
  FormLabel,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Select,
  useToast,
} from '@chakra-ui/react'
import { useContext, useState } from 'react'
import { UserContext } from '../../UserContext'
import { CButton1, LabelInput, brandColor } from './CustomDesign'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { BsSendFill } from 'react-icons/bs'

const MakeRequestModal = ({ isOpen, setOpen }) => {
  const { user, setUser } = useContext(UserContext)
  const navigate = useNavigate()
  const toast = useToast()

  const [formData, setFormData] = useState({
    department: '',
    admissionYear: '',
    completionYear: '',
    rollNumber: '',
    degree: '',
    cgpa: '',
  })

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = () => {
    const {
      department,
      admissionYear,
      completionYear,
      rollNumber,
      degree,
      cgpa,
    } = formData

    const thisYear = new Date().getFullYear()

    if (
      department === '' ||
      admissionYear === '' ||
      completionYear === '' ||
      rollNumber === '' ||
      cgpa === '' ||
      degree === ''
    ) {
      toast({
        title: 'All fields are required !',
        status: 'error',
        isClosable: true,
        duration: 1800,
        position: 'top',
      })
      return
    }

    if (
      admissionYear > thisYear ||
      isNaN(admissionYear) ||
      admissionYear.length != 4
    ) {
      toast({
        title: 'Invalid admission year !',
        status: 'error',
        isClosable: true,
        duration: 1800,
        position: 'top',
      })
      return
    }

    if (isNaN(completionYear) || completionYear < admissionYear) {
      toast({
        title: 'Invalid completion year !',
        status: 'error',
        isClosable: true,
        duration: 1800,
        position: 'top',
      })
      return
    }
    if (admissionYear === completionYear) {
      toast({
        title: 'Invalid admission or completion year !',
        description: 'Admission and Completion year cannot be same.',
        status: 'error',
        isClosable: true,
        duration: 2200,
        position: 'top',
      })
      return
    }

    const jwtToken = sessionStorage.getItem('jwtToken')

    axios
      .post(
        'http://192.168.1.15:3000/api/alumni-request',
        {
          id: user._id,
          name: user.name,
          department: formData.department,
          admissionYear: formData.admissionYear,
          completionYear: formData.completionYear,
          rollNumber: formData.rollNumber,
          degree: formData.degree,
          cgpa: formData.cgpa,
        },
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      )
      .then(() => {
        setFormData({
          department: '',
          admissionYear: '',
          completionYear: '',
          rollNumber: '',
          degree: '',
          cgpa: '',
        })
        toast({
          title: 'Sent !',
          description: 'Your request has been sent to the admin.',
          status: 'success',
          isClosable: true,
          duration: 2200,
          position: 'top',
        })
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          setUser(null)
          sessionStorage.removeItem('jwtToken')
          sessionStorage.removeItem('user')
          navigate('/')
          toast({
            title: 'Session expired !',
            description: 'You need to login again.',
            status: 'error',
            isClosable: true,
            duration: 1800,
            position: 'top',
          })
          return
        }
        toast({
          title: 'Something is wrong !',
          description: 'Please try again later.',
          status: 'error',
          isClosable: true,
          duration: 2200,
          position: 'top',
        })
        console.error('Error sending request:', error)
      })
  }
  return (
    <>
      <Modal isOpen={isOpen} onClose={setOpen}>
        <ModalOverlay />
        <ModalContent className='bg-slate-50 dark:bg-slate-800'>
          <ModalHeader className='text-slate-800 dark:text-slate-50'>
            <p>Make a request</p>
          </ModalHeader>
          <div className='flex justify-center'>
            <Divider width={'90%'} />
          </div>
          <ModalCloseButton color={brandColor.first} />
          <ModalBody maxH={'470px'} overflowY={'scroll'}>
            <FormControl
              className='dark:bg-slate-900 bg-slate-200 rounded-lg p-2'
              my={3}
            >
              <FormLabel
                className='text-slate-800 text-xs pb-1 dark:text-slate-50'
                my={1}
              >
                Degree
              </FormLabel>
              <Select
                borderWidth={1}
                borderColor={brandColor.dark}
                className='bg-slate-50 dark:bg-slate-800'
                name={'degree'}
                value={formData.degree}
                onChange={handleInputChange}
                fontWeight={'bold'}
                color={brandColor.first}
              >
                <option value=''>Select a course type</option>
                <option value='BTech'>BTech</option>
                <option value='MTech'>MTech</option>
                <option value='BArch'>BArch</option>
                <option value='MArch'>MArch</option>
                <option value='BSc'>BSc</option>
                <option value='MSc'>MSc</option>
                <option value='BA'>BA</option>
                <option value='MA'>MA</option>
                <option value='BCom'>BCom</option>
                <option value='MCom'>MCom</option>
                <option value='BBA'>BBA</option>
                <option value='MBA'>MBA</option>
                <option value='BA LLB'>BA LLB</option>
                <option value='LLM'>LLM</option>
                <option value='PhD'>PhD</option>
              </Select>
            </FormControl>
            <LabelInput
              value={formData.department}
              label={'Department'}
              placeholder={'Enter the name of department'}
              name={'department'}
              onChange={handleInputChange}
            />
            <LabelInput
              value={formData.admissionYear}
              label={'Year of Admission'}
              placeholder={'Enter the admission year'}
              name={'admissionYear'}
              onChange={handleInputChange}
            />
            <LabelInput
              value={formData.completionYear}
              label={'Year of completion'}
              placeholder={'Enter the completion year'}
              name={'completionYear'}
              onChange={handleInputChange}
            />
            <LabelInput
              value={formData.rollNumber}
              label={'NEHU Roll Number'}
              placeholder={'Enter the roll number'}
              name={'rollNumber'}
              onChange={handleInputChange}
            />

            <LabelInput
              value={formData.cgpa}
              label={'CGPA'}
              placeholder={'Enter the CGPA'}
              name={'cgpa'}
              onChange={handleInputChange}
            />
            <div className='mt-3 mb-4'>
              <CButton1
                title={'Send'}
                onClick={handleSubmit}
                rightIcon={<BsSendFill />}
                width={'100%'}
              />
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default MakeRequestModal
