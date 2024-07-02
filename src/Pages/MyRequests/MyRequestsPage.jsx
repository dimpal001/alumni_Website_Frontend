import { Table, Tbody, Tr, Td, TableContainer, Button } from '@chakra-ui/react'
import { CButton, brandColor } from '../../Components/CustomDesigns'
import { Link } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../UserContext'
import axios from 'axios'
import { api } from '../../Components/API'
import Loading from '../../Components/Loading'
import ApproveRejectModal from './ApproveRejectModal'
const MyRequestsPage = () => {
  const { user } = useContext(UserContext)
  const [requests, setRequests] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [selectedRequest, setSelectedRequest] = useState('')
  const [status, setStatus] = useState('')

  const handleModalOpen = () => {
    setIsOpenModal(true)
  }

  const fetchDetails = () => {
    setIsLoading(true)
    const token = sessionStorage.getItem('token')
    axios
      .get(
        user.type === 'admin'
          ? `${api}/api/alumni-request/`
          : `${api}/api/alumni-request/${user._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setRequests(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  const handleFetch = () => {
    fetchDetails()
  }

  useEffect(() => {
    fetchDetails()
  }, [])

  useEffect(() => {
    scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }, [])

  return (
    <>
      <div className='w-full container max-sm:px-5 p-5 min-h-[700px] lg:min-h-[580px]'>
        <p
          data-aos='zoom-in'
          className='text-2xl lg:text-3xl font-bold text-center'
        >
          {user.type === 'admin' ? 'User Requests' : 'My Requests'}
        </p>
        {user.type !== 'admin' && (
          <div data-aos='fade-up' className='mt-4 flex justify-center'>
            <Link to={'/send-request'}>
              <CButton
                width={{ base: 'full', md: '350px' }}
                title={'Click here to send request to add Alumnus'}
              />
            </Link>
          </div>
        )}
        {isLoading ? (
          <Loading title={'Fetching details...'} />
        ) : (
          <div data-aos='fade-up'>
            {requests && requests.length > 0 && (
              <TableContainer className='border  mt-4'>
                <Table variant='simple'>
                  <Tbody>
                    <Tr className='bg-white text-black dark:bg-slate-950 dark:text-white uppercase text-lg font-bold'>
                      <Td>sl no</Td>
                      <Td>Request data</Td>
                      <Td>alumni name</Td>
                      <Td>branch</Td>
                      <Td>batch</Td>
                      <Td>roll no.</Td>
                      <Td>status</Td>
                      <Td>view</Td>
                      {user.type === 'admin' && <Td>action</Td>}
                    </Tr>
                    {requests &&
                      requests.map((request, index) => (
                        <Tr className='uppercase' key={index}>
                          <Td>{index + 1}</Td>
                          <Td>
                            {new Date(request.submissionDate).toDateString()}
                          </Td>
                          <Td>{request.name}</Td>
                          <Td>{request.academicDetails.department}</Td>
                          <Td>{request.academicDetails.admissionYear}</Td>
                          <Td className='uppercase'>
                            {request.academicDetails.rollNo}
                          </Td>
                          <Td
                            className={
                              request.status === 'approved'
                                ? 'text-primary'
                                : request.status === 'rejected'
                                ? 'text-red-600'
                                : 'text-yellow-700'
                            }
                          >
                            {request.status}
                          </Td>
                          <Td>
                            <Link to={`/detailed-request/${request._id}`}>
                              <CButton size={'sm'} title={'View'} />
                            </Link>
                          </Td>
                          {user.type === 'admin' && (
                            <Td className='flex flex-col gap-y-1'>
                              <Button
                                size={'sm'}
                                fontWeight={'bold'}
                                color={'white'}
                                background={brandColor.primary}
                                _hover={{
                                  background: brandColor.successHover,
                                }}
                                onClick={() => {
                                  handleModalOpen()
                                  setSelectedRequest(request._id)
                                  setStatus('approved')
                                }}
                              >
                                Approve
                              </Button>
                              <Button
                                size={'sm'}
                                fontWeight={'bold'}
                                color={'white'}
                                background={brandColor.error}
                                _hover={{
                                  background: brandColor.errorHover,
                                }}
                                onClick={() => {
                                  handleModalOpen()
                                  setSelectedRequest(request._id)
                                  setStatus('rejected')
                                }}
                              >
                                Reject
                              </Button>
                            </Td>
                          )}
                        </Tr>
                      ))}
                  </Tbody>
                </Table>
              </TableContainer>
            )}
            {requests.length === 0 && (
              <div>
                {user.type === 'admin' ? (
                  <p className='text-center py-3 text-lg'>
                    No more pending requests
                  </p>
                ) : (
                  <p className='text-center py-3 text-lg'>No more requests</p>
                )}
              </div>
            )}
            {isOpenModal && (
              <ApproveRejectModal
                isOpen={true}
                afterSubmit={handleFetch}
                onClose={() => setIsOpenModal(false)}
                id={selectedRequest}
                status={status}
              />
            )}
          </div>
        )}
      </div>
    </>
  )
}

export default MyRequestsPage
