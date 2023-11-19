import { useContext, useEffect, useState } from 'react'
import UploadAnnouncementModal from './Components/UploadAnnouncementModal'
import { CButton1 } from './Components/CustomDesign'
import axios from 'axios'
import Male from '../assets/male.svg'
import Female from '../assets/female.svg'
import SinglPostModal from './Components/SinglPostModal'
import AlumniPostRequest from './Components/AlumniPostRequest'
import Loading from './Components/Loading'
import { UserContext } from '../UserContext'

const PostPage = () => {
  const { user } = useContext(UserContext)
  const [isAnnouceModalOpen, setIsAnnounceModalOpen] = useState(false)
  const [isSinglePostModalOpen, setSinglePostModalOpen] = useState(false)
  const [isPostRequestModal, setIsPostRequestModal] = useState(false)
  const [selectedPost, setSelectedPost] = useState(false)
  const [announcements, setAnnouncements] = useState([])
  const [loading, setLoading] = useState(true)

  const handleModalOpen = () => {
    setIsAnnounceModalOpen(true)
  }

  const handleSinglePostModal = () => {
    setSinglePostModalOpen(true)
  }
  const handlePostRequest = () => {
    setIsPostRequestModal(true)
  }

  const fetchAnnouncements = async () => {
    try {
      const response = await axios.get(
        'http://localhost:3000/api/announcement/all'
      )
      setAnnouncements(response.data)
      console.log(announcements)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching announcements:', error.message)
    }
  }

  useEffect(() => {
    fetchAnnouncements()
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
    document.title = 'Posts'
  }, [])
  return (
    <>
      {loading ? (
        <Loading title={'Fetching data...'} />
      ) : (
        <div className='min-h-[700px] lg:min-h-[530px] bg-slate-50 rounded-lg p-5 dark:bg-slate-800 lg:px-10'>
          <p className='text-center font-bold pb-3 text-3xl'>Announcements</p>
          {isAnnouceModalOpen && (
            <UploadAnnouncementModal
              isOpen={true}
              onClose={() => setIsAnnounceModalOpen(false)}
            />
          )}
          <div className='flex w-full'>
            <div className='w-[55%]'>
              {announcements &&
                announcements.map((announcements, index) => (
                  <div key={index}>
                    <div className='px-4 py-3 border rounded-lg my-3'>
                      <div className='flex'>
                        <img
                          src={announcements.gender === 'male' ? Male : Female}
                          alt='Selected Image'
                          className='w-[40px] object-cover rounded-md'
                        />
                        <div className='pl-5'>
                          <p className='font-bold'>{announcements.name}</p>
                          <p className='text-sm'>
                            {announcements.uploadDateTime}
                          </p>
                        </div>
                      </div>
                      <div>
                        <p className='px-2 font-bold py-1 text-sm'>
                          {announcements.title}
                        </p>
                        <p className='px-2 py-1 text-sm'>
                          {announcements.description}
                        </p>
                      </div>
                      <div
                        className='rounded-lg cursor-pointer'
                        onClick={() => {
                          handleSinglePostModal()
                          setSelectedPost(announcements)
                        }}
                      >
                        {announcements.attachment && (
                          <img
                            src={`http://localhost:3000/api/announcement/uploads/${announcements.attachment}`}
                            alt='Announcement Attachment'
                            className='w-full overflow-hidden rounded-lg max-h-[450px]'
                          />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
            <div className='w-[45%]'>
              <div className=' my-3'>
                <div className='flex justify-center'>
                  <CButton1 onClick={handleModalOpen} title={'Create a post'} />
                </div>
              </div>
              {user.type === 'admin' && (
                <div className=' my-3'>
                  <div className='flex justify-center'>
                    <CButton1
                      onClick={handlePostRequest}
                      title={'Alumni Post Requests'}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
          {isSinglePostModalOpen && (
            <SinglPostModal
              isOpen={true}
              onClose={() => setSinglePostModalOpen(false)}
              announcement={selectedPost}
            />
          )}
          {isPostRequestModal && (
            <AlumniPostRequest
              isOpen={true}
              onClose={() => setIsPostRequestModal(false)}
            />
          )}
        </div>
      )}
    </>
  )
}

export default PostPage
