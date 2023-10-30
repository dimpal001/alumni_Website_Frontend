import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import Loading from './Components/Loading'
import RequestCard from './Components/RequestCard'
import { UserContext } from '../UserContext'
import { useToast } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { BsFillSendCheckFill } from 'react-icons/bs'

const AllAlumniRequestsPage = () => {
  const { setUser } = useContext(UserContext)

  const toast = useToast()
  const navigate = useNavigate()
  const [requests, setRequest] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const fetchData = () => {
    const jwtToken = sessionStorage.getItem('jwtToken')

    axios
      .get('http://localhost:3000/api/alumni-request/all-alumni-requests', {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      })
      .then((response) => {
        console.log('Request sent successfully:', response.data)
        setRequest(response.data)
      })
      .catch((error) => {
        console.error('Error sending request:', error)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  useEffect(() => {
    fetchData()
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
    document.title = 'Alumni Requests'
  }, [])

  const handleApproveReject = ({ title, id }) => {
    const jwtToken = sessionStorage.getItem('jwtToken')
    console.log(id)

    axios
      .put(
        `http://localhost:3000/api/alumni-request/alumni-requests/${id}`,
        {
          status: title,
        },
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      )
      .then((response) => {
        console.log(response)
        fetchData()
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

  return (
    <>
      <div className='bg-slate-50 min-h-[700px] lg:min-h-[500px] dark:bg-slate-800 lg:rounded-lg max-md:px-3 max-md:pb-2 lg:p-5'>
        <p className='text-center pb-3 font-bold text-3xl'>Alumni Requests</p>
        {isLoading ? (
          <Loading title={'Loading Alumni Requests...'} />
        ) : (
          <div>
            {requests.map((request) => (
              <div key={request._id}>
                <RequestCard
                  name={request.name}
                  date={new Date(request.requestDate).toLocaleDateString()}
                  course={request.courses}
                  click={handleApproveReject}
                  id={request._id}
                  status={request.status}
                  gender={request.gender}
                  type={request.type}
                />
              </div>
            ))}
            {requests.length === 0 && (
              <div className=' mt-14'>
                <div className='flex justify-center'>
                  <BsFillSendCheckFill
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
        )}
      </div>
    </>
  )
}

export default AllAlumniRequestsPage
