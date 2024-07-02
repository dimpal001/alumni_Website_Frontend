import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'
import { CButton, CInput } from '../../Components/CustomDesigns'
import { useState } from 'react'
import axios from 'axios'
import { api } from '../../Components/API'
import toast from 'react-hot-toast'

const AddProfessionModal = ({ isOpen, onClose, id, fetchDetails }) => {
  const [newProfession, setNewProfession] = useState({
    profession: '',
    organisation: '',
    workingFrom: '',
    workingTo: '',
  })

  const handleInputChange = (e) => {
    setNewProfession({
      ...newProfession,
      [e.target.name]: e.target.value,
    })
  }

  const handleAddProfession = () => {
    const currentYear = new Date().getFullYear() - 1
    console.log(currentYear)
    console.log(newProfession.workingFrom)
    if (newProfession.profession.length < 3) {
      toast.error('Enter a valid profession name. Profession name is too short')
      return
    }
    if (newProfession.organisation.length < 4) {
      toast.error(
        'Enter a valid organisation name. Organisation name is too short'
      )
      return
    }

    const workingFromYear = parseInt(newProfession.workingFrom)

    if (isNaN(workingFromYear) || workingFromYear > currentYear) {
      toast.error('Enter a valid (working from) year')
      return
    }

    const workingToYear = parseInt(newProfession.workingTo)

    if (newProfession.workingTo === '') {
      toast.error('Enter a valid (working to) year')
      return
    }

    if (workingToYear < workingFromYear || workingToYear > currentYear) {
      toast.error('Enter a valid (working to) year')
      return
    }

    const token = sessionStorage.getItem('token')
    axios
      .post(`${api}/api/profile/add-profession/${id}`, newProfession, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data)
        toast.success(response.data.message)
        fetchDetails()
        onClose()
      })
      .catch((error) => {
        console.error(error)
        toast.error(error.response.data.message)
      })
  }

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent className='dark:bg-slate-800 dark:text-white'>
          <ModalHeader>Add a profession</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <CInput
              onChange={handleInputChange}
              value={newProfession.profession}
              name='profession'
              placeholder={'Profession'}
              label={'Profession'}
            />
            <CInput
              onChange={handleInputChange}
              value={newProfession.organisation}
              name='organisation'
              placeholder={'Organisation'}
              label={'Organisation'}
            />
            <CInput
              onChange={handleInputChange}
              value={newProfession.workingFrom}
              name='workingFrom'
              type={'tel'}
              placeholder={'Working From (Year)'}
              label={'Working From'}
            />
            <CInput
              onChange={handleInputChange}
              value={newProfession.workingTo}
              name='workingTo'
              placeholder={'Working To (Year / present)'}
              label={'Working To'}
            />
          </ModalBody>

          <ModalFooter>
            <CButton
              onClick={handleAddProfession}
              width={'100%'}
              title={'Add'}
            />
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default AddProfessionModal
