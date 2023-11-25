import { useContext, useEffect, useRef, useState } from 'react'
import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  IconButton,
  useDisclosure,
  useToast,
} from '@chakra-ui/react'
import { CButton1, brandColor } from './CustomDesign'
import '../../App.css'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../../UserContext'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import { BiLogOutCircle } from 'react-icons/bi'
import { HiMenu } from 'react-icons/hi'
import { useDrawer } from '../../DrawerContext'
import { FaHome } from 'react-icons/fa'
import { MdHelpOutline, MdOutlineInfo } from 'react-icons/md'

const Navbar = () => {
  const [isdark, setIsdark] = useState(true)
  const toast = useToast()
  const { user, setUser } = useContext(UserContext)
  const btnRef = useRef()
  const navigate = useNavigate()
  const { openDrawer } = useDrawer()

  const { isOpen, onOpen, onClose } = useDisclosure()

  const toggleDarkMode = () => {
    const body = document.body
    body.classList.toggle('dark')
    const isDarkMode = body.classList.contains('dark')
    localStorage.setItem('darkMode', isDarkMode)
    setIsdark(!isDarkMode)
  }
  useEffect(() => {
    const isDarkMode = localStorage.getItem('darkMode') === 'true'
    const body = document.body
    if (isDarkMode) {
      body.classList.add('dark')
    } else {
      body.classList.remove('dark')
    }
  }, [])

  const handleLogout = () => {
    setUser(null)
    sessionStorage.removeItem('jwtToken')
    sessionStorage.removeItem('user')
    navigate('/')
    toast({
      title: `Logout successfully`,
      status: 'success',
      duration: 1800,
      position: 'top',
      isClosable: true,
    })
  }

  return (
    <>
      <div className='z-10 bg-slate-200 dark:border-gray-600 border-gray-300 fixed top-0 left-0 lg:px-28 items-center px-5 border-b w-full dark:bg-slate-900 flex justify-between h-16 lg:h-16'>
        <div>
          <Link to={'/'}>
            <p className='text-xl lg:text-2xl font-bold'>GradConnect</p>
            {user && (
              <p className='text-[14px] max-sm:text-[12px] text-primary font-bold'>
                Department of {user.department}
              </p>
            )}
          </Link>
        </div>
        <div className='flex items-center'>
          <IconButton
            marginTop={{ lg: '-1px' }}
            background={'transparent'}
            onClick={toggleDarkMode}
            mr={{ base: 3, md: -5 }}
            size={'md'}
            _hover={{
              background: 'transparent',
              borderWidth: 1,
              borderColor: brandColor.first,
            }}
            icon={
              isdark ? (
                <MoonIcon color={brandColor.first} />
              ) : (
                <SunIcon color={brandColor.first} />
              )
            }
          />
          <ul className='hidden lg:flex items-center justify-around font-bold w-full'>
            <NavItems onClick={handleLogout} user={user} />
          </ul>
          <div className='lg:hidden'>
            {user ? (
              <HiMenu size={28} ref={btnRef} onClick={openDrawer} />
            ) : (
              <HiMenu size={28} ref={btnRef} onClick={onOpen} />
            )}
          </div>
          <Drawer
            isOpen={isOpen}
            placement='right'
            onClose={onClose}
            finalFocusRef={btnRef}
          >
            <DrawerOverlay />
            <DrawerContent className='dark:bg-slate-900 dark:text-white'>
              <DrawerCloseButton />
              <DrawerHeader>GradConnect</DrawerHeader>

              <DrawerBody>
                <Link to={'/'} onClick={onClose}>
                  <div className='flex items-center mt-2 font-bold'>
                    <FaHome className='mr-2' />
                    <p>Home</p>
                  </div>
                </Link>
                <Link to={'/help'} onClick={onClose}>
                  <div className='flex items-center mt-2 font-bold'>
                    <MdHelpOutline className='mr-2' />
                    <p>Help</p>
                  </div>
                </Link>
                <Link to={'/about'} onClick={onClose}>
                  <div className='flex items-center mt-2 font-bold'>
                    <MdOutlineInfo className='mr-2' />
                    <p>About</p>
                  </div>
                </Link>
              </DrawerBody>
            </DrawerContent>
          </Drawer>
        </div>
      </div>
    </>
  )
}

const NavItems = ({ onClick, user }) => {
  return (
    <ul className='pl-1 lg:pl-5 flex flex-col lg:flex-row max-md:space-y-2 items-baseline font-bold'>
      <Link to='/'>
        <li>Home</li>
      </Link>
      <Link to='/help'>
        <li>Help</li>
      </Link>
      <Link to='/about'>
        <li>About</li>
      </Link>
      {user && (
        <div className='border-2 lg:border-0 rounded-lg'>
          <CButton1
            size={'sm'}
            onClick={onClick}
            rightIcon={<BiLogOutCircle size={18} />}
            title='Logout'
          />
        </div>
      )}
    </ul>
  )
}

export default Navbar
