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
  ModalHeader,
  ModalOverlay,
  useToast,
} from '@chakra-ui/react'
import { CButton1, IconInput, brandColor } from './CustomDesign'
import { MdMarkEmailRead, MdLockPerson } from 'react-icons/md'
import { useContext, useState } from 'react'
import axios from 'axios'
import { UserContext } from '../../UserContext'
import { FiEye, FiEyeOff } from 'react-icons/fi'
import { BiLogInCircle } from 'react-icons/bi'

const LoginModal = ({ open, onClose }) => {
  const toast = useToast()
  const { setUser } = useContext(UserContext)
  const [isLoading, setIsLoading] = useState(false)
  const [isPassword, setIsPassword] = useState(true)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    })
  }

  const toggleType = () => {
    setIsPassword(!isPassword)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const { email, password } = formData
    if (email === '' || password === '') {
      toast({
        title: 'All fields are a required !',
        status: 'error',
        isClosable: true,
        duration: 2100,
        position: 'top',
      })
      return
    }

    setIsLoading(true)
    axios
      .post('http://localhost:3000/api/auth/login', {
        email: formData.email,
        password: formData.password,
      })
      .then((response) => {
        const userDetails = response.data.user

        const jwtToken = response.data.token

        sessionStorage.setItem('jwtToken', jwtToken)
        sessionStorage.setItem('user', JSON.stringify(userDetails))
        setUser(userDetails)

        toast({
          title: 'Login successfull !',
          status: 'success',
          isClosable: true,
          duration: 2100,
          position: 'top',
        })
        onClose()
      })
      .catch((error) => {
        if (
          error.response.data.message === 'User not found.' ||
          error.response.data.message === 'Invalid password.'
        ) {
          toast({
            title: 'Invalid Username or Password !',
            status: 'error',
            isClosable: true,
            duration: 2100,
            position: 'top',
          })
          return
        } else {
          toast({
            title: 'Unable to proceed. Try again later !',
            status: 'error',
            isClosable: true,
            duration: 2100,
            position: 'top',
          })
        }
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  return (
    <>
      <Modal isOpen={open} onClose={onClose}>
        <ModalOverlay />
        <ModalContent className='dark:bg-slate-800' mx={3}>
          <ModalHeader color={brandColor.first}>
            Login to your account
          </ModalHeader>
          <Divider mb={3} />
          <ModalCloseButton color={brandColor.first} />
          <ModalBody>
            <form>
              <IconInput
                autoFocus={true}
                name={'email'}
                onChange={handleInputChange}
                icon={<MdMarkEmailRead size={22} color={brandColor.first} />}
                placeholder={'Enter your email address'}
              />
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
                  placeholder='Enter your password'
                />
                <InputRightElement>
                  {isPassword ? (
                    <FiEye
                      size={18}
                      cursor={'pointer'}
                      color={brandColor.first}
                      onClick={toggleType}
                    />
                  ) : (
                    <FiEyeOff
                      size={18}
                      cursor={'pointer'}
                      color={brandColor.first}
                      onClick={toggleType}
                    />
                  )}
                </InputRightElement>
              </InputGroup>
              <div className='mt-4 mb-7'>
                <CButton1
                  type={'submit'}
                  rightIcon={<BiLogInCircle size={25} />}
                  width={'100%'}
                  onClick={handleSubmit}
                  isLoading={isLoading}
                  title={'Login'}
                />
              </div>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default LoginModal
