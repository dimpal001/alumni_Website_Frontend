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
import DeleteDegreeAlert from './DeleteDegreeAlert'

const UpdateDegreeModal = ({ isOpen, onClose }) => {
  const toast = useToast()
  const [degrees, setDegrees] = useState([])

  const [isDegreeAlertOpen, setIsDegreeAlertOpen] = useState(false)
  const [selectedDegree, setSelectedDegree] = useState('')
  const [degreeName, setDegreeName] = useState('')

  const fetchContent = async () => {
    const jwtToken = sessionStorage.getItem('jwtToken')

    await axios
      .get('http://localhost:3000/api/content', {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      })
      .then((response) => {
        setDegrees(response.data.degrees)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  useEffect(() => {
    fetchContent()
  }, [])

  // const handleAddDegree = async (e) => {
  //   e.preventDefault()
  //   const newDegree = e.target.elements.degree.value.trim()
  //   if (newDegree === '') {
  //     toast({
  //       title: 'Invalid Degree Name !',
  //       status: 'error',
  //       isClosable: true,
  //       duration: 2200,
  //       position: 'top',
  //     })
  //     return
  //   }

  //   function capitalizeSentence(newDegree) {
  //     return newDegree
  //       .split(' ')
  //       .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
  //       .join(' ')
  //   }

  //   const degreeName = capitalizeSentence(newDegree)
  //   if (degreeName) {
  //     if (degrees && degrees.some((degree) => degree.name === degreeName)) {
  //       e.target.elements.degree.value = ''
  //       toast({
  //         title: 'Already Exist !',
  //         status: 'error',
  //         isClosable: true,
  //         duration: 2200,
  //         position: 'top',
  //       })
  //       return
  //     }

  //     e.target.elements.degree.value = ''
  //     setDegrees((prevDegrees) => {
  //       const updatedDegrees = [...prevDegrees, { name: degreeName }]
  //       axios
  //         .post(
  //           'http://localhost:3000/api/content/update-degrees',
  //           {
  //             degrees: updatedDegrees,
  //           },
  //           {
  //             headers: {
  //               Authorization: `Bearer ${jwtToken}`,
  //             },
  //           }
  //         )
  //         .then(() => {
  //           toast({
  //             title: 'One degree added.',
  //             status: 'success',
  //             isClosable: true,
  //             duration: 3000,
  //             position: 'top',
  //           })
  //           fetchContent()
  //         })
  //         .catch((error) => {
  //           console.log(error)
  //           toast({
  //             title: 'Error updating degrees',
  //             status: 'error',
  //             isClosable: true,
  //             duration: 3000,
  //             position: 'top',
  //           })
  //         })
  //       return updatedDegrees
  //     })
  //     const jwtToken = sessionStorage.getItem('jwtToken')
  //   }
  // }

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
        'http://localhost:3000/api/content/update-degrees',
        {
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
    try {
      const jwtToken = sessionStorage.getItem('jwtToken')
      const response = await axios.delete(
        `http://localhost:3000/api/content/delete-degree/${selectedDegree}`,
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
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent className='dark:bg-slate-800 dark:text-white'>
          <ModalHeader>All Degrees</ModalHeader>
          <ModalCloseButton />
          <ModalBody className='mb-5'>
            <List className='font-bold mt-3'>
              {degrees &&
                degrees.map((degree, index) => (
                  <ListItem
                    className='dark:hover:bg-slate-950 hover:bg-slate-300 rounded-lg my-1'
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
                    autoFocus
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
            degreeId={selectedDegree}
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
