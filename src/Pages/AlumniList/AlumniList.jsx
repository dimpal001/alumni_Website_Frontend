import { Button, Table, TableContainer, Tbody, Td, Tr } from '@chakra-ui/react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { api } from '../../Components/API'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import Loading from '../../Components/Loading'
import { CButton } from '../../Components/CustomDesigns'
import DeleteAlumniModal from './DeleteAlumniModal'

const AlumniList = () => {
  const navigate = useNavigate()
  const [alumnis, setAlumnies] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedId, setSelectedId] = useState('')
  const [selectedName, setSelectedName] = useState('')
  const [isDeleteAlumniModalOpen, setIsDeleteAlumniModalOpen] = useState(false)

  const handleDeleteModal = () => {
    setIsDeleteAlumniModalOpen(true)
  }

  const fetchDetails = async () => {
    const token = sessionStorage.getItem('token')
    await axios
      .get(`${api}/api/profile/details/all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setAlumnies(response.data)
      })
      .catch((error) => {
        console.log(error)
        toast.error('Unable to fetch details')
        navigate('/dashboard')
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  useEffect(() => {
    fetchDetails()
    console.log(alumnis)
  }, [])

  useEffect(() => {
    scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }, [])

  return (
    <>
      {isLoading ? (
        <Loading title={'Loading details...'} />
      ) : (
        <div
          data-aos='zoom-in'
          className='w-full container max-sm:px-5 p-5 min-h-[700px] lg:min-h-[580px]'
        >
          <p className='text-2xl lg:text-3xl font-bold text-center'>
            Alumni List
          </p>
          {alumnis && alumnis.length > 0 && (
            <div className='container py-10'>
              <TableContainer className='border'>
                <Table variant={'simple'}>
                  <Tbody>
                    <Tr className='bg-white dark:bg-slate-950 uppercase'>
                      <Td>Sl. No.</Td>
                      <Td>Alumni Name</Td>
                      <Td>Email</Td>
                      <Td>Mobile No.</Td>
                      <Td>Gender</Td>
                      <Td>Address</Td>
                      <Td>View</Td>
                      <Td>Action</Td>
                    </Tr>
                    {alumnis &&
                      alumnis.map((alumni, index) => (
                        <Tr key={index}>
                          <Td>{index + 1}</Td>
                          <Td>{alumni.name && alumni.name}</Td>
                          <Td>{alumni.email && alumni.email}</Td>
                          <Td>{alumni.mobileNo && alumni.mobileNo}</Td>
                          <Td>{alumni.gender && alumni.gender}</Td>
                          <Td>{alumni.address && alumni.address}</Td>
                          <Td>
                            <CButton
                              title={'View'}
                              onClick={() => {
                                navigate(`/profile/${alumni.user}`)
                              }}
                            />
                          </Td>
                          <Td>
                            <Button
                              colorScheme='red'
                              fontWeight={'bold'}
                              onClick={() => {
                                setSelectedId(alumni.user)
                                setSelectedName(alumni.name)
                                handleDeleteModal()
                              }}
                            >
                              Delete Alumni
                            </Button>
                          </Td>
                        </Tr>
                      ))}
                  </Tbody>
                </Table>
              </TableContainer>
            </div>
          )}
          {alumnis.length === 0 && (
            <div>
              <p className='text-center py-3 text-lg'>
                No more approved alumni
              </p>
            </div>
          )}
          {isDeleteAlumniModalOpen && (
            <DeleteAlumniModal
              isOpen={true}
              alumniId={selectedId}
              fetchDetails={fetchDetails}
              alumniName={selectedName}
              onClose={() => setIsDeleteAlumniModalOpen(false)}
            />
          )}
        </div>
      )}
    </>
  )
}

export default AlumniList
