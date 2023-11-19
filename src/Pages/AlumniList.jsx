import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import Male from '../assets/male.svg'
import Female from '../assets/female.svg'
import { MdKeyboardArrowRight, MdWork } from 'react-icons/md'
import { MdShareLocation } from 'react-icons/md'
import { FaSquareGithub, FaLinkedin, FaUserGraduate } from 'react-icons/fa6'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../UserContext'
import {
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useToast,
} from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons'
import { brandColor } from './Components/CustomDesign'
import Loading from './Components/Loading'

const AlumniList = () => {
  const { setUser } = useContext(UserContext)
  const toast = useToast()
  const navigate = useNavigate()
  const [alumnies, setAlumnies] = useState([])
  const [filterAlumnies, setFilterAlumnies] = useState([])
  const [dept, setDept] = useState('Department')
  const [isLoading, setIsLoading] = useState(true)
  const [degree, setDegree] = useState('Degree')
  const currentYear = new Date().getFullYear()
  const startYear = currentYear - 49
  const years = [...[...Array(50)].map((_, index) => startYear + index), 'All']
  const [batch, setBatch] = useState('Batch')
  const [degrees, setDegrees] = useState([])
  const [departments, setDepartments] = useState([])

  const fetchContent = async () => {
    const jwtToken = sessionStorage.getItem('jwtToken')

    await axios
      .get('http://localhost:3000/api/content', {
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

        const updatedDepartments = [
          { name: 'Department' },
          ...response.data.departments.map((department) => ({ ...department })),
        ]

        setDepartments(updatedDepartments)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  useEffect(() => {
    fetchContent()
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
    document.title = 'Alumnies'
  }, [])

  useEffect(() => {
    const jwtToken = sessionStorage.getItem('jwtToken')
    axios
      .get('http://localhost:3000/api/alumni-request', {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      })
      .then((response) => {
        setAlumnies(response.data)
        setFilterAlumnies(response.data)
      })
      .catch((error) => {
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
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [])

  useEffect(() => {
    filterData(dept, degree, batch)
  }, [alumnies, dept, degree, batch])

  const filterData = (selectedDept, selectedDegree, selectedBatch) => {
    setDept(selectedDept)
    setDegree(selectedDegree)
    setBatch(selectedBatch)
    console.log(selectedDegree)
    console.log(selectedBatch)
    console.log(selectedDept)

    if (
      selectedDept === 'Department' &&
      selectedDegree === 'Degree' &&
      selectedBatch === 'Batch'
    ) {
      setFilterAlumnies(alumnies)
    } else {
      let filteredData = alumnies

      if (selectedDept !== 'Department') {
        filteredData = filteredData.filter((alumni) =>
          alumni.parmanentCourses.some(
            (course) =>
              course.department.toLowerCase() === selectedDept.toLowerCase()
          )
        )
      }

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
                    {dept}
                  </MenuButton>
                  <MenuList className='dark:bg-slate-800'>
                    {departments.map((item, index) => (
                      <div key={index}>
                        <MenuItem
                          _hover={{ bg: brandColor.dark }}
                          onClick={() => {
                            setDept(item)
                            filterData(item.name, degree, batch)
                          }}
                          className='dark:bg-slate-800'
                        >
                          <div className='flex'>
                            <MdKeyboardArrowRight
                              size={20}
                              className='mt-[2px] mr-2'
                              style={{ color: brandColor.first }}
                            />
                            {item.name === 'Department' ? 'All' : item.name}
                          </div>
                        </MenuItem>
                      </div>
                    ))}
                  </MenuList>
                </Menu>
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
                            filterData(dept, item.name, batch)
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
                    className={`${degree != 'Degree' && 'uppercase'}`}
                  >
                    {batch != 'Batch' ? batch + ' Batch ' : batch}
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
                            filterData(dept, degree, item)
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
              {filterAlumnies.map((alumni, index) => (
                <div
                  key={index}
                  className='flex bg-slate-200 rounded-lg dark:bg-slate-900 m-2 p-4'
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
                        {alumni.otherInfo.worksAt && (
                          <div className='flex py-1 items-center'>
                            <MdWork size={15} />
                            <p className='text-xs pt-1 pl-1'>
                              Works at {alumni.otherInfo.worksAt}
                            </p>
                          </div>
                        )}
                        {alumni.otherInfo.address && (
                          <div className='flex items-center'>
                            <MdShareLocation size={17} />
                            <p className='text-sm font-bold pt-1 pl-1'>
                              {alumni.otherInfo.address}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className='flex flex-col justify-around'>
                      {alumni.otherInfo.linkedInLink !== '' && (
                        <Link
                          target='_blank'
                          to={`${alumni.otherInfo.linkedInLink}`}
                          className='hover:text-primary transition-all delay-[0.05s]'
                        >
                          <FaLinkedin size={30} />
                        </Link>
                      )}
                      {alumni.otherInfo.gitHubLink !== '' && (
                        <Link
                          target='_blank'
                          to={`${alumni.otherInfo.gitHubLink}`}
                          className='hover:text-primary transition-all delay-[0.05s]'
                        >
                          <FaSquareGithub size={30} />
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              ))}
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
      </div>
    </>
  )
}

export default AlumniList
