import { useContext, useState } from 'react'
import { Checkbox, useToast } from '@chakra-ui/react'
import { CButton1, LabelInput } from './CustomDesign'
import axios from 'axios'
import { UserContext } from '../../UserContext'
import { api } from './API'
import { useNavigate } from 'react-router-dom'

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmNewPassword, setConfirmNewPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()
  const { user, setUser } = useContext(UserContext)

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

      const jwtToken = sessionStorage.getItem('jwtToken')

      await axios
        .put(
          `${api}/api/change-password`,
          {
            oldPass: currentPassword,
            newPass: newPassword,
            _id: user._id,
          },
          {
            headers: {
              Authorization: `Bearer ${jwtToken}`,
            },
          }
        )
        .then((response) => {
          console.log(response.data)

          setUser(null)
          sessionStorage.removeItem('jwtToken')
          sessionStorage.removeItem('user')
          navigate('/')
          toast({
            title: `Password changed`,
            description: 'Please login !',
            status: 'success',
            duration: 1800,
            position: 'top',
            isClosable: true,
          })
        })
        .catch((error) => {
          console.log(error)
          toast({
            title: `${error.response.data.message}`,
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
      <div className='bg-white lg:min-h-[500px] dark:bg-slate-800 p-5 max-sm:p-1 lg:rounded-lg'>
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
