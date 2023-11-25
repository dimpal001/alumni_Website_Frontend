import { useState } from 'react'
import { Checkbox, useToast } from '@chakra-ui/react'
import { CButton1, LabelInput } from './CustomDesign'
import axios from 'axios'

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmNewPassword, setConfirmNewPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const toast = useToast()

  const handleChangePassword = async () => {
    try {
      if (newPassword !== confirmNewPassword) {
        toast({
          title: 'Error',
          description: 'New password and confirm password do not match.',
          status: 'error',
          duration: 3000,
          isClosable: true,
          position: 'top',
        })
        return
      }

      await axios
        .post('/api/change-password', {
          currentPassword,
          newPassword,
        })
        .then((response) => {
          console.log(response.data)
          toast({
            title: 'Password changed',
            status: 'success',
            duration: 3000,
            isClosable: true,
            position: 'top',
          })

          setCurrentPassword('')
          setNewPassword('')
          setConfirmNewPassword('')
        })
        .catch((error) => {
          console.log(error)
          toast({
            title: 'Failed changing password',
            status: 'error',
            duration: 3000,
            isClosable: true,
            position: 'top',
          })
        })
    } catch (error) {
      toast({
        title: 'Error',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top',
      })
    }
  }

  return (
    <>
      <div className='bg-white lg:min-h-[500px] dark:bg-slate-900 p-5 max-sm:p-1 lg:rounded-lg'>
        <p className='text-center max-md:hidden font-bold text-3xl pb-3'>
          Change Password
        </p>
        <div className='lg:mx-56'>
          <LabelInput
            label={'Current Password'}
            placeholder={'Enter current password'}
            type={showPassword ? 'text' : 'password'}
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
          <LabelInput
            label={'New Password'}
            placeholder={'Enter a new password'}
            type={showPassword ? 'text' : 'password'}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <LabelInput
            label={'Confirm New Password'}
            placeholder={'Enter confirm new password'}
            type={showPassword ? 'text' : 'password'}
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
          />
          <div className='mx-4'>
            <Checkbox
              defaultChecked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
            >
              Show Password
            </Checkbox>
          </div>
          <div className='mx-2 mt-3'>
            <CButton1
              width={'100%'}
              title={'Change'}
              onClick={handleChangePassword}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default ChangePassword
