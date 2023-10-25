import '../App.css'
import Image1 from '../assets/svg2.svg'
import { CButton1 } from './Components/CustomDesign'
import { TbLogin2 } from 'react-icons/tb'
import { FiUserPlus } from 'react-icons/fi'
import LoginModal from './Components/LoginModal'
import SignUpModal from './Components/SignUpModal'
import { useEffect, useState } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { Box } from '@chakra-ui/react'
const Home = () => {
  const [isSignupOpen, setIsSignupOpen] = useState(false)
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
    document.title = 'GradeConnect'
    AOS.init()
  }, [])

  const openSignupModal = () => {
    setIsSignupOpen(true)
  }
  const openLoginModal = () => {
    setIsLoginOpen(true)
  }
  return (
    <>
      <Box
        filter={(isLoginOpen && 'blur(5px)') || (isSignupOpen && 'blur(5px)')}
      >
        <div>
          <div>
            <div className='min-h-[690px] lg:min-h-[540px] flex items-center'>
              <div className='w-full flex flex-col-reverse lg:flex-row justify-around  items-center'>
                <div data-aos='zoom-in'>
                  <div>
                    <p className='text-3xl lg:text-5xl text-center  font-bold px-5 lg:px-1 py-4 leading-10 lg:leading-relaxed'>
                      Welcome <span className='text-primary'>Alumni !</span>{' '}
                      <br />{' '}
                      <span className='text-2xl lg:text-4xl'>
                        Join us in celebrating your journey
                      </span>
                    </p>
                  </div>
                  <div className='flex gap-5 justify-center lg:gap-10 mt-5'>
                    <CButton1
                      onClick={openSignupModal}
                      rightIcon={<FiUserPlus size={20} />}
                      title={'Sing Up'}
                    />
                    <CButton1
                      onClick={openLoginModal}
                      rightIcon={<TbLogin2 size={25} />}
                      title={'Login'}
                    />
                  </div>
                </div>
                <div className='px-5 lg:px-0'>
                  <img
                    data-aos='fade-down'
                    src={Image1}
                    className='h-64 lg:h-72'
                    alt='Student image'
                  />
                </div>
              </div>
            </div>
          </div>
          <div data-aos='fade-up' className='px-0 lg:px-20'>
            <div className=' bg-slate-50 dark:bg-slate-800 m-2 shadow-gray-700  mb-20 my-10 rounded-3xl p-10 lg:py-20'>
              <p className='text-center  font-bold text-2xl lg:text-4xl'>
                How to be a member ?
              </p>
              <p className='text-justify  pt-3 lg:px-20'>
                To become a member of our alumni website, graduated students can
                start by visiting the official website and clicking on the{' '}
                <strong>Sign Up</strong> button. They will need to fill in their
                personal details, including their full name, email address, and
                phone number. <br />
                <br /> Once registered, they can set up their profile, including
                a profile picture, and start exploring the alumni network,
                connecting with fellow alumni, and accessing various benefits
                like networking opportunities and alumni events to enhance their
                post-graduation experience.
              </p>
            </div>
          </div>
        </div>
      </Box>
      {isSignupOpen && (
        <SignUpModal
          open={isSignupOpen}
          onClose={() => setIsSignupOpen(false)}
        />
      )}
      {isLoginOpen && (
        <LoginModal open={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
      )}
    </>
  )
}

export default Home
