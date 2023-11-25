import { Center, IconButton, useToast } from '@chakra-ui/react'
import Image from '../assets/dashboard.svg'
import { ArrowForwardIcon } from '@chakra-ui/icons'
import { CButton1, brandColor } from './Components/CustomDesign'
import Male from '../assets/male.svg'
import Female from '../assets/female.svg'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Loading from './Components/Loading'
import { BiSearchAlt } from 'react-icons/bi'
import { FaGraduationCap, FaUserGraduate } from 'react-icons/fa6'
import MakeRequestModal from './Components/MakeRequestModal'
import AlumniProfileModal from './Components/AlumniProfileModal'
import { api } from './Components/API'
const DashboardPage = ({ user }) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isFirstTime, setIsFirstTime] = useState(false)
  const [isAlumniModalOpen, setIsAlumniModalOpen] = useState(false)
  const [selectedAlumniId, setSelectedAlumniId] = useState('')
  const toast = useToast()
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false)

  const handleModalOpen = () => {
    setIsRequestModalOpen(true)
  }

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
    document.title = 'Dashboard'
  }, [])

  const handleSearch = async (e) => {
    e.preventDefault()
    if (searchQuery === '') {
      toast({
        title: 'Enter a name',
        status: 'error',
        isClosable: true,
        position: 'top',
        duration: 1800,
      })
      setSearchResults([])
      return
    }
    setIsFirstTime(true)
    setIsLoading(true)

    const jwtToken = sessionStorage.getItem('jwtToken')
    try {
      const response = await axios.get(
        `${api}/api/search?name=${searchQuery}`,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      )
      setSearchResults(response.data)
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      console.error(error)
    }
  }

  const handleAlumniModalOpen = () => {
    setIsAlumniModalOpen(true)
  }

  return (
    <>
      {user.type === 'user' && (
        <Center
          flexDir={'column'}
          className='min-h-[700px] bg-slate-50 rounded-lg dark:bg-slate-800 lg:min-h-[500px]'
        >
          <div>
            <div>
              <p className='text-center text-3xl font-bold py-1'>
                Welcome <span className='text-primary'>{user.name}</span>
              </p>
              <p className='text-center text-2xl font-bold py-1'>
                Department of{' '}
                <span className='capitalize'>{user.department}</span>
              </p>
            </div>
            <div className='flex justify-center'>
              <img className='w-[80%] lg:w-[60%]' src={Image} alt='' />
            </div>
          </div>
          <div className='mt-5'>
            <CButton1
              leftIcon={<FaUserGraduate />}
              title={'Be an alumni'}
              onClick={handleModalOpen}
            />
          </div>
          {isRequestModalOpen && (
            <MakeRequestModal
              isOpen={true}
              setOpen={() => setIsRequestModalOpen(false)}
            />
          )}
        </Center>
      )}
      <div>
        {user.type != 'user' && (
          <div>
            <form>
              <Center className='bg-slate-50 lg:p-5 min-h-[700px] lg:min-h-[500px] flex dark:bg-slate-800 lg:rounded-lg flex-col'>
                <p className='font-bold py-3 text-3xl'>
                  Search an <span className='text-primary'>Alumni</span>
                </p>
                <div>
                  <div className='flex border border-slate-400 p-2 rounded-lg items-center'>
                    <BiSearchAlt size={30} />
                    <input
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder='Type an alumni name'
                      type='text'
                      className='bg-transparent border-none focus:outline-none font-bold px-2 text-lg'
                    />
                    <IconButton
                      type='submit'
                      onClick={handleSearch}
                      borderRadius={'full'}
                      background={brandColor.first}
                      _hover={{ background: brandColor.second }}
                      icon={<ArrowForwardIcon color={'white'} boxSize={6} />}
                    />
                  </div>
                </div>
                {searchResults.length > 0 && (
                  <p className='font-bold opacity-[0.5] my-2'>
                    Search Result : {searchResults.length}
                  </p>
                )}
                <div className='w-full cardContainer place-content-center lg:justify-center px-5 lg:gap-x-5'>
                  {searchResults &&
                    searchResults.map((alumni, index) => (
                      <div key={index} className='my-3 profileCard'>
                        <AlumniCard
                          user={user}
                          alumniId={alumni._id}
                          name={alumni.name}
                          gender={alumni.gender}
                          degree={alumni.parmanentCourses[0].degree}
                          department={alumni.parmanentCourses[0].department}
                          batch={alumni.parmanentCourses[0].admissionYear}
                          click={(e) => {
                            e.preventDefault()
                            handleAlumniModalOpen()
                            setSelectedAlumniId(alumni._id)
                          }}
                        />
                      </div>
                    ))}
                  {isLoading && <Loading title={'Searching...'} />}
                  {isFirstTime && !isLoading && searchResults.length == 0 && (
                    <div className=' mt-14'>
                      <div className='flex justify-center'>
                        <FaUserGraduate
                          className='mb-3 opacity-[0.6]'
                          size={50}
                        />
                      </div>
                      <p className='text-2xl text-center font-bold opacity-[0.6]'>
                        No results found
                      </p>
                    </div>
                  )}
                </div>
              </Center>
            </form>
          </div>
        )}
        {isAlumniModalOpen && (
          <AlumniProfileModal
            isOpen={true}
            onClose={() => setIsAlumniModalOpen(false)}
            alumniId={selectedAlumniId}
          />
        )}
      </div>
    </>
  )
}

const AlumniCard = ({
  user,
  alumniId,
  name,
  gender,
  degree,
  department,
  batch,
  click,
}) => {
  return (
    <>
      <div className='min-h-[150px] bg-slate-200 dark:bg-slate-900 rounded-lg max-md:mb-3 p-4'>
        <div className='w-[100%] flex pr-4 justify-center'>
          <img
            src={gender === 'male' ? Male : Female}
            className='w-[120px]'
            alt='User'
          />
        </div>
        <div className='w-[100%] flex lg:px-8 justify-between'>
          <div className='w-[100%]'>
            <div className='w-full'>
              <p className='font-bold text-center text-2xl'>
                {name}{' '}
                {alumniId === user._id && (
                  <span className='text-xs bg-green-400 border-green-400 rounded-sm px-[5px] py-[1px]'>
                    You
                  </span>
                )}
              </p>
              <div className='flex justify-center'>
                {degree && department && (
                  <div className='flex justify-center'>
                    <div className='flex font-bold py-1 items-start'>
                      <FaGraduationCap size={20} className='mt-1' />
                      <p className='text-sm text-center pt-1 pl-1'>
                        {degree} in <br /> {department}
                      </p>
                    </div>
                  </div>
                )}
              </div>
              <div className='flex justify-center'>
                {batch && (
                  <div>
                    <p className='font-bold'>
                      Batch : <span className='text-primary'>{batch}</span>{' '}
                    </p>
                  </div>
                )}
              </div>
              <div className='w-[100%] mt-2'>
                <button
                  onClick={click}
                  className='rounded-lg bg-primary text-white hover:bg-primary hover:text-white transition-all delay-[0.05s] font-bold text-sm w-[100%] py-[6px] px-10'
                >
                  View Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default DashboardPage
