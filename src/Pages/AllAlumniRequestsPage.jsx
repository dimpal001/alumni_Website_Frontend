import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import Loading from './Components/Loading'
import { UserContext } from '../UserContext'
import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useToast,
} from '@chakra-ui/react'
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
      .then(() => {
        fetchData()
        toast({
          title: `${
            title === 'approved'
              ? 'The request has been approved.'
              : 'The request has been rejected.'
          }`,
          status: 'success',
          isClosable: true,
          duration: 1800,
          position: 'top',
        })
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
          <div className='w-full text-base'>
            {requests.length > 0 && (
              <TableContainer className='text-sm'>
                <Table
                  className='text-xs border'
                  width={'100%'}
                  variant={'simple'}
                >
                  <Thead>
                    <Tr className='text-center' width={'100%'}>
                      <Th width={'10%'}>Name</Th>
                      <Th width={'20%'}>Degree</Th>
                      <Th width={'20%'}>Department</Th>
                      <Th width={'5%'} className='text-center'>
                        Batch
                      </Th>
                      <Th width={'20%'}>
                        Roll <br />
                        Number
                      </Th>
                      <Th width={'5%'}>CGPA</Th>
                      <Th width={'20%'}>Action</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {requests.map((request, index) => (
                      <Tr
                        className='hover:bg-slate-900 transition-all delay-[0.01s]'
                        key={index}
                      >
                        <Td>{request.name}</Td>
                        <Td>{request.courses.degree}</Td>
                        <Td>{request.courses.department}</Td>
                        <Td>{request.courses.admissionYear}</Td>
                        <Td>{request.courses.rollNumber}</Td>
                        <Td>{request.courses.cgpa}</Td>
                        <Td>
                          <div>
                            {request.status === 'pending' && (
                              <div className='flex flex-col gap-2'>
                                <button
                                  onClick={() =>
                                    handleApproveReject({
                                      title: 'approved',
                                      id: request._id,
                                    })
                                  }
                                  className='px-3 font-bold text-sm py-1 bg-success hover:bg-hoverSuccess text-white rounded-lg'
                                >
                                  Approve
                                </button>
                                <button
                                  onClick={() =>
                                    handleApproveReject({
                                      title: 'rejected',
                                      id: request._id,
                                    })
                                  }
                                  className='px-3 font-bold text-sm py-1 bg-error hover:bg-hoverError text-white rounded-lg'
                                >
                                  Reject
                                </button>
                              </div>
                            )}
                          </div>
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </TableContainer>
            )}
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
