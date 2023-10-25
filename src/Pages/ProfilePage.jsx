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
import { useContext, useState } from 'react'
import axios from 'axios'
import { UserContext } from '../UserContext'
import LeftCard from './Courses/LeftCard'
import RightCard from './Courses/RightCard'
import CourseCard from './Courses/CourseCard'
const ProfilePage = ({ userDeials }) => {
  const navigate = useToast()
  const { user, setUser } = useContext(UserContext)
  const { isOpen, onOpen, onClose } = useDisclosure()

  const [currentJob, setCurrentJob] = useState(
    user.type === 'alumni' ? user.otherInfo.worksAt : ''
  )
  const [jobPosition, setJobPosition] = useState(
    user.type === 'alumni' ? user.otherInfo.positionAtWork : ''
  )
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
        'http://192.168.1.15:3000/api/update-profile',
        {
          worksAt: currentJob,
          positionAtWork: jobPosition,
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

  return (
    <>
      <div className='bg-white min-h-[700px] lg:min-h-[500px] dark:bg-slate-800 p-5 lg:rounded-lg'>
        <p className='text-center font-bold text-3xl py-3'>User Profile</p>
        <div
          className={`${
            user.type === 'alumni' ? 'grid' : 'flex'
          } grid-cols-1 gap-3 justify-center lg:grid-cols-2`}
        >
          <LeftCard user={userDeials} />
          {user.type === 'alumni' && (
            <RightCard onClick={() => onOpen()} user={userDeials} />
          )}
        </div>
        {user.type === 'alumni' && (
          <CourseCard courses={user.parmanentCourses} />
        )}
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay overflow={'scroll'} />
          <ModalContent className='dark:bg-slate-900'>
            <ModalHeader className='text-slate-950 dark:text-white'>
              Update details
            </ModalHeader>
            <ModalCloseButton color={'white'} />
            <ModalBody maxH={'450px'} overflowY={'scroll'}>
              <LabelInput
                label={'Current job'}
                placeholder={'Enter job/company name'}
                value={currentJob}
                onChange={(e) => setCurrentJob(e.target.value)}
              />
              <LabelInput
                label={'Job position'}
                placeholder={'Enter position of the job'}
                value={jobPosition}
                onChange={(e) => setJobPosition(e.target.value)}
              />
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
            </ModalBody>
          </ModalContent>
        </Modal>
      </div>
    </>
  )
}

export default ProfilePage
