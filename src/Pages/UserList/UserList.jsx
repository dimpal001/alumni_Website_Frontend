import { Button, Table, TableContainer, Tbody, Td, Tr } from '@chakra-ui/react'
import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import { api } from '../../Components/API'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'
import Loading from '../../Components/Loading'
import DeleteAlumniModal from '../AlumniList/DeleteAlumniModal'
import { UserContext } from '../../UserContext'
import { CButton } from '../../Components/CustomDesigns'

const UserList = () => {
  const navigate = useNavigate()
  const { user } = useContext(UserContext)
  const [users, setUsers] = useState([])
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
      .get(`${api}/api/auth/details/all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setUsers(response.data)
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
    console.log(users)
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
            Users List
          </p>
          <div className='flex justify-center mt-5'>
            <Link to={'/new-admin'}>
              <CButton title={'Create New Admin'} />
            </Link>
          </div>
          <div className='container py-5'>
            <TableContainer data-aos='zoom-in' className='border'>
              <Table variant={'simple'}>
                <Tbody>
                  <Tr className='bg-white dark:bg-slate-950 uppercase'>
                    <Td>Sl. No.</Td>
                    <Td>Name</Td>
                    <Td>User Type</Td>
                    <Td>Email</Td>
                    <Td>Mobile No.</Td>
                    <Td textAlign='center'>Action</Td>
                  </Tr>
                  {users &&
                    users.map((users, index) => (
                      <Tr key={index}>
                        <Td>{index + 1}</Td>
                        <Td>{users.name && users.name}</Td>
                        <Td className='text-primary capitalize font-bold'>
                          {users.type && users.type} user
                        </Td>
                        <Td>{users.email && users.email}</Td>
                        <Td>{users.mobileNumber && users.mobileNumber}</Td>
                        <Td textAlign={'center'}>
                          <Button
                            colorScheme='red'
                            fontWeight={'bold'}
                            isDisabled={user._id === users._id && true}
                            onClick={() => {
                              setSelectedId(users._id)
                              setSelectedName(users.name)
                              handleDeleteModal()
                            }}
                          >
                            Delete User
                          </Button>
                        </Td>
                      </Tr>
                    ))}
                </Tbody>
              </Table>
            </TableContainer>
          </div>
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

export default UserList
