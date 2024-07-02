import { Link, useNavigate } from 'react-router-dom'
import { CButton, CInput } from '../../Components/CustomDesigns'
import { BiLogOut } from 'react-icons/bi'
import { useEffect, useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { api } from '../../Components/API'

const RegistrationPage = () => {
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobileNumber: '',
    password: '',
    cPassword: '',
  })

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    })
  }

  useEffect(() => {
    scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault()

    if (formData.name.length < 4) {
      toast.error('Enter a valid name')
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!emailRegex.test(formData.email)) {
      toast.error('Enter a valid email address')
      return
    }

    if (!/^\d{10}$/.test(formData.mobileNumber)) {
      toast.error('Enter a valid mobile number')
      return
    }

    if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/.test(
        formData.password
      )
    ) {
      toast.error('Enter a valid password')
      return
    }

    if (formData.password != formData.cPassword) {
      toast.error('Password and Confirm password should be same')
      return
    }

    setIsLoading(true)

    axios
      .post(`${api}/api/auth/signup`, {
        formData: formData,
      })
      .then((response) => {
        toast.success(`${response.data.message}`)
        navigate('/login')
      })
      .catch((error) => {
        toast.error(`${error.response.data.message}`)
        console.error(error)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }, [])
  return (
    <div className='w-full'>
      <div className='flex justify-center px-3 py-10 lg:p-5'>
        <div
          data-aos='zoom-in'
          className='bg-white dark:bg-slate-950 lg:w-[500px] w-full rounded-lg p-7 lg:px-16 py-10'
        >
          <p className='text-4xl pb-5 text-center'>Register</p>
          <div>
            <form>
              <CInput
                label={'Full name'}
                name={'name'}
                onChange={handleInputChange}
                placeholder={'Full name'}
              />
              <CInput
                label={'Email address'}
                name={'email'}
                onChange={handleInputChange}
                placeholder={'Email address'}
              />
              <CInput
                label={'Mobile number'}
                name={'mobileNumber'}
                type={'tel'}
                onChange={handleInputChange}
                placeholder={'Mobile number'}
              />
              <CInput
                name={'password'}
                onChange={handleInputChange}
                label={'Password'}
                type={'password'}
                placeholder={'Password'}
              />
              <p className='text-xs text-primary'>
                The password must be at least 8 characters long and include at
                least one uppercase letter, one lowercase letter, one number,
                and one special symbol
              </p>
              <CInput
                name={'cPassword'}
                onChange={handleInputChange}
                label={'Confirm Password'}
                type={'password'}
                placeholder={'Confirm Password'}
              />
              <div className='pt-5'>
                <CButton
                  type={'submit'}
                  onClick={handleSubmit}
                  title={'Sign up'}
                  isLoading={isLoading}
                  loadingText={'Signing up...'}
                  rightIcon={<BiLogOut size={20} />}
                  width={'100%'}
                />
              </div>
            </form>
            <p className='py-3 text-center'>
              Already registered ?{' '}
              <Link to={'/login'} className='text-primary'>
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RegistrationPage
