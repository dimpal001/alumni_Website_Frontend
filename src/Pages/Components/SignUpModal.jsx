import {
  Divider,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  useToast,
} from '@chakra-ui/react'
import { CButton1, IconInput, brandColor } from './CustomDesign'
import { FiEye, FiEyeOff, FiUser } from 'react-icons/fi'
import { ArrowForwardIcon } from '@chakra-ui/icons'
import { MdLockPerson, MdMarkEmailRead, MdPhone } from 'react-icons/md'
import { useState } from 'react'
import axios from 'axios'

const SignUpModal = ({ open, onClose }) => {
  const toast = useToast()
  const [isSubmited, setIsSubmited] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isPassword, setIsPassword] = useState(true)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    gender: '',
    password: '',
  })

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    })
  }

  const isValidEmail = (email) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
    return emailRegex.test(email)
  }

  const toggleType = () => {
    setIsPassword(!isPassword)
  }

  const handleSubmit = async () => {
    const { name, email, phone, gender, password } = formData

    if (
      name === '' ||
      email === '' ||
      phone === '' ||
      gender === '' ||
      password === ''
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

    if (name.trim().length < 5) {
      toast({
        title: 'Invalid Full name !',
        description: 'Enter a valid Name.',
        status: 'error',
        isClosable: true,
        duration: 1800,
        position: 'top',
      })
      return
    }

    if (!isValidEmail(email)) {
      toast({
        title: 'Invalid email address !',
        description: 'Enter a valid email address.',
        status: 'error',
        isClosable: true,
        duration: 1800,
        position: 'top',
      })
      return
    }

    if (password.length < 8) {
      toast({
        title: 'Weak password !',
        description: 'Password must be at least 8 characters.',
        status: 'error',
        isClosable: true,
        duration: 2100,
        position: 'top',
      })
      return
    }

    try {
      setIsLoading(true)
      const response = await axios.post(
        'http://192.168.1.15:3000/api/auth/signup',
        {
          name: name,
          email: email,
          phone: phone,
          gender: gender,
          password: password,
        }
      )
      setIsSubmited(true)
      console.log(response.data)
      setIsLoading(false)
    } catch (error) {
      if (
        error.response &&
        error.response.data.message === 'Email is already registered.'
      ) {
        setIsLoading(false)
        toast({
          title: 'Email Id is already registered !',
          description: 'Password must be at least 8 characters.',
          status: 'error',
          isClosable: true,
          duration: 2100,
          position: 'top',
        })
        return
      } else {
        setIsLoading(false)
        toast({
          title: 'Registration Failed! Try again later!',
          status: 'error',
          isClosable: true,
          duration: 2100,
          position: 'top',
        })
        return
      }
    }
  }
  return (
    <>
      <Modal isOpen={open} onClose={onClose}>
        <ModalOverlay />
        <ModalContent className='dark:bg-slate-800' mx={3}>
          <ModalHeader color={brandColor.first}>Sign Up</ModalHeader>
          <Divider mb={3} />
          <ModalCloseButton color={brandColor.first} />
          {!isSubmited ? (
            <ModalBody>
              <IconInput
                name={'name'}
                onChange={handleInputChange}
                icon={<FiUser color={brandColor.first} size={22} />}
                placeholder={'Full name'}
              />
              <IconInput
                name={'email'}
                onChange={handleInputChange}
                icon={<MdMarkEmailRead color={brandColor.first} size={22} />}
                placeholder={'Email address'}
              />
              <IconInput
                name={'phone'}
                onChange={handleInputChange}
                icon={<MdPhone color={brandColor.first} size={22} />}
                placeholder={'Phone number'}
              />
              <Select
                name='gender'
                className='bg-slate-200 dark:bg-slate-900 '
                onChange={handleInputChange}
                color={brandColor.first}
                fontWeight={'bold'}
              >
                <option value=''>Select a Gender</option>
                <option value='male'>Male</option>
                <option value='female'>Female</option>
                <option value='other'>Other</option>
              </Select>
              <InputGroup
                className='bg-slate-200 rounded-lg dark:bg-slate-900'
                mt={4}
              >
                <InputLeftElement pointerEvents={'none'}>
                  <MdLockPerson size={22} color={brandColor.first} />
                </InputLeftElement>
                <Input
                  name={'password'}
                  onChange={handleInputChange}
                  color={brandColor.first}
                  fontWeight={'bold'}
                  fontFamily={'arial'}
                  type={isPassword ? 'password' : 'text'}
                  placeholder='New password'
                />
                <InputRightElement>
                  {isPassword ? (
                    <FiEye
                      size={18}
                      onClick={toggleType}
                      cursor={'pointer'}
                      color={brandColor.first}
                    />
                  ) : (
                    <FiEyeOff
                      size={18}
                      onClick={toggleType}
                      cursor={'pointer'}
                      color={brandColor.first}
                    />
                  )}
                </InputRightElement>
              </InputGroup>
            </ModalBody>
          ) : (
            <ModalBody>
              <p
                className='text-3xl text-center font-bold py-5'
                style={{ color: brandColor.first }}
              >
                Registration Successfull
              </p>
            </ModalBody>
          )}
          {!isSubmited && (
            <ModalFooter mt={-2} mb={4}>
              <CButton1
                width={'100%'}
                title={'Signup'}
                onClick={handleSubmit}
                isLoading={isLoading}
                loadingText={'Submitting...'}
                rightIcon={<ArrowForwardIcon />}
              />
            </ModalFooter>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}

export default SignUpModal
