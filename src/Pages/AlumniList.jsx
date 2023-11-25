import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import Male from '../assets/male.svg'
import Female from '../assets/female.svg'
import { MdKeyboardArrowRight } from 'react-icons/md'
import { MdShareLocation } from 'react-icons/md'
import { FaUserGraduate } from 'react-icons/fa6'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../UserContext'
import {
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useToast,
} from '@chakra-ui/react'
import { FaGraduationCap } from 'react-icons/fa6'
import { ChevronDownIcon } from '@chakra-ui/icons'
import { brandColor } from './Components/CustomDesign'
import Loading from './Components/Loading'
import { api } from './Components/API'
import AlumniProfileModal from './Components/AlumniProfileModal'

const AlumniList = () => {
  const { user, setUser } = useContext(UserContext)
  const toast = useToast()
  const navigate = useNavigate()
  const [alumnies, setAlumnies] = useState([])
  const [filterAlumnies, setFilterAlumnies] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false)
  const [selectedProfile, setSelectedProfile] = useState('')
  const [degree, setDegree] = useState('Degree')
  const currentYear = new Date().getFullYear()
  const startYear = currentYear - 49
  const years = [...[...Array(50)].map((_, index) => startYear + index), 'All']
  const [batch, setBatch] = useState('Batch')
  const [degrees, setDegrees] = useState([])

  const fetchContent = async () => {
    const jwtToken = sessionStorage.getItem('jwtToken')

    await axios
      .get(`${api}/api/departments/degrees/${user.department}`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      })
      .then((response) => {
        const updatedDegrees = [
          { name: 'Degree' },
          ...response.data.degrees.map((degree) => ({ ...degree })),
        ]

        setDegrees(updatedDegrees)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const handleProfileModal = ({ alumniId }) => {
    setIsProfileModalOpen(true)
    setSelectedProfile(alumniId)
  }

  useEffect(() => {
    fetchContent()
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
    document.title = 'Alumnies'
  }, [])

  const fetchAlumniList = () => {
    const jwtToken = sessionStorage.getItem('jwtToken')
    axios
      .get(`${api}/api/auth/alumnies`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      })
      .then((response) => {
        setAlumnies(response.data)
        setFilterAlumnies(response.data)
      })
      .catch((error) => {
        handleApiError(error)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  useEffect(() => {
    fetchAlumniList()
  }, [])

  useEffect(() => {
    filterData(degree, batch)
  }, [alumnies, degree, batch])

  const filterData = (selectedDegree, selectedBatch) => {
    setDegree(selectedDegree)
    setBatch(selectedBatch)

    if (selectedDegree === 'Degree' && selectedBatch === 'Batch') {
      setFilterAlumnies(alumnies)
    } else {
      let filteredData = alumnies

      if (selectedDegree !== 'Degree') {
        filteredData = filteredData.filter((alumni) =>
          alumni.parmanentCourses.some(
            (course) =>
              course.degree.toLowerCase() === selectedDegree.toLowerCase()
          )
        )
      }

      if (selectedBatch !== 'All') {
        filteredData = filteredData.filter((alumni) =>
          alumni.parmanentCourses.some(
            (course) => course.admissionYear === selectedBatch
          )
        )
      }

      setFilterAlumnies(filteredData)
    }
  }

  const handleFetch = () => {
    fetchAlumniList()
  }

  const handleApiError = (error) => {
    if (error.response && error.response.status === 401) {
      setUser(null)
      sessionStorage.removeItem('jwtToken')
      sessionStorage.removeItem('user')
      navigate('/')
      toast({
        title: 'Session expired!',
        description: 'You need to login again.',
        status: 'error',
        isClosable: true,
        duration: 2500,
        position: 'top',
      })
      return
    }

    setUser(null)
    sessionStorage.removeItem('jwtToken')
    sessionStorage.removeItem('user')
    navigate('/')
    toast({
      title: 'Something is wrong!',
      description: 'You need to login again.',
      status: 'error',
      isClosable: true,
      duration: 2500,
      position: 'top',
    })
  }

  return (
    <>
      <div className='min-h-[700px] lg:min-h-[500px] bg-slate-50 lg:rounded-lg p-2 lg:p-5 dark:bg-slate-800 lg:px-20'>
        <div className='rounded-lg'>
          <p className='text-center font-bold pb-3 text-3xl'>Alumnies</p>
          {isLoading ? (
            <Loading title={'Fetching data...'} />
          ) : (
            <div>
              <div className='m-2 flex gap-5'>
                <Menu>
                  <MenuButton
                    _hover={{ bg: brandColor.second }}
                    _active={{ bg: brandColor.first }}
                    color={'white'}
                    size={'sm'}
                    background={brandColor.first}
                    as={Button}
                    rightIcon={<ChevronDownIcon />}
                    className={`uppercase`}
                  >
                    {degree}
                  </MenuButton>
                  <MenuList className='dark:bg-slate-800'>
                    {degrees.map((item, index) => (
                      <div key={index}>
                        <MenuItem
                          _hover={{ background: brandColor.dark }}
                          onClick={() => {
                            setDegree(item)
                            filterData(item.name, batch)
                          }}
                          className='dark:bg-slate-800'
                        >
                          <div className='flex'>
                            <MdKeyboardArrowRight
                              size={20}
                              className='mt-[2px] mr-2'
                              style={{ color: brandColor.first }}
                            />
                            {item.name === 'Degree' ? 'All' : item.name}
                          </div>
                        </MenuItem>
                      </div>
                    ))}
                  </MenuList>
                </Menu>
                <Menu size={'lg'}>
                  <MenuButton
                    _hover={{ bg: brandColor.second }}
                    _active={{ bg: brandColor.first }}
                    color={'white'}
                    size={'sm'}
                    background={brandColor.first}
                    as={Button}
                    rightIcon={<ChevronDownIcon />}
                    className={`${degree !== 'Degree' && 'uppercase'}`}
                  >
                    {batch !== 'Batch' ? batch + ' Batch ' : batch}
                  </MenuButton>
                  <MenuList
                    maxH={'300px'}
                    overflowY={'scroll'}
                    className='dark:bg-slate-800'
                  >
                    {years.reverse().map((item, index) => (
                      <div key={index}>
                        <MenuItem
                          _hover={{ background: brandColor.dark }}
                          onClick={() => {
                            setBatch(item)
                            filterData(degree, item)
                          }}
                          className='dark:bg-slate-800'
                        >
                          <div className='flex'>
                            <MdKeyboardArrowRight
                              size={20}
                              className='mt-[2px] mr-5'
                              style={{ color: brandColor.first }}
                            />
                            {item}
                          </div>
                        </MenuItem>
                      </div>
                    ))}
                  </MenuList>
                </Menu>
              </div>
              <div className='alumniListcardContainner w-full'>
                {filterAlumnies.map((alumni, index) => (
                  <div
                    onClick={() => handleProfileModal({ alumniId: alumni._id })}
                    key={index}
                    className='flex alumniCard bg-slate-200 rounded-lg cursor-pointer dark:bg-slate-900 m-2 p-4'
                  >
                    <div className='w-[20%] flex justify-center'>
                      <img
                        src={alumni.gender === 'male' ? Male : Female}
                        className='w-[80px]'
                        alt='User'
                      />
                    </div>
                    <div className='w-[80%] max-md:pl-3 flex justify-between'>
                      <div>
                        <div className='flex justify-between flex-col items-start'>
                          <p className='font-bold text-2xl'>{alumni.name}</p>
                          <div>
                            <div className='flex'>
                              <FaGraduationCap className='mt-[1px] mr-1' />
                              <p className='text-sm'>
                                Dept. of {alumni.department}
                              </p>
                            </div>
                            {alumni.otherInfo.address && (
                              <div className='flex '>
                                <MdShareLocation className='mt-[1px] mr-1' />
                                <p className='text-sm'>
                                  Lives in {alumni.otherInfo.address}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {filterAlumnies.length === 0 && (
                <div className=' mt-14'>
                  <div className='flex justify-center'>
                    <FaUserGraduate className='mb-3 opacity-[0.6]' size={50} />
                  </div>
                  <p className='text-2xl text-center font-bold opacity-[0.6]'>
                    No results found
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
        {isProfileModalOpen && (
          <AlumniProfileModal
            isOpen={true}
            onClose={() => setIsProfileModalOpen(false)}
            alumniId={selectedProfile}
            fetchData={handleFetch}
          />
        )}
      </div>
    </>
  )
}

export default AlumniList
