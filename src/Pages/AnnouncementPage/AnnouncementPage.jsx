import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import { api } from '../../Components/API'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import Loading from '../../Components/Loading'
import { UserContext } from '../../UserContext'
import { CButton } from '../../Components/CustomDesigns'
import MakeAnnouncementModal from './MakeAnnouncementModal'
import { Button } from '@chakra-ui/react'
import DeleteAnnouncementModal from './DeleteAnnouncementModal'

const AnnouncementPage = () => {
  const navigate = useNavigate()
  const { user } = useContext(UserContext)
  const [isLoading, setIsLoading] = useState(true)
  const [selectedId, setSelectedId] = useState('')
  const [announcements, setAnnouncements] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDeleteModal, setIsDeleteModal] = useState(false)

  useEffect(() => {
    scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }, [])

  const handleDeleteModal = () => {
    setIsDeleteModal(true)
  }

  const handleModalOpen = () => {
    setIsModalOpen(true)
  }

  const fetchDetails = () => {
    const token = sessionStorage.getItem('token')
    axios
      .get(`${api}/api/announcement/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setAnnouncements(response.data)
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
    console.log(announcements)
  }, [])

  return (
    <>
      {isLoading ? (
        <Loading title={'Loading details...'} />
      ) : (
        <div className='w-full container max-sm:px-5 p-5 min-h-[700px] lg:min-h-[580px]'>
          <p className='text-2xl lg:text-3xl font-bold text-center'>
            Announcements
          </p>
          <div data-aos='zoom-in-up' className='container py-10'>
            {user.type === 'admin' && (
              <div className='flex justify-center pb-5'>
                <CButton
                  title={'Make an announcement'}
                  onClick={handleModalOpen}
                />
              </div>
            )}
            <div className='lg:px-[250px]'>
              {announcements &&
                announcements.map((item, index) => (
                  <div key={index}>
                    <SingleAnnouncement
                      name={item.name}
                      title={item.title}
                      onClick={() => {
                        navigate(`/announcement/${item._id}`)
                      }}
                      uploadDate={item.uploadDate}
                      user={user}
                      onDelete={() => {
                        handleDeleteModal()
                        setSelectedId(item._id)
                      }}
                    />
                  </div>
                ))}
              {announcements.length === 0 && (
                <p className='text-center text-lg'>No data to show</p>
              )}
            </div>
          </div>
          {isModalOpen && (
            <MakeAnnouncementModal
              isOpen={true}
              onClose={() => setIsModalOpen(false)}
              fetchDetails={fetchDetails}
            />
          )}
          {isDeleteModal && (
            <DeleteAnnouncementModal
              isOpen={true}
              onClose={() => setIsDeleteModal(false)}
              announcementId={selectedId}
              fetchDetails={fetchDetails}
            />
          )}
        </div>
      )}
    </>
  )
}

const SingleAnnouncement = ({
  name,
  title,
  onClick,
  uploadDate,
  onDelete,
  user,
}) => {
  return (
    <div className='py-1 relative'>
      <div className='bg-white rounded-md dark:bg-slate-950 px-5 pr-16 py-2'>
        <div onClick={onClick} className='hover:text-primary cursor-pointer'>
          <div className='flex justify-between'>
            <p className='text-2xl font-extrabold'>{name}</p>
            <p>{new Date(uploadDate).toDateString()}</p>
          </div>
          <p>{title}</p>
        </div>
        {user.type === 'admin' && (
          <Button
            className='my-1'
            onClick={onDelete}
            colorScheme='red'
            size={'sm'}
          >
            Delete announcement
          </Button>
        )}
      </div>
    </div>
  )
}

export default AnnouncementPage
