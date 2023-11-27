import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
} from '@chakra-ui/react'
import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import Loading from './Loading'
import {
  FaGraduationCap,
  FaLink,
  FaLinkedin,
  FaLocationDot,
  FaSquareGithub,
} from 'react-icons/fa6'
import Male from '../../assets/male.svg'
import Female from '../../assets/female.svg'
import { MdEmail, MdOutlineWork } from 'react-icons/md'
import { BsPersonWorkspace } from 'react-icons/bs'
import { FaPhoneSquare } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { UserContext } from '../../UserContext'
import { MdDeleteForever } from 'react-icons/md'
import { api } from './API'
import DeleteUser from './DeleteUser'

const AlumniProfileModal = ({ isOpen, onClose, alumniId, fetchData }) => {
  const [alumni, setAlumni] = useState()
  const [isLoading, setIsLoading] = useState(true)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const { user } = useContext(UserContext)
  useEffect(() => {
    const jwtToken = sessionStorage.getItem('jwtToken')
    axios
      .get(`${api}/api/auth/${alumniId}`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      })
      .then((response) => {
        setAlumni(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
      .finally(() => {
        setIsLoading(false)
        console.log(alumni)
      })
  }, [])

  const handleDeleteModal = () => {
    setIsDeleteModalOpen(true)
  }

  const handleClose = () => {
    onClose()
    fetchData()
  }

  return (
    <>
      <Modal
        isOpen={isOpen}
        size={{ base: 'full', md: 'xl' }}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent className='dark:bg-slate-900 dark:text-white'>
          {isLoading ? (
            <div>
              <Loading title={'Fetching alumni data...'} />
            </div>
          ) : (
            <div className='pt-5'>
              <ModalCloseButton />
              <ModalBody>
                {alumni && (
                  <div>
                    <div className='flex justify-center'>
                      <img
                        src={alumni.gender === 'male' ? Male : Female}
                        className='w-[150px]'
                        alt='User'
                      />
                    </div>
                    <div>
                      <p className='text-3xl py-1 font-bold text-center '>
                        {alumni.name}
                      </p>
                    </div>
                    <div>
                      <div className='lg:mx-6'>
                        <div className=' my-3'>
                          {alumni.otherInfo.worksAt && (
                            <InfoCard1
                              icon={
                                <MdOutlineWork size={22} className='mr-4' />
                              }
                              info={`Works at ${alumni.otherInfo.worksAt}`}
                            />
                          )}
                          {alumni.otherInfo.positionAtWork && (
                            <InfoCard1
                              icon={
                                <BsPersonWorkspace size={20} className='mr-4' />
                              }
                              info={`As ${alumni.otherInfo.positionAtWork}`}
                            />
                          )}
                          {alumni.parmanentCourses.map((course, index) => (
                            <div key={index}>
                              <InfoCard1
                                icon={
                                  <FaGraduationCap size={30} className='mr-4' />
                                }
                                info={`${course.degree} in ${course.department} | ${course.admissionYear}`}
                              />
                            </div>
                          ))}
                          {alumni.email && (
                            <InfoCard1
                              icon={<MdEmail size={22} className='mr-4' />}
                              info={`${alumni.email}`}
                            />
                          )}
                          {alumni.phone && (
                            <InfoCard1
                              icon={
                                <FaPhoneSquare size={22} className='mr-4' />
                              }
                              info={`${alumni.phone}`}
                            />
                          )}
                          {alumni.otherInfo.address && (
                            <InfoCard1
                              icon={
                                <FaLocationDot size={22} className='mr-4' />
                              }
                              info={`${alumni.otherInfo.address}`}
                            />
                          )}
                          {alumni.otherInfo.website && (
                            <Link
                              target='_blank'
                              to={alumni.otherInfo.website}
                              className='hover:text-primary'
                            >
                              <InfoCard1
                                icon={<FaLink size={22} className='mr-4' />}
                                info={`${alumni.otherInfo.website}`}
                              />
                            </Link>
                          )}
                          {alumni.otherInfo.gitHubLink && (
                            <Link
                              target='_blank'
                              to={alumni.otherInfo.gitHubLink}
                              className='hover:text-primary'
                            >
                              <InfoCard1
                                icon={
                                  <FaSquareGithub size={22} className='mr-4' />
                                }
                                info={`${alumni.otherInfo.gitHubLink}`}
                              />
                            </Link>
                          )}
                          {alumni.otherInfo.linkedInLink && (
                            <Link
                              target='_blank'
                              to={alumni.otherInfo.linkedInLink}
                              className='hover:text-primary'
                            >
                              <InfoCard1
                                icon={<FaLinkedin size={22} className='mr-4' />}
                                info={`${alumni.otherInfo.linkedInLink}`}
                              />
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                    <div>
                      {alumni.parmanentCourses &&
                        alumni.parmanentCourses.map((course, index) => (
                          <div key={index}>
                            <div className='rounded-lg p-5 lg:grid grid-cols-2 my-5 bg-slate-300 dark:bg-slate-800 w-full'>
                              {user.type === 'admin' && (
                                <InfoCard2
                                  title={'Registration Number'}
                                  info={course.registrationNumber}
                                />
                              )}
                              <InfoCard2
                                title={'Degree'}
                                info={course.degree}
                              />
                              <InfoCard2
                                title={'Department'}
                                info={course.department}
                              />
                              <InfoCard2
                                title={'Admission Year'}
                                info={course.admissionYear}
                              />
                              <InfoCard2
                                title={'Completion Year'}
                                info={course.admissionYear}
                              />
                              {user.type === 'admin' && (
                                <InfoCard2
                                  title={'Roll Numner'}
                                  info={course.rollNumber}
                                />
                              )}
                              <InfoCard2 title={'CGPA'} info={course.cgpa} />
                              <InfoCard2
                                title={'Percentage (%)'}
                                info={(course.cgpa * 10 - 5).toFixed(2)}
                              />
                            </div>
                          </div>
                        ))}
                    </div>
                    <div>
                      {alumni.workingExperience &&
                        alumni.workingExperience.map((work, index) => (
                          <div key={index}>
                            <div className='rounded-lg p-5 lg:grid grid-cols-2 my-5 bg-slate-300 dark:bg-slate-800 w-full'>
                              {user.type === 'admin' && (
                                <InfoCard2
                                  title={'Company Name'}
                                  info={work.companyName}
                                />
                              )}
                              <InfoCard2
                                title={'Company Location'}
                                info={work.place}
                              />
                              <InfoCard2
                                title={'Position at Work'}
                                info={work.position}
                              />
                              <InfoCard2
                                title={'Working From'}
                                info={work.from}
                              />
                              {user.type === 'admin' && (
                                <InfoCard2
                                  title={'Working To'}
                                  info={work.to}
                                />
                              )}
                            </div>
                          </div>
                        ))}
                    </div>
                    {user.type === 'admin' && (
                      <div className='mb-5'>
                        <Button
                          rightIcon={<MdDeleteForever size={20} />}
                          className='w-full '
                          background={'red.500'}
                          _hover={{
                            background: 'red.600',
                          }}
                          onClick={handleDeleteModal}
                          color={'white'}
                        >
                          Delete User
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              </ModalBody>
              {isDeleteModalOpen && (
                <DeleteUser
                  isOpen={true}
                  onClose={() => setIsDeleteModalOpen(false)}
                  userId={alumniId}
                  onParenModalClose={handleClose}
                  alumniName={alumni.name}
                />
              )}
            </div>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}

const InfoCard1 = ({ icon, info }) => {
  return (
    <>
      <div className='flex items-start justify-start my-2 opacity-[0.9]'>
        {icon}
        <p className='font-bold'>{info}</p>
      </div>
    </>
  )
}

const InfoCard2 = ({ title, info }) => {
  return (
    <>
      <div className='opacity-[0.8] hover:opacity-[1] my-3'>
        <p className='text-xs'>{title}</p>
        <p className=' font-bold text-base'>{info}</p>
      </div>
    </>
  )
}

export default AlumniProfileModal
