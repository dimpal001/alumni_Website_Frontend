import { useNavigate } from 'react-router-dom'
import { CButton, CInput } from '../../Components/CustomDesigns'
import { useEffect, useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { api } from '../../Components/API'

const CreateNewAdminPage = () => {
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobileNumber: '',
    password: '',
    cPassword: '',
  })

  useEffect(() => {
    scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }, [])

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    })
  }

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

    const token = sessionStorage.getItem('token')

    axios
      .post(
        `${api}/api/auth/new-admin`,
        {
          formData: formData,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        toast.success(`${response.data.message}`)
        navigate('/admin-dashboard')
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
        <div className='bg-white dark:bg-slate-950 lg:w-[500px] w-full rounded-lg p-7 lg:px-16 py-10'>
          <p className='text-4xl pb-5 text-center'>Create Admin</p>
          <div>
            <form>
              <CInput
                label={'Admin name'}
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
                  title={'Create'}
                  isLoading={isLoading}
                  loadingText={'Creating...'}
                  width={'100%'}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateNewAdminPage
