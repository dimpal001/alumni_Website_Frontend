import {
  List,
  ListIcon,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useToast,
} from '@chakra-ui/react'
import { MdCheckCircle } from 'react-icons/md'
import { RxCross2 } from 'react-icons/rx'
import { CButton1 } from '../Components/CustomDesign'
import { AddIcon } from '@chakra-ui/icons'
import { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import DeleteDegreeAlert from './DeleteDegreeAlert'
import { api } from '../Components/API'
import { UserContext } from '../../UserContext'

const UpdateDegreeModal = ({ isOpen, onClose }) => {
  const toast = useToast()
  const [degrees, setDegrees] = useState([])

  const { user } = useContext(UserContext)

  const [isDegreeAlertOpen, setIsDegreeAlertOpen] = useState(false)
  const [selectedDegree, setSelectedDegree] = useState('')
  const [degreeName, setDegreeName] = useState('')

  const fetchContent = async () => {
    const jwtToken = sessionStorage.getItem('jwtToken')

    await axios
      .get(`${api}/api/departments/degrees/${user.department}`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      })
      .then((response) => {
        console.log(response.data)
        setDegrees(response.data.degrees)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  useEffect(() => {
    fetchContent()
  }, [])

  const handleAddDegree = async (e) => {
    e.preventDefault()
    const newDegree = e.target.elements.degree.value.trim()

    if (!newDegree) {
      toast({
        title: 'Invalid Degree Name!',
        status: 'error',
        isClosable: true,
        duration: 2200,
        position: 'top',
      })
      return
    }

    const capitalizedDegree = newDegree
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')

    if (degrees.some((degree) => degree.name === capitalizedDegree)) {
      toast({
        title: 'Already Exist!',
        status: 'error',
        isClosable: true,
        duration: 2200,
        position: 'top',
      })
      return
    }

    try {
      const jwtToken = sessionStorage.getItem('jwtToken')

      await axios.post(
        `${api}/api/departments/update-degrees`,
        {
          userDepartment: user.department,
          degrees: [...degrees, { name: capitalizedDegree }],
        },
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      )

      setDegrees((prevDegrees) => [...prevDegrees, { name: capitalizedDegree }])

      toast({
        title: 'One degree added.',
        status: 'success',
        isClosable: true,
        duration: 3000,
        position: 'top',
      })

      e.target.elements.degree.value = ''
    } catch (error) {
      console.error('Error updating degrees:', error)

      toast({
        title: 'Error updating degrees',
        status: 'error',
        isClosable: true,
        duration: 3000,
        position: 'top',
      })
    }
  }

  const handleOpenDegreeAlert = ({ degree_Id, name }) => {
    setIsDegreeAlertOpen(true)
    setSelectedDegree(degree_Id)
    setDegreeName(name)
  }

  const deleteDegree = async () => {
    console.log(selectedDegree)
    console.log(degreeName)
    try {
      const jwtToken = sessionStorage.getItem('jwtToken')
      const response = await axios.delete(
        `${api}/api/departments/delete-degree/${user.department}/${selectedDegree}`,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      )
      fetchContent()
      toast({
        title: 'Degree has been removed !',
        status: 'success',
        isClosable: true,
        duration: 2200,
        position: 'top',
      })

      console.log(response.data)
    } catch (error) {
      console.error('Error deleting degree:', error)
      toast({
        title: 'Unable to remove !',
        status: 'error',
        isClosable: true,
        duration: 2200,
        position: 'top',
      })
    }
  }

  return (
    <>
      <Modal
        size={{ base: 'full', md: 'md' }}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent className='dark:bg-slate-800 dark:text-white'>
          <ModalHeader>All Degrees</ModalHeader>
          <ModalCloseButton />
          <ModalBody className='mb-5'>
            <List className='font-bold mt-3'>
              {degrees &&
                degrees.map((degree, index) => (
                  <ListItem
                    className='dark:hover:bg-slate-950 text-slate-950 dark:text-white hover:bg-slate-300 rounded-lg my-1'
                    key={index}
                    onClick={() =>
                      handleOpenDegreeAlert({
                        degree_Id: degree._id,
                        name: degree.name,
                      })
                    }
                  >
                    <div className='flex items-center w-full'>
                      <ListIcon as={MdCheckCircle} color='green.500' />
                      <div className='flex w-full justify-between items-center'>
                        {degree.name}
                        <RxCross2 />
                      </div>
                    </div>
                  </ListItem>
                ))}
            </List>
            <form onSubmit={handleAddDegree}>
              <div className='flex mt-5 justify-center items-center gap-3'>
                <div className='w-[80%]'>
                  <input
                    autoComplete='off'
                    name='degree'
                    placeholder='Enter a degree name'
                    className='w-full p-2 pl-5 rounded-lg bg-transparent border focus:outline-none'
                    type='text'
                  />
                </div>
                <div className='w-[20%]'>
                  <CButton1
                    type='submit'
                    leftIcon={<AddIcon boxSize={3} />}
                    title={'Add'}
                  />
                </div>
              </div>
            </form>
          </ModalBody>
        </ModalContent>
        {isDegreeAlertOpen && (
          <DeleteDegreeAlert
            isOpen={true}
            name={degreeName}
            onClose={() => setIsDegreeAlertOpen(false)}
            onDeleteDegree={deleteDegree}
          />
        )}
      </Modal>
    </>
  )
}

export default UpdateDegreeModal
