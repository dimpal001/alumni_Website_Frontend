import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './Pages/HomePage/HomePage'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import LoginPage from './Pages/LoginPage/LoginPage'
import RegistrationPage from './Pages/RegistrationPage/RegistrationPage'
import { Toaster } from 'react-hot-toast'
import MyRequestsPage from './Pages/MyRequests/MyRequestsPage'
import { useContext, useEffect } from 'react'
import { UserContext } from './UserContext'
import ErrorPage from './Pages/ErrorPage/ErrorPage'
import SendRequestPage from './Pages/SendRequestPage/SendRequestPage'
import DetailedRequestPage from './Pages/DetailedRequestPage/DetailedRequestPage'
import ProfilePage from './Pages/ProfilePage/ProfilePage'
import AdminDashboardPage from './Pages/AdminDashboardPage/AdminDashboardPage'
import AlumniList from './Pages/AlumniList/AlumniList'
import UserList from './Pages/UserList/UserList'
import DegreeList from './Pages/DegreeList/DegreeList'
import DepartmentList from './Pages/DepartmentList/DepartmentList'
import AnnouncementPage from './Pages/AnnouncementPage/AnnouncementPage'
import SingleAnnouncementPage from './Pages/AnnouncementPage/SingleAccnouncementPage'
import AdvancedSearchPage from './Pages/AdvancedSearch/AdvancedSearchPage'
import CreateNewAdminPage from './Pages/UserList/CreateNewAdminPage'
import AOS from 'aos'
import 'aos/dist/aos.css'

const App = () => {
  useEffect(() => {
    AOS.init({
      duration: 400,
      once: true,
    })
  })

  useEffect(() => {
    scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }, [])

  const { user } = useContext(UserContext)
  return (
    <>
      <BrowserRouter>
        <div className='bg-slate-300 dark:bg-slate-900 dark:text-white'>
          <Toaster />
          <div>
            <Navbar />
          </div>
          <div className='pt-[70px] min-h-[770px] lg:min-h-[740px] flex items-center justify-center'>
            <Routes>
              <Route path='/' element={<HomePage />} />
              {!user && <Route path='/login' element={<LoginPage />} />}
              {!user && (
                <Route path='/registration' element={<RegistrationPage />} />
              )}
              {user && user.type != 'guest' && (
                <Route path='/profile/:id' element={<ProfilePage />} />
              )}
              {user && user.type != 'guest' && (
                <Route
                  path='/advanced-search'
                  element={<AdvancedSearchPage />}
                />
              )}
              {user && (
                <Route
                  path='/detailed-request/:id'
                  element={<DetailedRequestPage />}
                />
              )}
              {user && (
                <Route path='/announcement' element={<AnnouncementPage />} />
              )}
              {user && (
                <Route
                  path='/announcement/:id'
                  element={<SingleAnnouncementPage />}
                />
              )}
              {user && (
                <Route path='/my-requests' element={<MyRequestsPage />} />
              )}
              {user && user.type === 'admin' && (
                <Route
                  path='/admin-dashboard'
                  element={<AdminDashboardPage />}
                />
              )}
              {user && user.type === 'admin' && (
                <Route path='/alumni-list' element={<AlumniList />} />
              )}
              {user && user.type === 'admin' && (
                <Route path='/new-admin' element={<CreateNewAdminPage />} />
              )}
              {user && user.type === 'admin' && (
                <Route path='/user-list' element={<UserList />} />
              )}
              {user && user.type === 'admin' && (
                <Route path='/degree-list' element={<DegreeList />} />
              )}
              {user && user.type === 'admin' && (
                <Route path='/department-list' element={<DepartmentList />} />
              )}
              {user && user.type != 'admin' && (
                <Route path='/send-request' element={<SendRequestPage />} />
              )}
              <Route path='/*' element={<ErrorPage />} />
            </Routes>
          </div>
          <div>
            <Footer />
          </div>
        </div>
      </BrowserRouter>
    </>
  )
}

export default App
