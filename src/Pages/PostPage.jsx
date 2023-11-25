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
import { api } from './Components/API'
import { Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react'
import { MdAnnouncement } from 'react-icons/md'
import { IoOptionsSharp } from 'react-icons/io5'

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
      const response = await axios.get(`${api}/api/announcement/all`)
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
        <div className='min-h-[700px] lg:min-h-[530px] bg-slate-50 rounded-lg p-3 dark:bg-slate-800 lg:px-10'>
          <div className='flex justify-around items-baseline'>
            <p className='text-center font-bold pb-3 text-3xl'>Announcements</p>
            <div className='md:hidden'>
              <Menu>
                <MenuButton>
                  <IoOptionsSharp size={25} />
                </MenuButton>
                <MenuList className='dark:bg-slate-950'>
                  <MenuItem
                    onClick={handleModalOpen}
                    className='font-bold dark:bg-slate-950'
                  >
                    <span className='text-primary'>Create</span>
                  </MenuItem>
                  {user.type === 'admin' && (
                    <MenuItem
                      onClick={handlePostRequest}
                      className='font-bold dark:bg-slate-950'
                    >
                      <span className='text-primary'>
                        Announcement Requests
                      </span>
                    </MenuItem>
                  )}
                </MenuList>
              </Menu>
            </div>
          </div>
          {isAnnouceModalOpen && (
            <UploadAnnouncementModal
              isOpen={true}
              onClose={() => setIsAnnounceModalOpen(false)}
            />
          )}
          <div className='w-full'>
            <div className='md:flex hidden gap-x-3 md:justify-start max-sm:justify-center'>
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
            <div className=''>
              {announcements &&
                announcements.map((announcements, index) => (
                  <div key={index}>
                    <div className='px-4 py-3 dark:bg-slate-900 bg-slate-200 rounded-lg my-3'>
                      <div className='flex'>
                        <img
                          src={announcements.gender === 'male' ? Male : Female}
                          alt='Selected Image'
                          className='w-[40px] object-cover rounded-md'
                        />
                        <div className='pl-5'>
                          <p className='font-bold'>{announcements.name}</p>
                          <p className='text-sm'>
                            {new Date(
                              announcements.uploadDateTime
                            ).toLocaleDateString('en-GB', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric',
                            })}
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
                            src={`${api}/api/announcement/uploads/${announcements.attachment}`}
                            alt='Announcement Attachment'
                            className='w-full overflow-hidden rounded-lg max-h-[450px]'
                          />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              {announcements && announcements.length === 0 && (
                <div className=' mt-14'>
                  <div className='flex justify-center'>
                    <MdAnnouncement className='mb-3 opacity-[0.6]' size={50} />
                  </div>
                  <p className='text-2xl text-center font-bold opacity-[0.6]'>
                    No results found
                  </p>
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
