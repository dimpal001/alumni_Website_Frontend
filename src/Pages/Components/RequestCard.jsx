import {
  Badge,
  Divider,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react'
import Female from '../../assets/female.svg'
import Male from '../../assets/male.svg'
import { brandColor } from './CustomDesign'

const RequestCard = ({
  name,
  date,
  course,
  click,
  id,
  status,
  gender,
  type,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <div className='lg:px-20 cursor-pointer' onClick={() => onOpen()}>
        <div className='flex bg-slate-200 rounded-lg dark:bg-slate-900 mb-3 lg:m-3 p-4'>
          <div className='w-[25%]'>
            <img
              src={gender === 'male' ? Male : Female}
              className='w-[80px]'
              alt='User'
            />
            {type === 'alumni' ? (
              <Badge
                background={'green'}
                px={1}
                mt={-4}
                color={'white'}
                textTransform={'capitalize'}
              >
                Alumni
              </Badge>
            ) : (
              <Badge
                background={'blue'}
                px={1}
                mt={-4}
                color={'white'}
                textTransform={'capitalize'}
              >
                New User
              </Badge>
            )}
          </div>
          <div className='w-[75%] max-md:pl-3'>
            <div className='lg:flex justify-between items-start'>
              <p className='font-bold text-lg'>{name}</p>
              <p className='text-xs'>Requested on : {date}</p>
            </div>
            <p className='py-1'>{`${course.degree} | ${course.admissionYear} - ${course.completionYear}`}</p>
            <div>
              {status === 'pending' ? (
                <div className='flex gap-5'>
                  <button
                    onClick={() => click({ title: 'approved', id: id })}
                    className='px-3 font-bold text-sm py-1 bg-primary text-white rounded-lg'
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => click({ title: 'rejected', id: id })}
                    className='px-3 font-bold text-sm py-1 bg-primary text-white rounded-lg'
                  >
                    Reject
                  </button>
                </div>
              ) : status === 'approved' ? (
                <div>
                  <button className='px-3 cursor-default opacity-[0.8] font-bold text-sm py-1 bg-green-600 text-white rounded-lg'>
                    Approved
                  </button>
                </div>
              ) : (
                <div>
                  <button className='px-3 opacity-[0.8] cursor-default font-bold text-sm py-1 bg-red-600 text-white rounded-lg'>
                    Rejected
                  </button>
                </div>
              )}
              {}
            </div>
          </div>
        </div>
      </div>
      <Modal size={'sm'} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent className='dark:bg-slate-800 mx-3 text-white'>
          <ModalHeader className='dark:text-white'>
            <div className='flex gap-3'>
              <img
                className='w-[50px]'
                src={gender === 'male' ? Male : Female}
                alt='Image'
              />
              <div>
                <p>{name}</p>
                <Badge
                  background={type === 'user' ? 'blue' : 'green'}
                  color={'white'}
                  textTransform={'capitalize'}
                >
                  {type === 'user' ? 'New User' : 'Alumni'}
                </Badge>
              </div>
            </div>
          </ModalHeader>
          <ModalCloseButton color={brandColor.first} />
          <ModalBody>
            <Divider />
            <div>
              <div className='grid grid-cols-2 gap-y-2 dark:text-white font-bold p-3'>
                <p>Degree</p>
                <p>{course.degree}</p>
                <p>Department</p>
                <p>{course.department}</p>
                <p>Admission Year</p>
                <p>{course.admissionYear}</p>
                <p>Completion Year</p>
                <p>{course.completionYear}</p>
                <p>Roll Number</p>
                <p>{course.rollNumber}</p>
                <p>CGPA</p>
                <p>{course.cgpa}</p>
              </div>
            </div>
            <Divider mb={3} />
            <div className='flex mb-2 justify-center'>
              {status === 'pending' ? (
                <div className='flex gap-5'>
                  <button
                    onClick={() => click({ title: 'approved', id: id })}
                    className='px-3 font-bold text-sm py-1 bg-primary text-white rounded-lg'
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => click({ title: 'rejected', id: id })}
                    className='px-3 font-bold text-sm py-1 bg-primary text-white rounded-lg'
                  >
                    Reject
                  </button>
                </div>
              ) : status === 'approved' ? (
                <div>
                  <button className='px-3 cursor-default opacity-[0.8] font-bold text-sm py-1 bg-green-600 text-white rounded-lg'>
                    Approved
                  </button>
                </div>
              ) : (
                <div>
                  <button className='px-3 opacity-[0.8] cursor-default font-bold text-sm py-1 bg-red-600 text-white rounded-lg'>
                    Rejected
                  </button>
                </div>
              )}
              {}
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default RequestCard
