import axios from 'axios'
import { useEffect, useState } from 'react'
import { api } from '../../Components/API'
import toast from 'react-hot-toast'
import { useNavigate, useParams } from 'react-router-dom'
import Loading from '../../Components/Loading'

const SingleAnnouncementPage = () => {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)
  const [announcement, setAnnouncement] = useState([])
  const { id } = useParams()

  useEffect(() => {
    scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }, [])

  const fetchDetails = () => {
    const token = sessionStorage.getItem('token')
    axios
      .get(`${api}/api/announcement/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setAnnouncement(response.data)
      })
      .catch((error) => {
        toast.error(error.response.data.message)
        navigate('/dashboard')
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  useEffect(() => {
    fetchDetails()
    console.log(announcement)
  }, [])

  return (
    <>
      {isLoading ? (
        <Loading title={'Loading details...'} />
      ) : (
        <div className='w-full container max-sm:px-3 lg:p-5 min-h-[700px] lg:min-h-[580px]'>
          <div className='container py-5 lg:py-10 lg:px-[180px]'>
            <div className='bg-white rounded-md dark:bg-slate-950'>
              <p className='text-2xl text-primary lg:text-3xl p-5 font-bold text-center'>
                {announcement && announcement.title}
              </p>
              <p className='text-center'>
                Uploaded on{' '}
                <span className='text-primary'>
                  {announcement &&
                    new Date(announcement.uploadDate).toDateString()}
                </span>
              </p>
              <p className='text-lg lg:text-2xl p-5 lg:px-[50px]'>
                <span className='text-primary font-bold'>Description : </span>
                {announcement && announcement.description}
              </p>
              <div className='p-5 rounded-md'>
                <img src={announcement.attachment} alt='Attachment' />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default SingleAnnouncementPage
