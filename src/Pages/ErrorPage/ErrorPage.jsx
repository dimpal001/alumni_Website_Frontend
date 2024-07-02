import { Link } from 'react-router-dom'
import { CButton } from '../../Components/CustomDesigns'
import { FaHome } from 'react-icons/fa'
import { useEffect } from 'react'

const ErrorPage = () => {
  useEffect(() => {
    scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }, [])
  return (
    <div>
      <div data-aos='zoom-in-up'>
        <p className='text-4xl lg:text-6xl'>404 Page not Found</p>
        <div className='flex justify-center mt-5'>
          <Link to={'/'}>
            <CButton leftIcon={<FaHome />} title={'Home'} />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ErrorPage
