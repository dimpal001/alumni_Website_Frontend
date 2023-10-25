import MaleImg from '../../assets/male.svg'
import FemaleImg from '../../assets/female.svg'
import { Box } from '@chakra-ui/react'

const LeftCard = ({ user }) => {
  return (
    <>
      <Box
        width={{ base: '100%', lg: user.type === 'admin' && '55%' }}
        className='bg-slate-200 dark:bg-slate-900'
        borderRadius={'2xl'}
      >
        <div className='p-5'>
          <div>
            <div className='flex justify-center'>
              <img
                className='h-28'
                src={user.gender === 'male' ? MaleImg : FemaleImg}
              />
            </div>
            <p className='text-center pt-2 text-2xl font-bold'>{user.name}</p>
            <p className='text-xs font-bold text-center text-primary'>
              Login as {user.type}
            </p>
            {user.type === 'alumni' && (
              <p className='text-center py-1 text-xs font-bold'>
                {user.parmanentCourses[0].degree} in{' '}
                {user.parmanentCourses[0].department} |{' '}
                {user.parmanentCourses[0].admissionYear} -{' '}
                {user.parmanentCourses[0].completionYear}
              </p>
            )}
            <div className='mt-3 mb-1'>
              <p className='text-sm'>Gender</p>
              <p className='font-bold capitalize text-xl'>{user.gender}</p>
            </div>
            {user.type === 'admin' && (
              <div className='mt-3 mb-1'>
                <p className=''>Email Address</p>
                <p className='font-bold text-xl'>{user.email}</p>
              </div>
            )}
            {user.type === 'alumni' && (
              <div className='mt-3 mb-1'>
                <p className=''>Current Address</p>
                <p className='font-bold text-xl'>
                  {user.otherInfo.address
                    ? user.otherInfo.address
                    : 'Not provided'}
                </p>
              </div>
            )}
            {user.type === 'admin' && (
              <div className='mt-3 mb-1'>
                <p className='text-sm'>Mobile Number</p>
                <p className='font-bold text-xl'>{user.phone}</p>
              </div>
            )}
          </div>
        </div>
      </Box>
    </>
  )
}

export default LeftCard
