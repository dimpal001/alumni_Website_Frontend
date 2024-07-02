import {
  Button,
  Input,
  Table,
  TableContainer,
  Tbody,
  Td,
  Tr,
} from '@chakra-ui/react'
import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import { api } from '../../Components/API'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import Loading from '../../Components/Loading'
import { UserContext } from '../../UserContext'
import { CButton } from '../../Components/CustomDesigns'
import DeleteDegreeModal from './DeleteDegreeModal'

const DegreeList = () => {
  const navigate = useNavigate()
  const { user } = useContext(UserContext)
  const [degrees, setDegrees] = useState()
  const [isLoading, setIsLoading] = useState(true)
  const [selectedId, setSelectedId] = useState('')
  const [selectedName, setSelectedName] = useState('')
  const [isDeleteAlumniModalOpen, setIsDeleteAlumniModalOpen] = useState(false)

  const [newDegree, setNewDegree] = useState('')

  const handleDeleteModal = () => {
    setIsDeleteAlumniModalOpen(true)
  }

  const fetchDetails = async () => {
    const token = sessionStorage.getItem('token')
    await axios
      .get(`${api}/api/deg-dept/degrees`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setDegrees(response.data.degrees)
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

  const handleAddDegree = () => {
    if (newDegree === '') {
      toast.error('Enter a valid degree name')
      return
    }

    const token = sessionStorage.getItem('token')

    axios
      .post(
        `${api}/api/deg-dept/add-degree`,
        {
          degreeName: newDegree,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        toast.success(response.data.message)
        setNewDegree('')
        fetchDetails()
      })
      .catch((error) => {
        toast.error(error.response.data.message)
      })
  }

  useEffect(() => {
    fetchDetails()
    console.log(degrees)
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
        <div className='w-full container max-sm:px-5 p-5 min-h-[700px] lg:min-h-[580px]'>
          <p className='text-2xl lg:text-3xl font-bold text-center'>
            Degree List
          </p>
          <div data-aos='zoom-in-up' className='container py-10'>
            <div className='py-5 lg:px-[350px]'>
              <div className='flex gap-x-5'>
                <Input
                  onChange={(e) => setNewDegree(e.target.value)}
                  placeholder='Enter a degree name'
                />
                <CButton onClick={handleAddDegree} title={'Add'} />
              </div>
            </div>
            <TableContainer className='border'>
              <Table variant={'simple'}>
                <Tbody>
                  <Tr className='bg-white dark:bg-slate-950 uppercase'>
                    <Td>Sl. No.</Td>
                    <Td>Degree Name</Td>
                    <Td textAlign='center'>Action</Td>
                  </Tr>
                  {degrees &&
                    degrees.map((degree, index) => (
                      <Tr key={index}>
                        <Td>{index + 1}</Td>
                        <Td className='capitalize'>
                          {degree.name && degree.name}
                        </Td>
                        <Td textAlign={'center'}>
                          <Button
                            colorScheme='red'
                            fontWeight={'bold'}
                            isDisabled={user._id === degree._id && true}
                            onClick={() => {
                              setSelectedId(degree._id)
                              setSelectedName(degree.name)
                              handleDeleteModal()
                            }}
                          >
                            Delete Degree
                          </Button>
                        </Td>
                      </Tr>
                    ))}
                </Tbody>
              </Table>
            </TableContainer>
          </div>
          {isDeleteAlumniModalOpen && (
            <DeleteDegreeModal
              isOpen={true}
              degreeId={selectedId}
              fetchDetails={fetchDetails}
              degreeName={selectedName}
              onClose={() => setIsDeleteAlumniModalOpen(false)}
            />
          )}
        </div>
      )}
    </>
  )
}

export default DegreeList
