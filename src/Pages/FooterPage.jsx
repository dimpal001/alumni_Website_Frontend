import Logo from '../assets/logo.png'
import { FaFacebookSquare, FaInstagram } from 'react-icons/fa'
import { FaLinkedin, FaSquareXTwitter } from 'react-icons/fa6'
const FooterPage = () => {
  return (
    <>
      <footer className='bg-slate-900 relative z-20 max-md:mb-[60px] dark:bg-slate-950 text-white px-5 py-8'>
        <div className='container mx-auto flex flex-col lg:flex-row justify-between items-center'>
          <div className='w-full'>
            <div className='flex justify-center'>
              <img className='w-[200px]' src={Logo} alt='' />
            </div>
          </div>
          <div className='w-full'>
            <ul className='mt-2 flex justify-center'>
              <li>
                <FaSquareXTwitter size={30} />
              </li>
              <li>
                <FaFacebookSquare size={30} />
              </li>
              <li>
                <FaInstagram size={30} />
              </li>
              <li>
                <FaLinkedin size={30} />
              </li>
            </ul>
          </div>
        </div>
        <div className='border-t border-gray-800 mt-8 pt-4 text-center'>
          <p>&copy; 2023 GradConnect | All rights reserved.</p>
        </div>
      </footer>
    </>
  )
}

export default FooterPage
