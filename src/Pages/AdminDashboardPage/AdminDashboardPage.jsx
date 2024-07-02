import { Link } from 'react-router-dom'
import { CButton } from '../../Components/CustomDesigns'
import axios from 'axios'
import { api } from '../../Components/API'
import { useEffect, useState } from 'react'
import Loading from '../../Components/Loading'

const AdminDashboardPage = () => {
  const [formData, setFormData] = useState()
  const [isLoading, setIsLoading] = useState(true)
  const fetchDetails = async () => {
    try {
      const token = sessionStorage.getItem('token')
      const response = await axios.get(`${api}/api/auth/counts`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setFormData(response.data)
      setIsLoading(false)
    } catch (error) {
      console.error('Error fetching user counts:', error)
      setIsLoading(false)
    }
  }

  useEffect(() => {
    scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }, [])

  useEffect(() => {
    fetchDetails()
    console.log(formData)
  }, [])

  return (
    <>
      {isLoading ? (
        <Loading title={'Loading...'} />
      ) : (
        <div
          data-aos='zoom-in'
          className='w-full container max-sm:px-5 p-5 min-h-[700px] lg:min-h-[580px]'
        >
          <p className='text-2xl lg:text-3xl font-bold text-center'>
            Admin Dashboard
          </p>
          <div className='container py-10'>
            <div className='lg:flex justify-evenly'>
              <DetailsCard
                label={'Pending Requests'}
                value={
                  formData &&
                  formData.pendingRequestCount &&
                  formData.pendingRequestCount
                }
                link={'/my-requests'}
              />
              <DetailsCard
                label={'Registered User'}
                link={'/user-list'}
                value={formData && formData.userCount && formData.userCount}
              />
              <DetailsCard
                label={'Approved Alumnies'}
                value={formData && formData.alumniCount && formData.alumniCount}
                link={'/alumni-list'}
              />
            </div>
            <div className='lg:flex justify-evenly'>
              <DetailsCard
                label={'Available Department'}
                value={
                  formData &&
                  formData.departmentCount.length &&
                  formData.departmentCount.length
                }
                link={'/department-list'}
              />
              <DetailsCard
                label={'Available Degree'}
                link={'/degree-list'}
                value={
                  formData &&
                  formData.degreeCount.length &&
                  formData.degreeCount.length
                }
              />
              <DetailsCard
                label={'Announcements'}
                value={
                  formData &&
                  formData.announcementsCount &&
                  formData.announcementsCount
                }
                link={'/announcement'}
              />
            </div>
          </div>
        </div>
      )}
    </>
  )
}

const DetailsCard = ({ label, value, link }) => {
  return (
    <div className='w-full mb-10 lg:w-[250px]'>
      <div className='shadow-xl bg-white dark:bg-slate-950 rounded-md max-sm:py-7 py-4'>
        <p
          className={`text-6xl font-extrabold text-center ${
            value === 0 && 'text-red-700'
          }`}
        >
          {value}
        </p>
        <p className='text-xl text-center'>{label}</p>
        <div className='flex justify-center mt-2'>
          <Link to={link}>
            <CButton title={'View more'} size={'sm'} />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboardPage
