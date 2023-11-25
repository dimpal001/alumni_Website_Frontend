import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react'
import { useState } from 'react'
import { CButton1, LabelInput } from '../Components/CustomDesign'

const UpdateWorkingExprModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    from: '',
    to: '',
    position: '',
    companyName: '',
    place: '',
  })

  const handleFieldChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleAddDetails = () => {
    onSubmit(formData)
  }

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent className='dark:bg-slate-900 max-sm:mx-2 dark:text-white'>
          <ModalHeader>Add a working experience</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <LabelInput
              label={'Working from'}
              placeholder={'Enter the year'}
              name={'from'}
              value={formData.from}
              onChange={handleFieldChange}
            />
            <LabelInput
              label={'Working to'}
              placeholder={'Enter the year'}
              name={'to'}
              value={formData.to}
              onChange={handleFieldChange}
            />
            <LabelInput
              label={'Position at the work'}
              placeholder={'Enter the position name'}
              name={'position'}
              value={formData.position}
              onChange={handleFieldChange}
            />
            <LabelInput
              label={'Company name'}
              placeholder={'Enter the company name'}
              name={'companyName'}
              value={formData.companyName}
              onChange={handleFieldChange}
            />
            <LabelInput
              label={'Company Location'}
              placeholder={'Enter the working place name'}
              name={'place'}
              value={formData.place}
              onChange={handleFieldChange}
            />
            <div className='px-2 my-5'>
              <CButton1
                width={'100%'}
                title={'Add Details'}
                onClick={handleAddDetails}
              />
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default UpdateWorkingExprModal
