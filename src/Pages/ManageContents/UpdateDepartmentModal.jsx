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
import { useEffect, useState } from 'react'
import axios from 'axios'
import DeleteDepartmentAlert from './DeleteDepartmentAlert'

const UpdateDepartmentModal = ({ isOpen, onClose }) => {
  const toast = useToast()
  const [departments, setDepartments] = useState([])

  const [isDepartmentAlertOpen, setIsDepartmentAlertOpen] = useState(false)
  const [selectedDepartment, setSelectedDepartment] = useState('')
  const [departmentName, setDepartmentName] = useState('')

  const fetchContent = async () => {
    const jwtToken = sessionStorage.getItem('jwtToken')

    await axios
      .get('http://localhost:3000/api/content', {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      })
      .then((response) => {
        setDepartments(response.data.departments)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  useEffect(() => {
    fetchContent()
  }, [])

  const handleAddDepartment = async (e) => {
    e.preventDefault()
    const newDepartment = e.target.elements.department.value.trim()
    if (newDepartment === '') {
      toast({
        title: 'Invalid Department Name !',
        status: 'error',
        isClosable: true,
        duration: 2200,
        position: 'top',
      })
      return
    }

    function capitalizeSentence(newDepartment) {
      return newDepartment
        .split(' ')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
    }

    const departmentName = capitalizeSentence(newDepartment)
    if (departmentName) {
      if (
        departments &&
        departments.some((department) => department.name === departmentName)
      ) {
        e.target.elements.department.value = ''
        toast({
          title: 'Already Exist !',
          status: 'error',
          isClosable: true,
          duration: 2200,
          position: 'top',
        })
        return
      }

      e.target.elements.department.value = ''
      const jwtToken = sessionStorage.getItem('jwtToken')
      try {
        await axios.post(
          'http://localhost:3000/api/content/update-departments',
          {
            departments: [...departments, { name: departmentName }],
          },
          {
            headers: {
              Authorization: `Bearer ${jwtToken}`,
            },
          }
        )

        toast({
          title: 'One department added.',
          status: 'success',
          isClosable: true,
          duration: 3000,
          position: 'top',
        })
        fetchContent()
      } catch (error) {
        console.log(error)
        toast({
          title: 'Error updating departments',
          status: 'error',
          isClosable: true,
          duration: 3000,
          position: 'top',
        })
      }
    }
  }

  const handleOpenDepartmentAlert = ({ department_id, name }) => {
    setIsDepartmentAlertOpen(true)
    setSelectedDepartment(department_id)
    setDepartmentName(name)
  }

  const deleteDepartment = async () => {
    try {
      const jwtToken = sessionStorage.getItem('jwtToken')
      const response = await axios.delete(
        `http://localhost:3000/api/content/delete-department/${selectedDepartment}`,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      )
      fetchContent()
      toast({
        title: 'Department has been removed !',
        status: 'success',
        isClosable: true,
        duration: 2200,
        position: 'top',
      })

      console.log(response.data)
    } catch (error) {
      console.error('Error deleting department:', error)
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
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent className='dark:bg-slate-800 dark:text-white'>
          <ModalHeader>All Departments</ModalHeader>
          <ModalCloseButton />
          <ModalBody className='mb-5'>
            <List className='font-bold mt-3'>
              {departments &&
                departments.map((department, index) => (
                  <ListItem
                    className='hover:bg-slate-950 rounded-lg my-1'
                    key={index}
                    onClick={() =>
                      handleOpenDepartmentAlert({
                        department_id: department._id,
                        name: department.name,
                      })
                    }
                  >
                    <div className='flex w-full'>
                      <ListIcon
                        as={MdCheckCircle}
                        className='mt-1'
                        color='green.500'
                      />
                      <div className='flex w-full justify-between items-center'>
                        {department.name}
                        <RxCross2 />
                      </div>
                    </div>
                  </ListItem>
                ))}
            </List>
            <form onSubmit={handleAddDepartment}>
              <div className='flex mt-5 justify-center items-center gap-3'>
                <div className='w-[80%]'>
                  <input
                    autoComplete='off'
                    name='department'
                    autoFocus
                    placeholder='Enter a department name'
                    className='w-full pl-5 p-2 rounded-lg bg-transparent border focus:outline-none'
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
        {isDepartmentAlertOpen && (
          <DeleteDepartmentAlert
            isOpen={true}
            departmentId={selectedDepartment}
            name={departmentName}
            onClose={() => setIsDepartmentAlertOpen(false)}
            onDeleteDepartment={deleteDepartment}
          />
        )}
      </Modal>
    </>
  )
}

export default UpdateDepartmentModal
