import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import Loading from './Components/Loading'
import Empty from '../assets/null.png'
import { useToast } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../UserContext'

const SingleUserRequestPage = () => {
  const toast = useToast()
  const navigate = useNavigate()
  const { setUser } = useContext(UserContext)
  const [requests, setRequest] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const fetchData = () => {
    setIsLoading(true)
    const jwtToken = sessionStorage.getItem('jwtToken')

    axios
      .get('http://192.168.1.15:3000/api/alumni-request/my-alumni-requests', {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      })
      .then((response) => {
        console.log('Request sent successfully:', response.data)
        setRequest(response.data)
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
        console.error('Error sending request:', error)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <>
      {isLoading ? (
        <Loading title={'Fetching data...'} />
      ) : (
        <div className='bg-slate-50 rounded-lg py-5 dark:bg-slate-800'>
          <p className='text-center font-bold text-3xl'>Previous Requests</p>
          {requests.map((request) => (
            <div key={request._id}>
              <RequestCard
                name={request.name}
                date={new Date(request.requestDate).toLocaleDateString()}
                course={request.courses}
                id={request._id}
                status={request.status}
                gender={request.gender}
                type={request.type}
              />
            </div>
          ))}
          {requests.length === 0 && (
            <div className='h-[400px] justify-center flex items-center'>
              <img src={Empty} className='w-[200px]' alt='' />
            </div>
          )}
        </div>
      )}
    </>
  )
}

const RequestCard = ({ name, date, course, status }) => {
  return (
    <>
      <div className='lg:px-20'>
        <div className='flex bg-slate-200 rounded-lg dark:bg-slate-900 m-2 p-4'>
          <div className='w-[100%]'>
            <div className='flex justify-between items-start'>
              <p className='font-bold text-xl'>{name}</p>
              <p className='text-xs'>Requested on : {date}</p>
            </div>
            <p className='py-1'>{`${course.degree} | ${course.admissionYear} - ${course.completionYear} | ${course.department}`}</p>
            <div>
              {status === 'pending' ? (
                <div>
                  <button className='px-3 opacity-[0.8] cursor-default font-bold text-sm py-1 bg-blue-600 text-white rounded-lg'>
                    Pending
                  </button>
                </div>
              ) : status === 'approved' ? (
                <div>
                  <button className='px-3 cursor-default opacity-[0.8] font-bold text-sm py-1 bg-green-600 text-white rounded-lg'>
                    Approved
                  </button>
                </div>
              ) : (
                <div>
                  <button className='px-3 opacity-[0.8] cursor-default font-bold text-sm py-1 bg-red-600 text-white rounded-lg'>
                    Rejected
                  </button>
                </div>
              )}
              {}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SingleUserRequestPage
