import { useContext, useEffect, useState } from 'react'
import {
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  useToast,
} from '@chakra-ui/react'
import { CButton1, brandColor } from './CustomDesign'
import { CgMenuRightAlt } from 'react-icons/cg'
import '../../App.css'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../../UserContext'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import { BiLogOutCircle } from 'react-icons/bi'

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [isdark, setIsdark] = useState(true)
  const toast = useToast()
  const { user, setUser } = useContext(UserContext)
  const navigate = useNavigate()

  const closeMenu = () => {
    setMenuOpen(false)
  }

  const toggleDarkMode = () => {
    const body = document.body
    body.classList.toggle('dark')
    const isDarkMode = body.classList.contains('dark')
    localStorage.setItem('darkMode', isDarkMode)
    setIsdark(!isDarkMode)
    closeMenu()
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
            <NavItems
              closeMenu={closeMenu}
              onClick={handleLogout}
              user={user}
            />
          </ul>
          <div className='flex lg:hidden items-center'>
            <Menu
              isOpen={menuOpen}
              onOpen={() => setMenuOpen(true)}
              onClose={() => setMenuOpen(false)}
            >
              <MenuButton
                borderColor={brandColor.first}
                as={IconButton}
                _hover={{ background: 'transparent' }}
                borderWidth={2}
                icon={<CgMenuRightAlt size={25} color={brandColor.first} />}
                variant='outline'
                onClick={() => setMenuOpen(!menuOpen)}
              />
              <MenuList background={brandColor.dark}>
                <NavItems closeMenu={closeMenu} />
              </MenuList>
            </Menu>
          </div>
        </div>
      </div>
    </>
  )
}

const NavItems = ({ closeMenu, onClick, user }) => {
  return (
    <ul className='pl-1 lg:pl-5 flex flex-col lg:flex-row max-md:space-y-2 items-baseline font-bold'>
      <Link to='/' onClick={closeMenu}>
        <li>Home</li>
      </Link>
      <Link to='/help' onClick={closeMenu}>
        <li>Help</li>
      </Link>
      <Link to='/about' onClick={closeMenu}>
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
