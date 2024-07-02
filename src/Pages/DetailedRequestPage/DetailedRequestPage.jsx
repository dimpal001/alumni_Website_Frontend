import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { api } from '../../Components/API'
import toast from 'react-hot-toast'
import Loading from '../../Components/Loading'
import { Button, Table, TableContainer, Tbody, Td, Tr } from '@chakra-ui/react'
import ApproveRejectModal from '../MyRequests/ApproveRejectModal'
import { brandColor } from '../../Components/CustomDesigns'
import { UserContext } from '../../UserContext'
const DetailedRequestPage = () => {
  const { user } = useContext(UserContext)
  const { id } = useParams()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [details, setDetails] = useState({})

  const [isOpenModal, setIsOpenModal] = useState(false)
  const [selectedRequest, setSelectedRequest] = useState('')
  const [status, setStatus] = useState('')

  const handleModalOpen = () => {
    setIsOpenModal(true)
  }

  useEffect(() => {
    scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }, [])

  const fetchDetails = () => {
    const token = sessionStorage.getItem('token')
    setIsLoading(true)
    axios
      .get(`${api}/api/alumni-request/detailed/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setDetails(response.data[0])
      })
      .catch((error) => {
        console.log(error)
        toast.error('Something is wrong. Try again')
        navigate('/my-requests')
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  useEffect(() => {
    fetchDetails()
    console.log(details)
  }, [])

  return (
    <>
      <div className='w-full container max-sm:px-3 py-5 px-5 min-h-[700px] lg:min-h-[580px]'>
        <div className='p-5 rounded-lg'>
          <p className='text-2xl lg:text-3xl font-bold text-center'>Request</p>
        </div>
        {isLoading ? (
          <Loading title={'Loading details...'} />
        ) : (
          <div className='w-full flex flex-col gap-y-10'>
            <div className='w-full'>
              <p className='text-xl pb-2 lg:text-center font-bold'>
                Requested on :{' '}
                <span className='text-primary'>
                  {new Date(details.submissionDate).toDateString()}
                </span>
              </p>
              <p className='text-xl font-bold'>Personal Details</p>
              <div className='border w-full'>
                <TableContainer className='w-full'>
                  <Table variant='simple'>
                    <Tbody>
                      <Tr className='bg-white dark:bg-slate-950 dark:text-white uppercase text-black font-extrabold '>
                        <Td>Alumni Name</Td>
                        <Td>Gender</Td>
                        <Td>Mobile Number</Td>
                        <Td>Email Address</Td>
                        <Td>Address</Td>
                      </Tr>
                      <Tr className='uppercase'>
                        <Td>{details.name}</Td>
                        <Td>{details.gender}</Td>
                        <Td>{details.mobileNo}</Td>
                        <Td>{details.email}</Td>
                        <Td>{details.address}</Td>
                      </Tr>
                    </Tbody>
                  </Table>
                </TableContainer>
              </div>
            </div>
            {details.academicDetails && (
              <div className='w-full'>
                <p className='text-xl font-bold'>Academic Details</p>
                <div className='border w-full'>
                  <TableContainer className='w-full'>
                    <Table variant='simple'>
                      <Tbody>
                        <Tr className='bg-white dark:bg-slate-950 dark:text-white uppercase text-black font-extrabold '>
                          <Td>Roll No</Td>
                          <Td>Degree</Td>
                          <Td>Department</Td>
                          <Td>Registration No.</Td>
                          <Td>Admission year</Td>
                          <Td>Completion year</Td>
                          <Td>CGPA</Td>
                        </Tr>
                        <Tr className='uppercase'>
                          <Td>{details.academicDetails.rollNo}</Td>
                          <Td>{details.academicDetails.degree}</Td>
                          <Td>{details.academicDetails.department}</Td>
                          <Td>{details.academicDetails.registrationNo}</Td>
                          <Td>{details.academicDetails.admissionYear}</Td>
                          <Td>{details.academicDetails.completionYear}</Td>
                          <Td>{details.academicDetails.cgpa}</Td>
                        </Tr>
                      </Tbody>
                    </Table>
                  </TableContainer>
                </div>
              </div>
            )}
            {details.professions && (
              <div className='w-full'>
                <p className='text-xl pl-1 font-bold'>Professional Details</p>
                <div className='border w-full'>
                  <TableContainer className='w-full'>
                    <Table variant='simple'>
                      <Tbody>
                        <Tr className='bg-white dark:bg-slate-950 dark:text-white uppercase text-black font-extrabold'>
                          {details.professions.profession && (
                            <Td>Current Profession</Td>
                          )}
                          {details.professions.organisation && (
                            <Td>Organisation</Td>
                          )}
                          {details.professions.workingFrom && (
                            <Td>Working From</Td>
                          )}
                          {details.professions.workingTo && <Td>working to</Td>}
                        </Tr>
                        <Tr className='uppercase'>
                          {details.professions.profession && (
                            <Td>{details.professions.profession}</Td>
                          )}
                          {details.professions.organisation && (
                            <Td>{details.professions.organisation}</Td>
                          )}
                          {details.professions.workingFrom && (
                            <Td>{details.professions.workingFrom}</Td>
                          )}
                          {details.professions.workingTo && (
                            <Td>{details.professions.workingTo}</Td>
                          )}
                        </Tr>
                      </Tbody>
                    </Table>
                  </TableContainer>
                  {isOpenModal && (
                    <ApproveRejectModal
                      isOpen={true}
                      onClose={() => setIsOpenModal(false)}
                      id={selectedRequest}
                      status={status}
                    />
                  )}
                </div>
              </div>
            )}
            {user.type === 'admin' && (
              <div className='flex justify-center pb-10 w-full gap-x-7'>
                <Button
                  fontWeight={'bold'}
                  color={'white'}
                  background={brandColor.error}
                  _hover={{
                    background: brandColor.errorHover,
                  }}
                  onClick={() => {
                    handleModalOpen()
                    setSelectedRequest(details._id)
                    setStatus('rejected')
                  }}
                >
                  Reject
                </Button>
                <Button
                  fontWeight={'bold'}
                  color={'white'}
                  background={brandColor.primary}
                  _hover={{
                    background: brandColor.successHover,
                  }}
                  onClick={() => {
                    handleModalOpen()
                    setSelectedRequest(details._id)
                    setStatus('approved')
                  }}
                >
                  Approve
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  )
}

export default DetailedRequestPage
