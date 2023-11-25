import {
  Checkbox,
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
  Select,
  useToast,
} from '@chakra-ui/react'
import { CButton1, IconInput, brandColor } from './CustomDesign'
import { FiEye, FiEyeOff, FiUser } from 'react-icons/fi'
import { MdLockPerson, MdMarkEmailRead, MdPhone } from 'react-icons/md'
import { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { BiUserCircle } from 'react-icons/bi'
import { api } from './API'
import { UserContext } from '../../UserContext'
import { RiCheckboxMultipleFill } from 'react-icons/ri'

const SignUpModal = ({ title, open, onClose }) => {
  const toast = useToast()
  const { user } = useContext(UserContext)
  const [isSubmited, setIsSubmited] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [departments, setDepartments] = useState([])
  const [isPassword, setIsPassword] = useState(true)
  const [checked, setChecked] = useState(false)

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    gender: '',
    department: '',
    password: '',
  })

  const fetchDepartments = () => {
    axios
      .get(`${api}/api/departments`)
      .then((response) => {
        setDepartments(response.data.departments)
        console.log(departments)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  useEffect(() => {
    fetchDepartments()
    console.log(departments)
  }, [])

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

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { name, email, phone, gender, department, password } = formData

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

    if (title === 'createAdmin' && checked && department === '') {
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
      const jwtToken = sessionStorage.getItem('jwtToken')
      setIsLoading(true)
      const response = await axios.post(
        title === 'createAdmin'
          ? `${api}/api/auth/create-admin`
          : `${api}/api/auth/signup`,
        {
          name: name,
          email: email,
          phone: phone,
          department:
            title != 'createAdmin'
              ? department
              : checked
              ? department
              : user.department,
          gender: gender,
          password: password,
        },
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      )
      setIsSubmited(true)
      console.log(response.data)
      setIsLoading(false)
    } catch (error) {
      console.log(error)
      setIsLoading(false)
      if (
        error.response &&
        error.response.data.message === 'Email is already registered.'
      ) {
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
      <Modal isOpen={open} size={{ base: 'full', md: 'md' }} onClose={onClose}>
        <ModalOverlay />
        <ModalContent className='dark:bg-slate-900' mx={{ md: 3 }}>
          {!isSubmited && (
            <div>
              <ModalHeader color={brandColor.first}>
                {title === 'createAdmin' ? 'Create a new admin' : 'Sign Up'}
              </ModalHeader>
              <Divider mb={3} />
            </div>
          )}
          <ModalCloseButton color={brandColor.first} />
          {!isSubmited ? (
            <ModalBody>
              <form>
                {title != 'createAdmin' && (
                  <p className='p-0 text-primary text-[15px] text-center m-0'>
                    Name should be same as the Degree record !
                  </p>
                )}
                {title === 'createAdmin' && (
                  <Checkbox
                    className='pl-1 font-bold dark:text-white'
                    isChecked={checked}
                    onChange={(e) => setChecked(e.target.checked)}
                  >
                    For New Department
                  </Checkbox>
                )}
                {title === 'createAdmin' && checked && (
                  <IconInput
                    name={'department'}
                    onChange={handleInputChange}
                    icon={
                      <RiCheckboxMultipleFill
                        color={brandColor.first}
                        size={22}
                      />
                    }
                    placeholder={'Department name'}
                  />
                )}
                {title != 'createAdmin' && (
                  <Select
                    name='department'
                    className='bg-slate-200 mt-5 dark:bg-slate-900 '
                    onChange={handleInputChange}
                    color={brandColor.first}
                    fontWeight={'bold'}
                  >
                    <option value=''>Select a Department</option>
                    {departments &&
                      departments.map((department, index) => (
                        <option key={index} value={department.name}>
                          {department.name}
                        </option>
                      ))}
                  </Select>
                )}
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
                  className='bg-transparent'
                  onChange={handleInputChange}
                  color={brandColor.first}
                  fontWeight={'bold'}
                >
                  <option value=''>Select a Gender</option>
                  <option value='male'>Male</option>
                  <option value='female'>Female</option>
                  <option value='other'>Other</option>
                </Select>
                <InputGroup className='bg-transparent rounded-lg ' mt={4}>
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
                {!isSubmited && (
                  <div className='mt-4 mb-7'>
                    <CButton1
                      type={'submit'}
                      width={'100%'}
                      title={title === 'createAdmin' ? 'Create' : 'Signup'}
                      onClick={handleSubmit}
                      isLoading={isLoading}
                      loadingText={
                        title === 'createAdmin'
                          ? 'Creating...'
                          : 'Submitting...'
                      }
                      rightIcon={<BiUserCircle size={25} />}
                    />
                  </div>
                )}
                {checked && (
                  <p className='text-primary font-bold max-sm:pt-10 text-center'>
                    One new department will be added.
                  </p>
                )}
              </form>
            </ModalBody>
          ) : (
            <ModalBody>
              <p
                className='text-3xl text-center font-bold py-5'
                style={{ color: brandColor.first }}
              >
                {title === 'createAdmin'
                  ? 'A new admin has been created'
                  : 'Registration Successfull'}
              </p>
            </ModalBody>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}

export default SignUpModal
