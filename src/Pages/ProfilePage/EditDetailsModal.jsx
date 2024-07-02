import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Select,
} from '@chakra-ui/react'
import { CButton, CInput } from '../../Components/CustomDesigns'
import { useState } from 'react'
import axios from 'axios'
import { api } from '../../Components/API'
import toast from 'react-hot-toast'
const EditDetailsModal = ({ isOpen, onClose, formData, fetchDetails }) => {
  const [data, setData] = useState(formData)
  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = () => {
    const token = sessionStorage.getItem('token')
    console.log(data)
    setIsLoading(true)
    axios
      .put(
        `${api}/api/profile/update-details/${data._id}`,
        {
          mobileNo: data.mobileNo,
          address: data.address,
          linkedIn: data.linkedIn,
          facebook: data.facebook,
          twitter: data.twitter,
          github: data.github,
          gender: data.gender,
          personalWebsite: data.personalWebsite,
          instagram: data.instagram,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data)
        toast.success(response.data.message)
        fetchDetails()
        onClose()
      })
      .catch((error) => {
        console.log(error)
        toast.error(error.response.data.message)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent className='dark:bg-slate-800 dark:text-white'>
          <ModalHeader>Edit personal details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div>
              <CInput
                onChange={handleInputChange}
                value={data.mobileNo}
                placeholder={'Mobile Number'}
                name={'mobileNo'}
                type={'tel'}
                label={'Mobile Number'}
              />
              <CInput
                onChange={handleInputChange}
                value={data.address}
                name={'address'}
                placeholder={'Address'}
                label={'Address'}
              />
              <CInput
                onChange={handleInputChange}
                value={data.linkedIn}
                name={'linkedIn'}
                placeholder={'LinkedIn Account'}
                label={'LinkedIn Account'}
              />
              <CInput
                onChange={handleInputChange}
                value={data.github}
                name={'github'}
                placeholder={'Github Account'}
                label={'Github Account'}
              />
              <CInput
                onChange={handleInputChange}
                value={data.facebook}
                name={'facebook'}
                placeholder={'Facebook Account'}
                label={'Facebook Account'}
              />
              <CInput
                onChange={handleInputChange}
                value={data.instagram}
                name={'instagram'}
                placeholder={'Instagram Account'}
                label={'Instagram Account'}
              />
              <CInput
                onChange={handleInputChange}
                value={data.twitter}
                name={'twitter'}
                placeholder={'Twitter(X) Account'}
                label={'Twitter(X) Account'}
              />
              <CInput
                onChange={handleInputChange}
                value={data.personalWebsite}
                name={'personalWebsite'}
                placeholder={'Personal Website'}
                label={'Personal Website'}
              />
              <FormControl>
                <FormLabel>Gender</FormLabel>
                <Select
                  value={data.gender}
                  onChange={handleInputChange}
                  name='gender'
                  placeholder='Select a gender'
                >
                  <option value='male'>Male</option>
                  <option value='female'>Female</option>
                  <option value='other'>Other</option>
                </Select>
              </FormControl>
              <div className='mt-3'>
                <CButton
                  isLoading={isLoading}
                  loadingText={'Updating...'}
                  width={'100%'}
                  onClick={handleSubmit}
                  title={'Update'}
                />
              </div>
            </div>
          </ModalBody>

          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default EditDetailsModal
