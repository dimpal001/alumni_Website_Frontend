import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast,
} from '@chakra-ui/react'
import { LabelInput, brandColor } from './Components/CustomDesign'
import { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { UserContext } from '../UserContext'
import LeftCard from './Courses/LeftCard'
import RightCard from './Courses/RightCard'
import CourseCard from './Courses/CourseCard'
import ManageContent from './ManageContents/ManageContent'
import { api } from './Components/API'
import WorkingExprCard from './Courses/WorkingExprCard'
import UpdateWorkingExprModal from './Courses/UpdateWorkingExprModal'
const ProfilePage = ({ userDeials }) => {
  const navigate = useToast()
  const { user, setUser } = useContext(UserContext)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [isWorkingExprModalOpen, setIsWorkingExprModalOpen] = useState(false)

  const handleWorkingExprModal = () => {
    setIsWorkingExprModalOpen(true)
  }

  const [personalWebsite, setPersonalWebsite] = useState(
    user.type === 'alumni' ? user.otherInfo.website : ''
  )
  const [githubLink, setGithubLink] = useState(
    user.type === 'alumni' ? user.otherInfo.gitHubLink : ''
  )
  const [linkedInLink, setLinkedInLink] = useState(
    user.type === 'alumni' ? user.otherInfo.linkedInLink : ''
  )
  const [address, setAddress] = useState(
    user.type === 'alumni' ? user.otherInfo.address : ''
  )
  const toast = useToast()

  const handleSubmit = async () => {
    const jwtToken = sessionStorage.getItem('jwtToken')
    try {
      const response = await axios.put(
        `${api}/api/update-profile`,
        {
          website: personalWebsite,
          gitHubLink: githubLink,
          linkedInLink: linkedInLink,
          address: address,
        },
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      )
      toast({
        title: 'Profile updated !',
        status: 'success',
        isClosable: true,
        duration: 1800,
        position: 'top',
      })
      console.log(response.data)
      setUser(response.data.user)
      sessionStorage.setItem('user', JSON.stringify(response.data.user))
      onClose()
    } catch (error) {
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
      console.error(error)
      toast({
        title: 'Update failed !',
        status: 'error',
        isClosable: true,
        duration: 1800,
        position: 'top',
      })
    }
  }

  const handleWorkingExprSubmit = (workingExprDetails) => {
    console.log('Working Experience Details:', workingExprDetails)
    const jwtToken = sessionStorage.getItem('jwtToken')
    axios
      .post(
        `${api}/api/auth/add-working-experience/${user._id}`,
        {
          from: workingExprDetails.from,
          to: workingExprDetails.to,
          position: workingExprDetails.position,
          companyName: workingExprDetails.companyName,
          place: workingExprDetails.place,
        },
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      )
      .then((response) => {
        toast({
          title: 'The details has been added.',
          status: 'success',
          isClosable: true,
          duration: 1800,
          position: 'top',
        })
        setUser(response.data.user)
        sessionStorage.setItem('user', JSON.stringify(response.data.user))
        setIsWorkingExprModalOpen(false)
      })
      .catch((error) => {
        console.log(error)
        toast({
          title: 'Update failed !',
          status: 'error',
          isClosable: true,
          duration: 1800,
          position: 'top',
        })
      })
  }

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
    document.title = 'Dashboard'
  }, [])

  return (
    <>
      <div className='bg-white min-h-[700px] lg:min-h-[500px] dark:bg-slate-800 p-5 lg:rounded-lg'>
        <p className='text-center font-bold text-3xl pb-3'>User Profile</p>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-5'>
          <LeftCard userDetails={userDeials} />
          {user.type === 'alumni' && (
            <RightCard onClick={() => onOpen()} user={userDeials} />
          )}
          {user.type === 'admin' && <ManageContent user={userDeials} />}
          {user.type === 'alumni' && (
            <WorkingExprCard
              userDetails={userDeials}
              onClick={handleWorkingExprModal}
            />
          )}
          {user.type === 'alumni' && <CourseCard />}
        </div>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay overflow={'scroll'} />
          <ModalContent className='dark:bg-slate-900 mx-3'>
            <ModalHeader className='text-slate-950 dark:text-white'>
              Update Personal Details
            </ModalHeader>
            <ModalCloseButton color={brandColor.first} />
            <ModalBody overflowY={'scroll'}>
              <LabelInput
                label={'Personal website'}
                placeholder={'Enter your personal website'}
                value={personalWebsite}
                onChange={(e) => setPersonalWebsite(e.target.value)}
              />
              <LabelInput
                label={'Github Link'}
                placeholder={'Enter your github link'}
                value={githubLink}
                onChange={(e) => setGithubLink(e.target.value)}
              />
              <LabelInput
                label={'LinkedIn Link'}
                placeholder={'Enter your linkedIn link'}
                value={linkedInLink}
                onChange={(e) => setLinkedInLink(e.target.value)}
              />
              <LabelInput
                label={'Current Address'}
                placeholder={'Enter your current address'}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              <div className='px-2 mt-3'>
                <Button
                  background={brandColor.first}
                  _hover={brandColor.second}
                  color={'white'}
                  w={'100%'}
                  mb={4}
                  onClick={handleSubmit}
                >
                  Submit
                </Button>
              </div>
            </ModalBody>
          </ModalContent>
        </Modal>
        {isWorkingExprModalOpen && (
          <UpdateWorkingExprModal
            isOpen={true}
            onClose={() => setIsWorkingExprModalOpen(false)}
            onSubmit={handleWorkingExprSubmit}
          />
        )}
      </div>
    </>
  )
}

export default ProfilePage
