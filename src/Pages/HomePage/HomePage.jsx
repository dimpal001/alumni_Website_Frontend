import {
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from '@chakra-ui/react'

import { MdPersonSearch } from 'react-icons/md'
import { AiOutlineEnter } from 'react-icons/ai'
import { MdSearch } from 'react-icons/md'
import { CButton, brandColor } from '../../Components/CustomDesigns'
import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../UserContext'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import axios from 'axios'
import Logo from '../../assets/nehulogo.png'
import { api } from '../../Components/API'
import Img from '../../assets/user.png'
const HomePage = () => {
  const navigate = useNavigate()
  const { user } = useContext(UserContext)
  const [query, setQuery] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [searchResults, setSearchResults] = useState([])

  useEffect(() => {
    scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }, [])

  const handleSearch = async (event) => {
    event.preventDefault()
    const token = sessionStorage.getItem('token')
    if (!user) {
      navigate('/login')
      return
    }
    if (user.type === 'guest') {
      toast.error('Only approved alumni can search')
      return
    }
    if (query === '') {
      toast.error('Enter a valid name, title, batch or branch')
      return
    }
    setIsLoading(true)

    try {
      const response = await axios.get(
        `${api}/api/profile/search/${query}`,

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      setSearchResults(response.data.results)
      console.log(searchResults)
      setIsLoading(false)
    } catch (error) {
      console.error('Error searching alumni:', error)
      toast.error(error.response.data.message)
      setSearchResults([])
      setQuery('')
      setIsLoading(false)
    }
  }

  const handleAdvSearch = (event) => {
    event.preventDefault()
    if (!user) {
      navigate('/login')
    }
    if (user.type === 'guest') {
      toast.error('Only approved alumni can search')
    } else {
      navigate('/advanced-search')
    }
  }

  return (
    <>
      <div className='w-full py-5 container'>
        <div>
          <div>
            <div className='pb-10'>
              <div className='flex justify-center'>
                {/* <img
                  data-aos='zoom-in'
                  src={Logo}
                  alt=''
                  className='w-[150px]'
                /> */}
              </div>
              <p
                data-aos='fade-up'
                className='text-center text-4xl lg:text-6xl font-bold font-serif'
              >
                Welcome <span className='text-primary'>Alumni</span>
              </p>
              <p data-aos='fade-up' className='text-center font-bold text-lg'>
                Join us in celebrating your journey
              </p>
            </div>
            <form data-aos='zoom-in-up' className='lg:px-[400px] px-7'>
              <InputGroup className='bg-white rounded-xl dark:bg-slate-950'>
                <InputLeftElement marginLeft={{ lg: 5 }} pointerEvents='none'>
                  <MdPersonSearch size={25} color={brandColor.primary} />
                </InputLeftElement>
                <Input
                  borderRadius={10}
                  onChange={(e) => setQuery(e.target.value)}
                  paddingInline={{ base: 10, lg: 20 }}
                  size={'lg'}
                  value={query}
                  fontSize={'md'}
                  _placeholder={{ fontSize: 'sm' }}
                  placeholder='Search alumni by Name | Title | Batch | Branch'
                />
                <InputRightElement marginRight={{ lg: 5 }}>
                  <AiOutlineEnter size={25} color={brandColor.primary} />
                </InputRightElement>
              </InputGroup>
              <div className='py-3 flex gap-x-4 justify-center'>
                <CButton
                  onClick={handleSearch}
                  type={'submit'}
                  leftIcon={<MdSearch size={27} />}
                  title={'Search'}
                  isLoading={isLoading}
                  loadingText={'Searching...'}
                />
                <CButton
                  onClick={handleAdvSearch}
                  type={'submit'}
                  title={'Advanced search'}
                />
              </div>
            </form>
            {!user && (
              <p
                data-aos='fade-up'
                className='text-center lg:px-[280px] px-5 text-lg'
              >
                To become an alumni user and access associated benefits on the
                website, kindly submit a request through the "My Request"
                section after login.
              </p>
            )}
            <div className='lg:flex justify-center flex-wrap'>
              {searchResults &&
                searchResults.map((item, index) => (
                  <div className='lg:w-[25%]' key={index}>
                    <AlumniCard
                      alumni={item}
                      demo={Img}
                      onClick={() =>
                        window.open(`/profile/${item.user}`, '_blank')
                      }
                    />
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

const AlumniCard = ({ alumni, demo, onClick }) => {
  return (
    <div className='py-2 px-12 lg:px-5'>
      <div
        onClick={onClick}
        className='bg-white cursor-pointer rounded-md hover:shadow-2xl hover:scale-[1.01] transition-all delay-[0.03s] dark:bg-slate-950 p-5'
      >
        <div>
          <img className='rounded-md' src={demo} alt='' />
        </div>
        <p className='font-bold text-xl mt-2 text-primary'>{alumni.name}</p>
        <p>
          Department :{' '}
          <span className='capitalize'>
            {alumni.academicDetails[0].department}
          </span>
        </p>
        <p>{alumni.academicDetails[0].admissionYear}</p>
      </div>
    </div>
  )
}

export default HomePage
