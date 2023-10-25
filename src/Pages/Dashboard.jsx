import {
  Box,
  Button,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react'
import {
  FaBorderAll,
  FaHome,
  FaListAlt,
  FaUserAlt,
  FaUsers,
} from 'react-icons/fa'
import { useContext, useEffect, useState } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { brandColor } from './Components/CustomDesign'
import { BsSendFill } from 'react-icons/bs'
import { UserContext } from '../UserContext'
import DashboardPage from './DashboardPage'
import RequestPage from './RequestPage'
import ProfilePage from './ProfilePage'
import AllAlumniRequestsPage from './AllAlumniRequestsPage'
import SingleUserRequestPage from './SingleUserRequestPage'
import AlumniList from './AlumniList'

const Dashboard = () => {
  const { user } = useContext(UserContext)
  const [activeTab, setActiveTab] = useState(0)

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
    AOS.init()
  }, [user.type])

  return (
    <>
      <Box>
        <Tabs
          isLazy
          index={activeTab}
          onChange={(index) => setActiveTab(index)}
        >
          <div className='flex mt-5 w-full gap-5'>
            <div
              className={` hidden lg:block ${
                user.type === 'admin'
                  ? `max-h-[600px]`
                  : user.type === 'user'
                  ? `max-h-[240px]`
                  : `max-h-[300px]`
              } rounded-lg w-[23%] pb-5`}
            >
              <Tablist user={user} />
            </div>
            <div className='w-[100%] lg:w-[77%]'>
              <Tabpanel user={user} activeTab={activeTab} />
            </div>
          </div>
        </Tabs>
      </Box>
    </>
  )
}

const Tablist = ({ user }) => {
  return (
    <>
      <TabList borderWidth={0} className='h-full'>
        <ul
          id='functionList'
          className='flex text-primary dark:text-white flex-col items-start p-5  w-full'
        >
          <Tab style={tabStyle} _selected={tabSelected}>
            <Button
              leftIcon={<FaHome style={{ paddingTop: 5 }} size={20} />}
              size={20}
              variant={'unstyled'}
            >
              Dashboard
            </Button>
          </Tab>
          {user.type !== 'user' && (
            <Tab style={tabStyle} _selected={tabSelected}>
              <Button
                leftIcon={<FaUserAlt style={{ paddingTop: 5 }} size={20} />}
                size={20}
                variant={'unstyled'}
              >
                Profile
              </Button>
            </Tab>
          )}
          {user.type === 'admin' && (
            <Tab style={tabStyle} _selected={tabSelected}>
              <Button
                leftIcon={<FaUsers style={{ paddingTop: 5 }} size={20} />}
                size={20}
                variant={'unstyled'}
              >
                Alumni Requests
              </Button>
            </Tab>
          )}
          {user.type === 'admin' && (
            <Tab style={tabStyle} _selected={tabSelected}>
              <Button
                leftIcon={<FaBorderAll style={{ paddingTop: 5 }} size={20} />}
                size={20}
                variant={'unstyled'}
              >
                Posts
              </Button>
            </Tab>
          )}
          {user.type !== 'admin' && (
            <Tab style={tabStyle} _selected={tabSelected}>
              <Button
                leftIcon={<BsSendFill style={{ paddingTop: 5 }} size={20} />}
                size={20}
                variant={'unstyled'}
              >
                Make a Request
              </Button>
            </Tab>
          )}
          {user.type !== 'admin' && (
            <Tab style={tabStyle} _selected={tabSelected}>
              <Button
                leftIcon={<BsSendFill style={{ paddingTop: 5 }} size={20} />}
                size={20}
                variant={'unstyled'}
              >
                Previous Requests
              </Button>
            </Tab>
          )}
          {user.type === 'admin' && (
            <Tab className='border' style={tabStyle} _selected={tabSelected}>
              <Button
                leftIcon={<FaListAlt style={{ paddingTop: 5 }} size={20} />}
                size={20}
                variant={'unstyled'}
              >
                Alumni List
              </Button>
            </Tab>
          )}
        </ul>
      </TabList>
    </>
  )
}

const Tabpanel = ({ user }) => {
  return (
    <>
      <TabPanels>
        <TabPanel padding={0}>
          <DashboardPage user={user} />
        </TabPanel>
        {user.type !== 'user' && (
          <TabPanel padding={0}>
            <ProfilePage userDeials={user} />
          </TabPanel>
        )}
        {user.type === 'admin' && (
          <TabPanel padding={0}>
            <AllAlumniRequestsPage />
          </TabPanel>
        )}
        {user.type === 'admin' && (
          <TabPanel padding={0}>{/* <Loading /> */}</TabPanel>
        )}
        {user.type !== 'admin' && (
          <TabPanel padding={0}>
            <RequestPage user={user} />
          </TabPanel>
        )}
        {user.type !== 'admin' && (
          <TabPanel padding={0}>
            <SingleUserRequestPage />
          </TabPanel>
        )}
        {user.type === 'admin' && (
          <TabPanel padding={0}>
            <AlumniList />
          </TabPanel>
        )}
      </TabPanels>
    </>
  )
}

const tabStyle = {
  marginTop: 15,
  display: 'flex',
  justifyContent: 'flex-start',
  fontWeight: 'bold',
  borderWidth: '1px',
  borderColor: brandColor.dark,
  width: '100%',
  borderRadius: 10,
}

const tabSelected = {
  color: 'white',
  borderColor: brandColor.first,
  background: brandColor.first,
}

export default Dashboard
