import {
  Box,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast,
} from '@chakra-ui/react'
import { BiEdit } from 'react-icons/bi'
import { CButton1, LabelInput } from '../Components/CustomDesign'
import { useContext, useState } from 'react'
import { UserContext } from '../../UserContext'
import axios from 'axios'
import { api } from '../Components/API'

const WorkingExprCard = ({ userDetails, onClick }) => {
  const { user, setUser } = useContext(UserContext)
  const toast = useToast()
  const [selectedCard, setSelectedCard] = useState({})
  const { isOpen, onOpen, onClose } = useDisclosure()

  const handleFieldChange = (e) => {
    const { name, value } = e.target
    setSelectedCard((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleUpdateDetails = () => {
    console.log(selectedCard)
    const jwtToken = sessionStorage.getItem('jwtToken')
    axios
      .put(
        `${api}/api/auth/update-working-experience/${user._id}/${selectedCard._id}`,
        {
          from: selectedCard.from,
          to: selectedCard.to,
          position: selectedCard.position,
          companyName: selectedCard.companyName,
          place: selectedCard.place,
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
        onClose()
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

  return (
    <>
      <Box className='bg-slate-200 dark:bg-slate-900' borderRadius={'2xl'}>
        <div className='p-5'>
          {userDetails.workingExperience &&
            userDetails.workingExperience.map((work, index) => (
              <div key={index}>
                <Card
                  details={work}
                  onClick={() => {
                    onOpen()
                    setSelectedCard(work)
                  }}
                />
                <div className='h-[0.8px] bg-slate-800 dark:bg-slate-500 my-4'></div>
              </div>
            ))}
          <div className='flex justify-center my-3'>
            <CButton1
              width={'100%'}
              title={'Add Working Experience'}
              onClick={onClick}
              rightIcon={<BiEdit size={18} />}
            />
          </div>
        </div>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent className='dark:bg-slate-900 max-sm:mx-2 dark:text-white'>
            <ModalHeader>Update details</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <LabelInput
                label={'Working from'}
                placeholder={'Enter the year'}
                name={'from'}
                value={selectedCard.from && selectedCard.from}
                onChange={handleFieldChange}
              />
              <LabelInput
                label={'Working to'}
                placeholder={'Enter the year'}
                name={'to'}
                value={selectedCard.to && selectedCard.to}
                onChange={handleFieldChange}
              />
              <LabelInput
                label={'Position at the work'}
                placeholder={'Enter the position name'}
                name={'position'}
                value={selectedCard.position && selectedCard.position}
                onChange={handleFieldChange}
              />
              <LabelInput
                label={'Company name'}
                placeholder={'Enter the company name'}
                name={'companyName'}
                value={selectedCard.companyName && selectedCard.companyName}
                onChange={handleFieldChange}
              />
              <LabelInput
                label={'Company Location'}
                placeholder={'Enter the working place name'}
                name={'place'}
                value={selectedCard.place && selectedCard.place}
                onChange={handleFieldChange}
              />
              <div className='px-2 my-5'>
                <CButton1
                  width={'100%'}
                  title={'Update Details'}
                  onClick={handleUpdateDetails}
                />
              </div>
            </ModalBody>
          </ModalContent>
        </Modal>
      </Box>
    </>
  )
}

const Card = ({ details, onClick }) => {
  return (
    <div onClick={onClick} className='cursor-pointer'>
      <p className='text-sm'>
        From <span>{details.from && details.from}</span> to{' '}
        <span className='capitalize'>{details.to && details.to}</span>
      </p>
      <p className='text-sm'>
        At{' '}
        <span className='capitalize'>
          {details.companyName && details.companyName}
        </span>
        , <span className='capitalize'>{details.place && details.place}</span>{' '}
        as a{' '}
        <span className='capitalize'>
          {details.position && details.position}
        </span>
      </p>
    </div>
  )
}

export default WorkingExprCard
