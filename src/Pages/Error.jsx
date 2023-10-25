import { Link } from 'react-router-dom'
import ErrorImg from '../assets/404-error.png'
import { CButton1 } from './Components/CustomDesign'
import { FaHome } from 'react-icons/fa'

const Error = () => {
  return (
    <>
      <div className=' h-screen flex flex-col justify-start items-center'>
        <div className=' pt-24 flex flex-col-reverse lg:pt-0 px-8 text-center'>
          <div className='flex items-center'>
            <div>
              <p className=' mt-2 font-bold'>
                Oops! The page you are looking for doesn&apos;t exist.
              </p>
              <div className='mt-5'>
                <Link to={'/'}>
                  <CButton1
                    title='Go back to the Home Page'
                    leftIcon={<FaHome />}
                  />
                </Link>
              </div>
            </div>
          </div>
          <img src={ErrorImg} className='lg:w-96' alt='Error image' />
        </div>
      </div>
    </>
  )
}

export default Error
