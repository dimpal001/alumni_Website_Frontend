import { Center, IconButton, useToast } from '@chakra-ui/react'
import Image from '../assets/dashboard.svg'
import { HiSearchCircle } from 'react-icons/hi'
import { ArrowForwardIcon } from '@chakra-ui/icons'
import { brandColor } from './Components/CustomDesign'
import { MdShareLocation, MdWork } from 'react-icons/md'
import Male from '../assets/male.svg'
import Female from '../assets/female.svg'
import { useState } from 'react'
import axios from 'axios'
import Loading from './Components/Loading'
const DashboardPage = ({ user }) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isFirstTime, setIsFirstTime] = useState(false)
  const toast = useToast()

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
        `http://192.168.1.15:3000/api/search?name=${searchQuery}`,
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
  return (
    <>
      {user.type === 'user' && (
        <Center
          flexDir={'column'}
          className='mt-5 min-h-[700px] lg:min-h-[500]'
        >
          <div>
            <div>
              <p className='text-center text-3xl font-bold pb-10'>
                Welcome <span className='text-primary'>{user.name}</span>
              </p>
            </div>
            <div className='flex justify-center'>
              <img className='w-[80%] lg:w-[60%]' src={Image} alt='' />
            </div>
          </div>
          <div>
            <p className='text-center py-10 text-xl font-bold'>
              Make a request to be an{' '}
              <span className='text-primary'>Alumni</span>
            </p>
          </div>
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
                    <HiSearchCircle size={30} />
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
                <div className='w-[95%] lg:w-[70%]'>
                  {searchResults &&
                    searchResults.map((alumni, index) => (
                      <div key={index}>
                        <AlumniCard
                          name={alumni.name}
                          gender={alumni.gender}
                          worksAt={alumni.otherInfo.worksAt}
                          address={alumni.otherInfo.address}
                        />
                      </div>
                    ))}
                  {isLoading && <Loading title={'Searching...'} />}
                  {isFirstTime && !isLoading && searchResults.length == 0 && (
                    <p className='text-2xl text-center font-bold opacity-[0.6] mt-14'>
                      No data found
                    </p>
                  )}
                </div>
              </Center>
            </form>
          </div>
        )}
      </div>
    </>
  )
}

const AlumniCard = ({ name, gender, worksAt, address, click }) => {
  return (
    <>
      <div className='flex w-[100%] bg-slate-200 dark:bg-slate-900 rounded-lg max-md:mb-3 lg:m-2 p-4'>
        <div className='w-[20%] flex pr-4 justify-center'>
          <img
            src={gender === 'male' ? Male : Female}
            className='w-[80px]'
            alt='User'
          />
        </div>
        <div className='w-[80%] flex justify-between'>
          <div className='w-[100%]'>
            <div className='flex justify-between w-[100%] flex-col items-start'>
              <p className='font-bold text-2xl'>{name}</p>
              <div className='block lg:flex gap-5 '>
                {worksAt != '' && (
                  <div className='flex py-1 items-center'>
                    <MdWork size={15} />
                    <p className='text-xs pt-1 pl-1'>Works at {worksAt}</p>
                  </div>
                )}
                {address != '' && (
                  <div className='flex items-center'>
                    <MdShareLocation size={17} />
                    <p className='text-sm font-bold pt-1 pl-1'>{address}</p>
                  </div>
                )}
              </div>
              <div className='w-[100%] mt-2'>
                <button
                  onClick={click}
                  className='rounded-lg bg-primary text-white hover:bg-primary hover:text-white transition-all delay-[0.05s] font-bold text-sm w-[100%] py-[6px] px-10'
                >
                  Explore
                </button>
              </div>
            </div>
          </div>
          <div className='flex flex-col justify-around'></div>
        </div>
      </div>
    </>
  )
}

export default DashboardPage
