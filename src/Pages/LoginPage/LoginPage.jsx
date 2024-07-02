import { Link, useNavigate } from 'react-router-dom'
import { CButton, CInput } from '../../Components/CustomDesigns'
import { BiLogIn } from 'react-icons/bi'
import { useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import axios from 'axios'
import { api } from '../../Components/API'
import { UserContext } from '../../UserContext'

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false)
  const { setUser } = useContext(UserContext)
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  useEffect(() => {
    scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }, [])

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()

    if (formData.email === '') {
      toast.error('Enter a valid email address')
      return
    }
    if (formData.password === '') {
      toast.error('Enter a valid password')
      return
    }

    setIsLoading(true)

    axios
      .post(`${api}/api/auth/login`, {
        formData: formData,
      })
      .then((response) => {
        const { token, expiresIn, message, user } = response.data
        toast.success(message)
        setUser(user)
        sessionStorage.setItem('token', token)
        sessionStorage.setItem('user', JSON.stringify(user))
        sessionStorage.setItem(
          'tokenExpiresAt',
          new Date().getTime() + expiresIn * 1000
        )
        if (user.type === 'guest') {
          navigate('/my-requests')
        }
        if (user.type === 'admin') {
          navigate('/admin-dashboard')
        } else {
          navigate('/')
        }
      })
      .catch((error) => {
        console.log(error)
        toast.error(error.response.data.message)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  return (
    <div className='w-full'>
      <div className='flex justify-center h-full items-center px-3 py-24 lg:py-10'>
        <div
          data-aos='zoom-in'
          className='bg-white dark:bg-slate-950 lg:w-[500px] w-full rounded-lg py-16 px-7 lg:p-16'
        >
          <p className='text-4xl pb-5 text-center'>Login</p>
          <div>
            <form>
              <CInput
                label={'Email address'}
                name={'email'}
                onChange={handleInputChange}
                placeholder={'Email address'}
              />
              <CInput
                label={'Password'}
                type={'password'}
                name={'password'}
                onChange={handleInputChange}
                placeholder={'Password'}
              />
              <div className='pt-5'>
                <CButton
                  isLoading={isLoading}
                  type={'submit'}
                  onClick={handleSubmit}
                  title={'Login'}
                  rightIcon={<BiLogIn size={20} />}
                  width={'100%'}
                />
              </div>
            </form>
            <p className='py-3 text-center'>
              Not a member ?{' '}
              <Link to={'/registration'} className='text-primary'>
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
