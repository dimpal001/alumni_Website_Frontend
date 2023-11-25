import MaleImg from '../../assets/male.svg'
import FemaleImg from '../../assets/female.svg'
import { Box } from '@chakra-ui/react'
import { CButton1 } from '../Components/CustomDesign'
import { BiLogOutCircle } from 'react-icons/bi'
import { useContext, useState } from 'react'
import { UserContext } from '../../UserContext'
import { useNavigate } from 'react-router-dom'
import { RiLockPasswordFill } from 'react-icons/ri'
import ChangePasswordModal from '../Components/ChangePasswordModal'

const LeftCard = ({ userDetails }) => {
  const { setUser } = useContext(UserContext)
  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] =
    useState(false)
  const navigate = useNavigate()

  const handleChangePasswordModal = () => {
    setIsChangePasswordModalOpen(true)
  }

  return (
    <>
      <Box
        width={{ base: '100%' }}
        className='bg-slate-200 dark:bg-slate-900'
        borderRadius={'2xl'}
      >
        <div className='p-5'>
          <div>
            <div className='flex justify-center'>
              <img
                className='h-28'
                src={userDetails.gender === 'male' ? MaleImg : FemaleImg}
              />
            </div>
            <p className='text-center pt-2 text-2xl font-bold'>
              {userDetails.name}
            </p>
            <p className='text-xs font-bold text-center text-primary'>
              Login as {userDetails.type}
            </p>
            {userDetails.type === 'alumni' && (
              <p className='text-center py-1 text-xs font-bold'>
                {userDetails.parmanentCourses[0].degree} in{' '}
                {userDetails.parmanentCourses[0].department} <br />
                {userDetails.parmanentCourses[0].admissionYear} -{' '}
                {userDetails.parmanentCourses[0].completionYear}
              </p>
            )}
            {userDetails.type === 'admin' && (
              <div className='mt-4 mb-1'>
                <p className=''>Email Address</p>
                <p className='font-bold text-xl'>{userDetails.email}</p>
              </div>
            )}
            {userDetails.type === 'admin' && (
              <div className='mt-4 mb-1'>
                <p className=''>Mobile Number</p>
                <p className='font-bold text-xl'>{userDetails.phone}</p>
              </div>
            )}
            <div className='flex mt-2 lg:hidden justify-center'>
              {userDetails && (
                <CButton1
                  width={'100%'}
                  title={'Logout'}
                  rightIcon={<BiLogOutCircle size={18} />}
                  onClick={() => {
                    setUser(null)
                    sessionStorage.removeItem('jwtToken')
                    sessionStorage.removeItem('user')
                    navigate('/')
                  }}
                />
              )}
            </div>
            <div className='flex mt-2 lg:hidden justify-center'>
              {userDetails && (
                <CButton1
                  width={'100%'}
                  title={'Change Password'}
                  onClick={handleChangePasswordModal}
                  rightIcon={<RiLockPasswordFill size={18} />}
                />
              )}
            </div>
            {isChangePasswordModalOpen && (
              <ChangePasswordModal
                isOpen={true}
                onClose={() => setIsChangePasswordModalOpen(false)}
              />
            )}
          </div>
        </div>
      </Box>
    </>
  )
}

export default LeftCard
