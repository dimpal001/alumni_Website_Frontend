import { useContext, useEffect, useState } from 'react'
import {
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  VStack,
} from '@chakra-ui/react'
import ProfilePage from '../ProfilePage'
import PostPage from '../PostPage'
import AlumniList from '../AlumniList'
import { UserContext } from '../../UserContext'
import { FaHome, FaListAlt, FaUserAlt } from 'react-icons/fa'
import { FiList, FiUser } from 'react-icons/fi'
import DashboardPage from '../DashboardPage'
import { AiTwotoneNotification } from 'react-icons/ai'
import { RiLockPasswordFill } from 'react-icons/ri'
import ChangePassword from './ChangePassword'
import { useDrawer } from '../../DrawerContext'
import { CButton1 } from './CustomDesign'
import { BiLogOutCircle } from 'react-icons/bi'

const Dashboard = () => {
  const [selectedComponent, setSelectedComponent] = useState('Dashboard')
  const { user, setUser } = useContext(UserContext)
  const { isDrawerOpen, closeDrawer } = useDrawer()

  useEffect(() => {
    if (isDrawerOpen) {
      closeDrawer()
    }
  }, [])

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
    document.title = `${
      user.type === 'admin'
        ? 'Admin'
        : user.type === 'alumni'
        ? 'Alumni'
        : 'User'
    } Dashboard`
  }, [user.type])

  const isActive = (componentName) => componentName === selectedComponent

  return (
    <Flex mt={5} mx={'auto'}>
      <Box
        w='280px'
        className=' bg-slate-50 max-md:hidden dark:bg-slate-800 rounded-lg'
        p='5'
        zIndex={5}
        position='fixed'
      >
        <VStack spacing='4'>
          <button
            className={`w-[100%] rounded-lg dark:border-slate-800 border-slate-400  py-2 font-bold text-left px-5 ${
              isActive('Dashboard') && ' bg-primary text-white'
            }`}
            onClick={() => setSelectedComponent('Dashboard')}
          >
            <div className='flex gap-3'>
              <FaHome size={20} />
              Dashboard
            </div>
          </button>
          {user.type != 'user' && (
            <button
              className={`w-[100%] rounded-lg dark:border-slate-800 border-slate-400  py-2 font-bold text-left px-5 ${
                isActive('Profile') && 'bg-primary text-white'
              }`}
              onClick={() => setSelectedComponent('Profile')}
            >
              <div className='flex gap-3'>
                <FaUserAlt size={20} />
                Profile
              </div>
            </button>
          )}
          {user.type != 'user' && (
            <button
              className={`w-[100%] rounded-lg dark:border-slate-800 border-slate-400  py-2 font-bold text-left px-5 ${
                isActive('Posts') && 'bg-primary text-white'
              }`}
              onClick={() => setSelectedComponent('Posts')}
            >
              <div className='flex gap-3'>
                <AiTwotoneNotification size={20} />
                Announcements
              </div>
            </button>
          )}
          {user.type === 'admin' && (
            <button
              className={`w-[100%] rounded-lg dark:border-slate-800 border-slate-400  py-2 font-bold text-left px-5 ${
                isActive('AlumniList') && 'bg-primary text-white'
              }`}
              onClick={() => setSelectedComponent('AlumniList')}
            >
              <div className='flex gap-3'>
                <FaListAlt size={20} />
                Alumnies
              </div>
            </button>
          )}
          <button
            className={`w-[100%] rounded-lg dark:border-slate-800 border-slate-400  py-2 font-bold text-left px-5 ${
              isActive('ChangePassword') && 'bg-primary text-white'
            }`}
            onClick={() => setSelectedComponent('ChangePassword')}
          >
            <div className='flex gap-3'>
              <RiLockPasswordFill size={20} />
              Change Password
            </div>
          </button>
        </VStack>
        <div className='p-3 bg-slate-200 dark:bg-slate-900 rounded-lg mt-6'>
          <p className='text-center text-primary text-sm font-bold'>
            Dept. of <span className='capitalize'>{user.department}</span>
          </p>
        </div>
      </Box>

      <Box flex='1' className='lg:ml-[260px] lg:pl-14 mb-7' overflowY='auto'>
        {selectedComponent === 'Dashboard' && <DashboardPage user={user} />}
        {selectedComponent === 'Profile' && <ProfilePage userDeials={user} />}
        {selectedComponent === 'Posts' && <PostPage />}
        {selectedComponent === 'AlumniList' && <AlumniList />}
        {selectedComponent === 'ChangePassword' && <ChangePassword />}
      </Box>
      <Drawer
        isOpen={isDrawerOpen}
        placement='right'
        onClose={closeDrawer}
        finalFocusRef={closeDrawer}
      >
        <DrawerOverlay />
        <DrawerContent className='dark:bg-slate-900 dark:text-white'>
          <DrawerCloseButton />
          <DrawerHeader>
            <div>
              <p>{user.name}</p>
              <p className='text-primary pl-[1px] text-[12px]'>
                Dept. of {user.department}
              </p>
            </div>
          </DrawerHeader>

          <DrawerBody>
            <div className='flex flex-col pl-1 mt-5 text-lg gap-y-3 font-bold'>
              <div
                onClick={() => {
                  setSelectedComponent('Dashboard')
                  closeDrawer()
                }}
                className={`${
                  isActive('Dashboard') && 'text-primary'
                } flex items-center gap-y-1`}
              >
                <FaHome className='mr-2' />
                <p>Home</p>
              </div>
              {user.type != 'user' && (
                <div
                  className={`${
                    isActive('Profile') && 'text-primary'
                  } flex items-center gap-y-1`}
                  onClick={() => {
                    closeDrawer()
                    setSelectedComponent('Profile')
                  }}
                >
                  <FiUser className='mr-2' />
                  <p>Profile</p>
                </div>
              )}
              {user.type != 'user' && (
                <div
                  onClick={() => {
                    setSelectedComponent('Posts')
                    closeDrawer()
                  }}
                  className={`${
                    isActive('Posts') && 'text-primary'
                  } flex items-center gap-y-1`}
                >
                  <AiTwotoneNotification className='mr-2' />
                  <p>Announcements</p>
                </div>
              )}
              {user.type === 'admin' && (
                <div
                  onClick={() => {
                    setSelectedComponent('AlumniList')
                    closeDrawer()
                  }}
                  className={`${
                    isActive('AlumniList') && 'text-primary'
                  } flex items-center gap-y-1`}
                >
                  <FiList className='mr-2' />
                  <p>Alumnies</p>
                </div>
              )}
            </div>
          </DrawerBody>
          <DrawerFooter>
            <CButton1
              width={'100%'}
              title={'Logout'}
              rightIcon={<BiLogOutCircle size={18} />}
              onClick={() => {
                setUser(null)
                sessionStorage.removeItem('jwtToken')
                sessionStorage.removeItem('user')
              }}
            />
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Flex>
  )
}

export default Dashboard
