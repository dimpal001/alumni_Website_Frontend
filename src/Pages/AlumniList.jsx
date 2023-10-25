import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import Male from '../assets/male.svg'
import Female from '../assets/female.svg'
import { MdWork } from 'react-icons/md'
import { MdShareLocation } from 'react-icons/md'
import { FaSquareGithub, FaLinkedin } from 'react-icons/fa6'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../UserContext'
import { useToast } from '@chakra-ui/react'

const AlumniList = () => {
  const { setUser } = useContext(UserContext)
  const toast = useToast()
  const navigate = useNavigate()
  const [alumnies, setAlumnies] = useState([])
  useEffect(() => {
    const jwtToken = sessionStorage.getItem('jwtToken')
    axios
      .get('http://192.168.1.15:3000/api/alumni-request', {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      })
      .then((response) => {
        setAlumnies(response.data)
        console.log(alumnies)
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          setUser(null)
          sessionStorage.removeItem('jwtToken')
          sessionStorage.removeItem('user')
          navigate('/')
          toast({
            title: 'Session expired !',
            description: 'You need to login again.',
            status: 'error',
            isClosable: true,
            duration: 1800,
            position: 'top',
          })
          return
        }
        console.log(error)
      })
  }, [])
  return (
    <>
      <div className='min-h-[700px] lg:min-h-[500px] bg-slate-50 lg:rounded-lg p-2 lg:p-5 dark:bg-slate-800 lg:px-20'>
        <div className='rounded-lg'>
          <p className='text-center font-bold py-3 text-3xl'>Alumnies</p>
          {alumnies.map((alumni, index) => (
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
              <div className='w-[80%] flex justify-between'>
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
                  {alumni.otherInfo.linkedInLink != '' && (
                    <Link
                      target='_blank'
                      to={`${alumni.otherInfo.linkedInLink}`}
                      className='hover:text-primary transition-all delay-[0.05s]'
                    >
                      <FaLinkedin size={30} />
                    </Link>
                  )}
                  {alumni.otherInfo.gitHubLink != '' && (
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
        </div>
      </div>
    </>
  )
}

export default AlumniList
