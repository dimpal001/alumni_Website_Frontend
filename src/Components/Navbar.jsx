import { Link, useNavigate } from 'react-router-dom'
import { useContext, useEffect, useRef, useState } from 'react'
import { UserContext } from '../UserContext'
import { CButton, brandColor } from './CustomDesigns'
import toast from 'react-hot-toast'
import { BiLogOut } from 'react-icons/bi'
import { HiMenuAlt4 } from 'react-icons/hi'
import { FaGraduationCap } from 'react-icons/fa6'
import {
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  IconButton,
  useDisclosure,
} from '@chakra-ui/react'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'
const Navbar = () => {
  const { user, setUser } = useContext(UserContext)
  const [isdark, setIsdark] = useState(true)
  console.log(user)
  const navigate = useNavigate()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = useRef()

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
    toast.success('Logout successfull')
    sessionStorage.clear()
    navigate('/')
  }

  return (
    <div>
      <div className='bg-transparent border-b-[1px] dark:border-gray-700 backdrop-blur-sm h-[70px] fixed z-10 w-full justify-between flex items-center px-5 lg:px-16 '>
        <div>
          <Link to={'/'}>
            <div className='flex hover:text-primary items-center'>
              <FaGraduationCap size={25} />
              <p className='text-2xl font-bold pl-2'>GradeConnect</p>
            </div>
          </Link>
        </div>
        <IconButton
          marginTop={{ lg: '-1px' }}
          background={'transparent'}
          className='lg:hidden'
          onClick={toggleDarkMode}
          display={{ base: 'block', md: 'none' }}
          size={'md'}
          _hover={{
            background: 'transparent',
            borderWidth: 1,
            borderColor: brandColor.first,
          }}
          icon={
            isdark ? (
              <MoonIcon color={brandColor.primary} />
            ) : (
              <SunIcon color={brandColor.primary} />
            )
          }
        />
        <div className=' max-sm:hidden flex gap-5 items-center'>
          <IconButton
            marginTop={{ lg: '-1px' }}
            background={'transparent'}
            className='lg:hidden'
            onClick={toggleDarkMode}
            display={{ base: 'none', md: 'block' }}
            size={'md'}
            _hover={{
              background: 'transparent',
              borderWidth: 1,
              borderColor: brandColor.first,
            }}
            icon={
              isdark ? (
                <MoonIcon boxSize={4} color={brandColor.primary} />
              ) : (
                <SunIcon boxSize={4} color={brandColor.primary} />
              )
            }
          />
          <NavItem handleLogout={handleLogout} user={user} />
        </div>
        <div className='md:hidden'>
          <HiMenuAlt4 size={30} ef={btnRef} onClick={onOpen} />
        </div>

        <Drawer
          size={'full'}
          isOpen={isOpen}
          placement='right'
          onClose={onClose}
          finalFocusRef={btnRef}
        >
          <DrawerOverlay />
          <DrawerContent className='dark:bg-slate-950 dark:text-white'>
            <DrawerCloseButton color={brandColor.primary} />
            <DrawerHeader>GradConnect</DrawerHeader>

            <DrawerBody>
              <Divider mb={4} />
              <div className='flex flex-col pb-24 justify-between h-full'>
                <div className='flex flex-col gap-y-7 font-bold'>
                  <NavItem
                    handleLogout={handleLogout}
                    onclick={onClose}
                    user={user}
                  />
                </div>
                <div>
                  {!user ? (
                    <Link onClick={onClose} to={'/login'}>
                      <CButton width={'100%'} title={'Login'} />
                    </Link>
                  ) : (
                    <CButton
                      rightIcon={<BiLogOut size={20} />}
                      width={'100%'}
                      onClick={() => {
                        handleLogout()
                        onClose()
                      }}
                      title={'Logout'}
                    />
                  )}
                </div>
              </div>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </div>
    </div>
  )
}

const NavItem = ({ user, handleLogout, onclick }) => {
  return (
    <>
      <Link onClick={onclick} className='hover:text-primary' to={'/'}>
        Home
      </Link>
      {!user && (
        <Link
          onClick={onclick}
          className='hover:text-primary'
          to={'/registration'}
        >
          Register
        </Link>
      )}
      {!user && (
        <Link
          onClick={onclick}
          className='hover:text-primary max-sm:hidden'
          to={'/login'}
        >
          Login
        </Link>
      )}
      {user && user.type === 'alumni' && (
        <Link
          onClick={onclick}
          className='hover:text-primary'
          to={`/profile/${user._id}`}
        >
          Profile
        </Link>
      )}
      {user && user.type != 'guest' && (
        <Link
          onClick={onclick}
          className='hover:text-primary'
          to={`/announcement`}
        >
          Announcement
        </Link>
      )}
      {user && user.type === 'admin' && (
        <Link
          onClick={onclick}
          className='hover:text-primary'
          to={'/admin-dashboard'}
        >
          Dashboard
        </Link>
      )}
      {user && (
        <Link
          onClick={onclick}
          to={'/my-requests'}
          className='hover:text-primary'
        >
          {user.type === 'admin' ? 'User Requests' : 'My Requests'}
        </Link>
      )}
      <div className='max-sm:hidden'>
        {user && (
          <CButton
            title={'Logout'}
            rightIcon={<BiLogOut size={18} />}
            onClick={handleLogout}
            size={'sm'}
          />
        )}
      </div>
    </>
  )
}

export default Navbar
