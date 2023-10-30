import { useContext, useEffect, useState } from 'react'
import { Box, Flex, VStack } from '@chakra-ui/react'
import ProfilePage from '../ProfilePage'
import AllAlumniRequestsPage from '../AllAlumniRequestsPage'
import PostPage from '../PostPage'
import AlumniList from '../AlumniList'
import { UserContext } from '../../UserContext'
import { FaHome, FaListAlt, FaUserAlt, FaUsers } from 'react-icons/fa'
import { BsSendFill } from 'react-icons/bs'
import { FiGrid, FiHome, FiList, FiUser, FiUsers } from 'react-icons/fi'
import DashboardPage from '../DashboardPage'
import UserRequestPage from '../UserRequestPage'
import { AiTwotoneNotification } from 'react-icons/ai'

const Dashboard = () => {
  const [selectedComponent, setSelectedComponent] = useState('Dashboard')
  const { user } = useContext(UserContext)
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
          {user.type === 'admin' && (
            <button
              className={`w-[100%] rounded-lg dark:border-slate-800 border-slate-400  py-2 font-bold text-left px-5 ${
                isActive('AlumniRequest') && 'bg-primary text-white'
              }`}
              onClick={() => setSelectedComponent('AlumniRequest')}
            >
              <div className='flex gap-3'>
                <FaUsers size={20} />
                Alumni Requests
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
          {user.type != 'admin' && (
            <button
              className={`w-[100%] rounded-lg dark:border-slate-800 border-slate-400  py-2 font-bold text-left px-5 ${
                isActive('PreviousRequest') && 'bg-primary text-white'
              }`}
              onClick={() => setSelectedComponent('PreviousRequest')}
            >
              <div className='flex gap-3'>
                <BsSendFill size={20} />
                Requests
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
        </VStack>
      </Box>

      <Box flex='1' className='lg:ml-[260px] lg:pl-14 mb-7' overflowY='auto'>
        {selectedComponent === 'Dashboard' && <DashboardPage user={user} />}
        {selectedComponent === 'Profile' && <ProfilePage userDeials={user} />}
        {selectedComponent === 'AlumniRequest' && <AllAlumniRequestsPage />}
        {selectedComponent === 'Posts' && <PostPage />}
        {selectedComponent === 'PreviousRequest' && <UserRequestPage />}
        {selectedComponent === 'AlumniList' && <AlumniList />}
      </Box>

      <div className='lg:hidden m-[2%] border-slate-900 dark:border-slate-500 dark:bg-slate-950 bg-slate-300 py-2 rounded-2xl z-40 fixed bottom-0 flex justify-evenly w-[96%]'>
        <div
          onClick={() => setSelectedComponent('Dashboard')}
          className={`${
            isActive('Dashboard') && 'text-primary'
          } flex flex-col justify-center items-center gap-y-1`}
        >
          <FiHome size={22} />
          <p className='text-xs'>Home</p>
        </div>
        {user.type != 'user' && (
          <div
            onClick={() => setSelectedComponent('Profile')}
            className={`${
              isActive('Profile') && 'text-primary'
            } flex flex-col justify-center items-center gap-y-1`}
          >
            <FiUser size={22} />
            <p className='text-xs'>Profile</p>
          </div>
        )}
        {user.type === 'admin' && (
          <div
            onClick={() => setSelectedComponent('AlumniRequest')}
            className={`${
              isActive('AlumniRequest') && 'text-primary'
            } flex flex-col justify-center items-center`}
          >
            <FiUsers size={24} />
            <p className='text-xs'>Requests</p>
          </div>
        )}
        {user.type != 'user' && (
          <div
            onClick={() => setSelectedComponent('Posts')}
            className={`${
              isActive('Posts') && 'text-primary'
            } flex flex-col justify-center items-center gap-y-1`}
          >
            <FiGrid size={22} />
            <p className='text-xs'>Posts</p>
          </div>
        )}
        {user.type != 'admin' && (
          <div
            onClick={() => setSelectedComponent('PreviousRequest')}
            className={`${
              isActive('PreviousRequest') && 'text-primary'
            } flex flex-col justify-center items-center gap-y-1`}
          >
            <BsSendFill size={22} />
            <p className='text-xs'>Requests</p>
          </div>
        )}
        {user.type === 'admin' && (
          <div
            onClick={() => setSelectedComponent('AlumniList')}
            className={`${
              isActive('AlumniList') && 'text-primary'
            } flex flex-col justify-center items-center gap-y-1`}
          >
            <FiList size={22} />
            <p className='text-xs'>Alumnies</p>
          </div>
        )}
      </div>
    </Flex>
  )
}

export default Dashboard
