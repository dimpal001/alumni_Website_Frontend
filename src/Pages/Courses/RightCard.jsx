import { Box } from '@chakra-ui/react'
import { BiLinkExternal } from 'react-icons/bi'
import { FaLinkedin, FaSquareGithub } from 'react-icons/fa6'
import { Link } from 'react-router-dom'

const RightCard = ({ user, onClick }) => {
  return (
    <>
      <Box className='bg-slate-200 dark:bg-slate-900' borderRadius={'2xl'}>
        <div className='p-5'>
          <div>
            <div className='mt-4 mb-1'>
              <p className=''>Email Address</p>
              <p className='font-bold text-xl'>{user.email}</p>
            </div>
            <div className='mt-4 mb-1'>
              <p className=''>Mobile Number</p>
              <p className='font-bold text-xl'>{user.phone}</p>
            </div>
            {user.otherInfo.worksAt !== '' && (
              <div className='mt-4 mb-1'>
                <p className=''>Working at</p>
                <p className='font-bold text-xl'>{user.otherInfo.worksAt}</p>
              </div>
            )}
            {user.otherInfo.positionAtWork != '' && (
              <div className='mt-4 mb-1'>
                <p className=''>Job position</p>
                <p className='font-bold text-xl'>
                  {user.otherInfo.positionAtWork}
                </p>
              </div>
            )}
          </div>
          <div className='flex mt-2 justify-around'>
            {user.otherInfo.website != '' && (
              <Link target='_blank' to={`${user.otherInfo.website}`}>
                <div className='flex hover:text-primary delay-[0.05s] transition-all justify-center flex-col items-center'>
                  <BiLinkExternal size={30} />
                  <p className='text-xs pt-1 font-bold'>Websile</p>
                </div>
              </Link>
            )}
            {user.otherInfo.linkedInLink != '' && (
              <Link target='_blank' to={`${user.otherInfo.linkedInLink}`}>
                <div className='flex hover:text-primary delay-[0.05s] transition-all justify-center flex-col items-center'>
                  <FaLinkedin size={27} />
                  <p className='text-xs pt-1 font-bold'>LinkedIn</p>
                </div>
              </Link>
            )}
            {user.otherInfo.gitHubLink != '' && (
              <Link target='_blank' to={`${user.otherInfo.gitHubLink}`}>
                <div className='flex hover:text-primary delay-[0.05s] transition-all justify-center flex-col items-center'>
                  <FaSquareGithub size={27} />
                  <p className='text-xs pt-1 font-bold'>GitHub</p>
                </div>
              </Link>
            )}
          </div>
          <div className='flex justify-center my-3'>
            <button
              onClick={onClick}
              className='bg-primary text-white hover:bg-secandary px-3 font-bold py-1 rounded-lg'
            >
              Update details
            </button>
          </div>
        </div>
      </Box>
    </>
  )
}

export default RightCard
