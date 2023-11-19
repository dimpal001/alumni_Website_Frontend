import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './Pages/Components/Navbar'
import Home from './Pages/Home'
import FooterPage from './Pages/FooterPage'
import HelpPage from './Pages/HelpPage'
import AboutPage from './Pages/AboutPage'
import Error from './Pages/Error'
import ProtectedRoute from './ProtectedRoute'
import { useContext } from 'react'
import { UserContext } from './UserContext'
import Dashboard from './Pages/Components/Dashboard'

function App() {
  const { user } = useContext(UserContext)
  return (
    <>
      <div className='dark:bg-slate-900 bg-slate-200 text-black dark:text-white'>
        <div className='lg:min-h-screen mx-auto lg:px-10'>
          <BrowserRouter>
            <Navbar />
            <div className='mt-16 lg:pt-5'>
              <Routes>
                <Route path='/' element={user ? <Dashboard /> : <Home />} />
                <Route
                  path='/dashboard'
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />
                <Route path='/dashboard' element={<Dashboard />} />
                <Route path='/help' element={<HelpPage />} />
                <Route path='/about' element={<AboutPage />} />
                <Route path='/*' element={<Error />} />
              </Routes>
            </div>
          </BrowserRouter>
        </div>
        <FooterPage />
      </div>
    </>
  )
}

export default App
