import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import Loading from './Components/Loading'
import Empty from '../assets/null.png'
import RequestCard from './Components/RequestCard'
import { UserContext } from '../UserContext'
import { useToast } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

const AllAlumniRequestsPage = () => {
  const { setUser } = useContext(UserContext)

  const toast = useToast()
  const navigate = useNavigate()
  const [requests, setRequest] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const fetchData = () => {
    setIsLoading(true)
    const jwtToken = sessionStorage.getItem('jwtToken')

    axios
      .get('http://192.168.1.15:3000/api/alumni-request/all-alumni-requests', {
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
  }, [])

  const handleApproveReject = ({ title, id }) => {
    const jwtToken = sessionStorage.getItem('jwtToken')
    console.log(id)

    axios
      .put(
        `http://192.168.1.15:3000/api/alumni-request/alumni-requests/${id}`,
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
      {isLoading ? (
        <Loading title={'Fetching data...'} />
      ) : (
        <div className='bg-slate-50 min-h-[700px] lg:min-h-[500px] dark:bg-slate-800 lg:rounded-lg max-md:px-3 max-md:pb-2 lg:p-5'>
          <p className='text-center py-3 font-bold text-3xl'>Alumni Requests</p>
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
            <div className='h-[400px] justify-center flex items-center'>
              <img src={Empty} className='w-[200px]' alt='' />
            </div>
          )}
        </div>
      )}
    </>
  )
}

export default AllAlumniRequestsPage
