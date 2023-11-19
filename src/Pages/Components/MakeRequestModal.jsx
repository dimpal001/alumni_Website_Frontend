import {
  Divider,
  FormControl,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Select,
  useToast,
} from '@chakra-ui/react'
import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../UserContext'
import { CButton1, LabelInput, brandColor } from './CustomDesign'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { FaUserGraduate } from 'react-icons/fa'
import { ArrowForwardIcon } from '@chakra-ui/icons'

const MakeRequestModal = ({ isOpen, title, setOpen, fetchCourse }) => {
  const { user, setUser } = useContext(UserContext)
  const navigate = useNavigate()
  const toast = useToast()
  const [degrees, setDegrees] = useState([])
  const [departments, setDepartments] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const jwtToken = sessionStorage.getItem('jwtToken')
    axios
      .get('http://localhost:3000/api/content', {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      })
      .then((response) => {
        setDegrees(response.data.degrees)
        setDepartments(response.data.departments)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  const [formData, setFormData] = useState({
    registrationNumber: '',
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

  const handleSubmit = (e) => {
    e.preventDefault()
    const {
      registrationNumber,
      department,
      admissionYear,
      completionYear,
      rollNumber,
      degree,
      cgpa,
    } = formData

    const thisYear = new Date().getFullYear()

    if (
      registrationNumber === '' ||
      department === '' ||
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
    setIsLoading(true)

    axios
      .post(
        'http://localhost:3000/api/alumni-request',
        {
          id: user._id,
          registrationNumber: formData.registrationNumber,
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
          registrationNumber: '',
          department: '',
          admissionYear: '',
          completionYear: '',
          rollNumber: '',
          degree: '',
          cgpa: '',
        })
        setIsLoading(false)
        setOpen(false)

        if (title === 'addMore') {
          toast({
            title: 'One Course added!',
            status: 'success',
            isClosable: true,
            duration: 2200,
            position: 'top',
          })
          fetchCourse()
        } else {
          toast({
            title: 'Now your are an alumni.',
            description: 'Please login again',
            status: 'success',
            isClosable: true,
            duration: 2200,
            position: 'top',
          })
          setTimeout(() => {
            setUser(null)
            sessionStorage.removeItem('jwtToken')
            sessionStorage.removeItem('user')
            sessionStorage.removeItem('content')
            navigate('/')
          }, 3000)
        }
      })
      .catch((error) => {
        setIsLoading(false)
        if (error.response) {
          if (error.response.status === 400) {
            // Invalid details or duplicate course
            if (
              error.response.data.message ===
              'Duplicate course is not available.'
            ) {
              toast({
                title: 'Duplicate Course',
                description: 'This course has already been taken.',
                status: 'error',
                isClosable: true,
                position: 'top',
              })
            } else {
              toast({
                title: 'Invalid Details',
                description: 'Please check your details and try again.',
                status: 'error',
                isClosable: true,
                position: 'top',
              })
            }
            console.error('Error:', error.response.data.message)
          } else if (error.response.status === 401) {
            // Session expired
            setUser(null)
            sessionStorage.removeItem('jwtToken')
            sessionStorage.removeItem('user')
            navigate('/')
            toast({
              title: 'Session expired!',
              description: 'You need to log in again.',
              status: 'error',
              isClosable: true,
              duration: 1800,
              position: 'top',
            })
          } else {
            // Other errors
            toast({
              title: 'Something went wrong!',
              description: 'Please try again later.',
              status: 'error',
              isClosable: true,
              duration: 2200,
              position: 'top',
            })
            console.error('Error sending request:', error)
          }
        } else {
          // Network or other errors
          toast({
            title: 'Something went wrong!',
            description: 'Please try again later.',
            status: 'error',
            isClosable: true,
            duration: 2200,
            position: 'top',
          })
          console.error('Error sending request:', error)
        }
      })
  }
  return (
    <>
      <Modal size={'2xl'} isOpen={isOpen} onClose={setOpen}>
        <ModalOverlay />
        <ModalContent margin={3} className='bg-slate-50 dark:bg-slate-800'>
          <ModalHeader className='text-slate-800 dark:text-slate-50'>
            <div className='flex'>
              <FaUserGraduate className='mt-1 mr-2' />
              <p>GradConnect</p>
            </div>
            <Divider className='mt-5' />
            <div>
              <p className='text-sm pl-5 pt-3'>
                Fill your academic details to get access of an alumni.
              </p>
            </div>
          </ModalHeader>
          <div className='flex justify-center'></div>
          <ModalCloseButton color={brandColor.first} />
          <ModalBody maxH={{ base: '600px', lg: '580px' }}>
            <form>
              <div className='grid grid-cols-1 lg:grid-cols-2 gap-x-5'>
                <FormControl className='p-2' my={2}>
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
                    {degrees &&
                      degrees.map((degree, index) => (
                        <option key={index} value={degree.name}>
                          {degree.name}
                        </option>
                      ))}
                  </Select>
                </FormControl>
                <FormControl className='p-2' my={2}>
                  {/* <FormLabel
                    className='text-slate-800 pl-1 text-xs pb-1 dark:text-slate-50'
                    my={1}
                  >
                    Departments
                  </FormLabel> */}
                  <Select
                    borderWidth={1}
                    borderColor={brandColor.dark}
                    className='bg-slate-50 dark:bg-slate-800'
                    name={'department'}
                    value={formData.department}
                    onChange={handleInputChange}
                    fontWeight={'bold'}
                    color={brandColor.first}
                  >
                    <option value=''>Select a Department</option>
                    {departments &&
                      departments.map((department, index) => (
                        <option key={index} value={department.name}>
                          {department.name}
                        </option>
                      ))}
                  </Select>
                </FormControl>
                <LabelInput
                  value={formData.registrationNumber}
                  label={'Registration Number'}
                  placeholder={'Enter your registration number'}
                  name={'registrationNumber'}
                  onChange={handleInputChange}
                />
                <LabelInput value={user.name} label={'Name'} disabled={true} />
                <LabelInput
                  value={formData.admissionYear}
                  label={'Year of Admission'}
                  placeholder={'Enter your admission year'}
                  name={'admissionYear'}
                  onChange={handleInputChange}
                />
                <LabelInput
                  value={formData.completionYear}
                  label={'Year of completion'}
                  placeholder={'Enter your completion year'}
                  name={'completionYear'}
                  onChange={handleInputChange}
                />
                <LabelInput
                  value={formData.rollNumber}
                  label={'NEHU Roll Number'}
                  placeholder={'Enter your roll number'}
                  name={'rollNumber'}
                  onChange={handleInputChange}
                />

                <LabelInput
                  value={formData.cgpa}
                  label={'CGPA'}
                  placeholder={'Enter your CGPA'}
                  name={'cgpa'}
                  onChange={handleInputChange}
                />
              </div>
              <div className='mt-3 mb-4'>
                <CButton1
                  isLoading={isLoading}
                  loadingText={'Verifying data...'}
                  type={'submit'}
                  title={'Submit'}
                  onClick={handleSubmit}
                  rightIcon={<ArrowForwardIcon />}
                  width={'100%'}
                />
              </div>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default MakeRequestModal
