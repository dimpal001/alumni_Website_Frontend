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
import DeleteDepartmentModal from './DeleteDepartmentModal'

const DepartmentList = () => {
  const navigate = useNavigate()
  const { user } = useContext(UserContext)
  const [departments, setDepartments] = useState()
  const [isLoading, setIsLoading] = useState(true)
  const [selectedId, setSelectedId] = useState('')
  const [selectedName, setSelectedName] = useState('')
  const [isDeleteDepartmentModal, setIsDeleteDepartmentModal] = useState(false)

  const [newDegree, setNewDegree] = useState('')

  const handleDeleteModal = () => {
    setIsDeleteDepartmentModal(true)
  }

  const fetchDetails = async () => {
    const token = sessionStorage.getItem('token')
    await axios
      .get(`${api}/api/deg-dept/departments`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setDepartments(response.data.departments)
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
        `${api}/api/deg-dept/add-department`,
        {
          departmentName: newDegree,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setNewDegree('')
        toast.success(response.data.message)
        fetchDetails()
      })
      .catch((error) => {
        toast.error(error.response.data.message)
      })
  }
  useEffect(() => {
    scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }, [])

  useEffect(() => {
    fetchDetails()
    console.log(departments)
  }, [])

  return (
    <>
      {isLoading ? (
        <Loading title={'Loading details...'} />
      ) : (
        <div className='w-full container max-sm:px-5 p-5 min-h-[700px] lg:min-h-[580px]'>
          <p className='text-2xl lg:text-3xl font-bold text-center'>
            Department List
          </p>
          <div data-aos='zoom-in-up' className='container py-10'>
            <div className='py-5 lg:px-[300px]'>
              <div className='flex gap-x-5'>
                <Input
                  value={newDegree}
                  onChange={(e) => setNewDegree(e.target.value)}
                  placeholder='Enter a department name'
                />
                <CButton onClick={handleAddDegree} title={'Add'} />
              </div>
            </div>
            <TableContainer className='border'>
              <Table variant={'simple'}>
                <Tbody>
                  <Tr className='bg-white dark:bg-slate-950 uppercase'>
                    <Td>Sl. No.</Td>
                    <Td>Department Name</Td>
                    <Td textAlign='center'>Action</Td>
                  </Tr>
                  {departments &&
                    departments.map((department, index) => (
                      <Tr key={index}>
                        <Td>{index + 1}</Td>
                        <Td className='capitalize'>
                          {department.name && department.name}
                        </Td>
                        <Td textAlign={'center'}>
                          <Button
                            colorScheme='red'
                            fontWeight={'bold'}
                            isDisabled={user._id === department._id && true}
                            onClick={() => {
                              setSelectedId(department._id)
                              setSelectedName(department.name)
                              handleDeleteModal()
                            }}
                          >
                            Delete Department
                          </Button>
                        </Td>
                      </Tr>
                    ))}
                </Tbody>
              </Table>
            </TableContainer>
          </div>
          {isDeleteDepartmentModal && (
            <DeleteDepartmentModal
              isOpen={true}
              departmentId={selectedId}
              fetchDetails={fetchDetails}
              departmentName={selectedName}
              onClose={() => setIsDeleteDepartmentModal(false)}
            />
          )}
        </div>
      )}
    </>
  )
}

export default DepartmentList
