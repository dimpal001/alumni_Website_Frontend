import { useContext, useEffect, useState } from 'react'
import { CButton, brandColor } from '../../Components/CustomDesigns'
import DemoImg from '../../assets/user.png'
import { UserContext } from '../../UserContext'
import axios from 'axios'
import { api } from '../../Components/API'
import Loading from '../../Components/Loading'
import { FaEdit, FaInstagram } from 'react-icons/fa'
import { FaFacebook } from 'react-icons/fa'
import { FaLinkedin } from 'react-icons/fa'
import { FaGithubAlt } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import { FaExternalLinkAlt } from 'react-icons/fa'
import { MdEmail, MdLocationPin } from 'react-icons/md'
import { MdPhone } from 'react-icons/md'
import EditDetailsModal from './EditDetailsModal'
import AddProfessionModal from './AddProfessionModal'
import ChangeProfileModal from './ChangeProfileModal'
import { MdOutlineChangeCircle } from 'react-icons/md'
import { CloseButton, Divider } from '@chakra-ui/react'
import DeleteProfessionModal from './DeleteProfessionModal'
import { Link, useParams } from 'react-router-dom'
import { MdOutlineDeleteForever } from 'react-icons/md'
import RemoveProfilePicModal from './RemoveProfilePicModal'
import ProfilePicModal from './ProfilePicModal'
const ProfilePage = () => {
  const { id } = useParams()
  const { user } = useContext(UserContext)
  const [info, setInfo] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const [profession, setProfession] = useState('')
  const [image, setImage] = useState('')
  const [isEditDetailsModalOpen, setIsEditDetailsModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false)
  const [isAddProfessionModalOpen, setIsAddProfessionModalOpen] =
    useState(false)
  const [isChangeProfileModalOpen, setIsChangeProfileModalOpen] =
    useState(false)
  const [isRemoveProfileModalOpen, setIsRemoveProfileModalOpen] =
    useState(false)

  const handleProfileModal = () => {
    setIsProfileModalOpen(true)
  }

  const handleEditModalOpen = () => {
    setIsEditDetailsModalOpen(true)
  }

  useEffect(() => {
    scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }, [])

  const handleAddProfessionModal = () => {
    setIsAddProfessionModalOpen(true)
  }

  const handleChangeProfileModal = () => {
    setIsChangeProfileModalOpen(true)
  }
  const handleRemoveProfileModal = () => {
    setIsRemoveProfileModalOpen(true)
  }

  const handleDeleteModal = () => {
    setIsDeleteModalOpen(true)
  }

  const fetchDetails = async () => {
    setIsLoading(true)
    const token = sessionStorage.getItem('token')
    await axios
      .get(`${api}/api/profile/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setInfo(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  const handleFetch = () => {
    fetchDetails()
  }

  useEffect(() => {
    fetchDetails()
  }, [])

  return (
    <>
      <div className='w-full container max-sm:px-3 p-5 min-h-[700px] lg:min-h-[580px]'>
        {isLoading ? (
          <Loading />
        ) : (
          <div className='lg:px-32'>
            <div
              data-aos='zoom-in-up'
              className='bg-white rounded-md dark:bg-slate-950 dark:text-white p-5'
            >
              <p className='text-2xl lg:text-3xl font-bold text-center'>
                Profile
              </p>
              <div className='lg:flex justify-center gap-x-16 py-10'>
                <div className='flex flex-col max-sm:pb-5 justify-center items-center'>
                  <div
                    onClick={() => {
                      handleProfileModal()
                      setImage(info.profilePic)
                    }}
                    className='border-4 border-primary w-[200px] lg:w-[190px] h-[200px] lg:h-[190px] rounded-full overflow-hidden'
                  >
                    <img
                      className='w-full h-full object-cover rounded-full'
                      src={info && info.profilePic ? info.profilePic : DemoImg}
                      alt='Profile Pic'
                    />
                  </div>

                  {info && user._id === info.user && (
                    <div className='mt-1'>
                      <div
                        onClick={handleChangeProfileModal}
                        className='flex items-center cursor-pointer'
                      >
                        <MdOutlineChangeCircle
                          color={brandColor.primary}
                          size={20}
                        />
                        <p className='text-lg ml-1 font-bold max-sm:text-center text-primary'>
                          Change Profile Picture
                        </p>
                      </div>
                    </div>
                  )}
                  {info && user._id === info.user && (
                    <div className='mt-1'>
                      <div
                        onClick={handleRemoveProfileModal}
                        className='flex items-center cursor-pointer'
                      >
                        <MdOutlineDeleteForever
                          color={brandColor.error}
                          size={20}
                        />
                        <p
                          className='text-lg ml-1 font-bold max-sm:text-center'
                          style={{ color: brandColor.error }}
                        >
                          Remove Profile Picture
                        </p>
                      </div>
                    </div>
                  )}
                </div>
                <div>
                  <p className='text-3xl max-sm:text-center font-bold'>
                    {info && info.name}
                  </p>
                  <div className='px-1 max-sm:justify-center flex gap-x-5 py-3'>
                    {info && info.personalWebsite && (
                      <Link target='_blank' to={info.personalWebsite}>
                        <FaExternalLinkAlt
                          className='hover:text-primary cursor-pointer'
                          size={25}
                        />
                      </Link>
                    )}
                    {info && info.facebook && (
                      <Link target='_blank' to={info.facebook}>
                        <FaFacebook
                          className='hover:text-primary cursor-pointer'
                          size={25}
                        />
                      </Link>
                    )}
                    {info && info.instagram && (
                      <Link target='_blank' to={info.instagram}>
                        <FaInstagram
                          className='hover:text-primary cursor-pointer'
                          size={25}
                        />
                      </Link>
                    )}
                    {info && info.twitter && (
                      <Link target='_blank' to={info.twitter}>
                        <FaXTwitter
                          className='hover:text-primary cursor-pointer'
                          size={25}
                        />
                      </Link>
                    )}
                    {info && info.linkedIn && (
                      <Link target='_blank' to={info.linkedIn}>
                        <FaLinkedin
                          className='hover:text-primary cursor-pointer'
                          size={25}
                        />
                      </Link>
                    )}
                    {info && info.github && (
                      <Link target='_blank' to={info.github}>
                        <FaGithubAlt
                          className='hover:text-primary cursor-pointer'
                          size={27}
                        />
                      </Link>
                    )}
                  </div>
                  <div>
                    <p className='capitalize max-sm:text-center'>
                      Department of {info && info.academicDetails[0].department}
                    </p>
                  </div>
                  <div>
                    <p className='capitalize max-sm:text-center'>
                      {info && info.academicDetails[0].admissionYear} batch
                    </p>
                  </div>
                  {info && info.address && (
                    <div className='flex max-sm:justify-center items-center'>
                      <MdLocationPin />
                      <p className='ml-2 capitalize'>{info && info.address}</p>
                    </div>
                  )}
                  <div className='flex max-sm:justify-center items-center'>
                    <MdEmail />
                    <p className='ml-2'>{info && info.email}</p>
                  </div>
                  <div className='flex max-sm:justify-center items-center'>
                    <MdPhone />
                    <p className='ml-2'>{info && info.mobileNo}</p>
                  </div>
                  {info && user._id === info.user && (
                    <div
                      onClick={handleEditModalOpen}
                      className='flex items-center max-sm:justify-center cursor-pointer'
                    >
                      <FaEdit color={brandColor.primary} size={18} />
                      <p className='text-lg font-bold ml-1 mt-[1px] max-sm:text-center text-primary'>
                        Edit Details
                      </p>
                    </div>
                  )}
                </div>
              </div>
              <Divider className='mb-5' />
              <div>
                <div className='lg:px-20'>
                  <p className='text-2xl pl-1 max-sm:text-center'>
                    Academic Details
                  </p>
                  {info &&
                    info.academicDetails.map((degree, index) => (
                      <div key={index}>
                        <DegreeCard degree={degree} />
                      </div>
                    ))}
                </div>
                <div className='lg:px-20 pt-7'>
                  <p className='text-2xl pl-1 max-sm:text-center'>
                    Profession Details
                  </p>
                  {info &&
                    info.professions.map((profession, index) => (
                      <div key={index}>
                        <ProfessionCard
                          info={info}
                          user={user}
                          onClick={() => {
                            handleDeleteModal()
                            setProfession(profession._id)
                          }}
                          profession={profession}
                        />
                      </div>
                    ))}
                </div>
                {info && user._id === info.user && (
                  <div className='lg:px-20 py-7'>
                    <CButton
                      onClick={handleAddProfessionModal}
                      width={'100%'}
                      title={'Add Profession Details'}
                    />
                  </div>
                )}
              </div>
              {isEditDetailsModalOpen && (
                <EditDetailsModal
                  fetchDetails={handleFetch}
                  isOpen={true}
                  formData={info}
                  onClose={() => setIsEditDetailsModalOpen(false)}
                />
              )}
              {isAddProfessionModalOpen && (
                <AddProfessionModal
                  fetchDetails={handleFetch}
                  isOpen={true}
                  id={info && info._id}
                  onClose={() => setIsAddProfessionModalOpen(false)}
                />
              )}
              {isChangeProfileModalOpen && (
                <ChangeProfileModal
                  fetchDetails={handleFetch}
                  isOpen={true}
                  id={info && info._id}
                  onClose={() => setIsChangeProfileModalOpen(false)}
                />
              )}
              {isRemoveProfileModalOpen && (
                <RemoveProfilePicModal
                  fetchDetails={handleFetch}
                  isOpen={true}
                  id={info && info._id}
                  onClose={() => setIsRemoveProfileModalOpen(false)}
                />
              )}
              {isDeleteModalOpen && (
                <DeleteProfessionModal
                  fetchDetails={handleFetch}
                  profession={profession}
                  isOpen={true}
                  id={info && info._id}
                  onClose={() => setIsDeleteModalOpen(false)}
                />
              )}
              {isProfileModalOpen && (
                <ProfilePicModal
                  isOpen={true}
                  onClose={() => setIsProfileModalOpen(false)}
                  image={image}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </>
  )
}

const DegreeCard = ({ degree }) => {
  return (
    <div className='p-5 my-2 bg-slate-200 dark:bg-slate-800 rounded-md'>
      <div className='lg:grid capitalize grid-cols-2 gap-y-3 gap-x-16 text-lg max-sm:text-sm'>
        <div className='grid grid-cols-2'>
          <p>Degree : </p>
          <p>{degree.degree}</p>
        </div>
        <div className='grid grid-cols-2'>
          <p>Department : </p>
          <p>{degree.department}</p>
        </div>
        <div className='grid grid-cols-2'>
          <p>Registration No. : </p>
          <p>{degree.registrationNo}</p>
        </div>
        <div className='grid grid-cols-2'>
          <p>Roll No. : </p>
          <p className='uppercase'>{degree.rollNo}</p>
        </div>
        <div className='grid grid-cols-2'>
          <p>Admission Year : </p>
          <p>{degree.admissionYear}</p>
        </div>
        <div className='grid grid-cols-2'>
          <p>Completion Year : </p>
          <p>{degree.completionYear}</p>
        </div>
        <div className='grid grid-cols-2'>
          <p>CGPA Year : </p>
          <p>{degree.cgpa}</p>
        </div>
      </div>
    </div>
  )
}

const ProfessionCard = ({ profession, onClick, info, user }) => {
  return (
    <div className='p-5 my-2 bg-slate-200 relative dark:bg-slate-800 rounded-md'>
      {user._id === info.user && (
        <CloseButton
          onClick={onClick}
          className='absolute top-4 right-4'
          _hover={{ color: 'red' }}
        />
      )}
      <div className='lg:grid capitalize grid-cols-2 gap-x-24 max-sm:text-sm gap-y-1 text-lg'>
        <div className='grid grid-cols-2'>
          <p>Profession : </p>
          <p>{profession.profession}</p>
        </div>
        <div className='grid grid-cols-2'>
          <p>Organisation : </p>
          <p>{profession.organisation}</p>
        </div>
        <div className='grid grid-cols-2'>
          <p>Working from : </p>
          <p>{profession.workingFrom}</p>
        </div>
        <div className='grid grid-cols-2'>
          <p>Working to : </p>
          <p>{profession.workingTo}</p>
        </div>
        <div className='grid grid-cols-2'></div>
      </div>
    </div>
  )
}

export default ProfilePage
