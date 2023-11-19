import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import Loading from './Loading'
import { CButton1 } from './CustomDesign'
import SinglPostModal from './SinglPostModal'

const AlumniPostRequest = ({ isOpen, onClose }) => {
  const [announcements, setAnnouncements] = useState([])
  const [isLoading, setLoading] = useState(true)
  const [isAttachmentModal, setIsAttachmentModal] = useState(false)
  const [selectedAttachment, setSelectedAttachment] = useState()

  const handleAttachmentModal = () => {
    setIsAttachmentModal(true)
  }

  const fetchAnnouncements = async () => {
    try {
      const response = await axios.get(
        'http://localhost:3000/api/announcement/pending'
      )
      setAnnouncements(response.data)
      console.log(announcements)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching announcements:', error.message)
    }
  }

  useEffect(() => {
    fetchAnnouncements()
  }, [])

  const handleApproveOrReject = async ({ id, status }) => {
    console.log(id)
    try {
      await axios.put(
        `http://localhost:3000/api/announcement/approve-reject/${id}`,
        {
          status: status,
        }
      )
      fetchAnnouncements()
    } catch (error) {
      console.error('Error fetching announcements:', error.message)
    }
  }

  return (
    <>
      <Modal
        size={{ base: 'full', lg: '5xl' }}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent className='dark:bg-slate-900'>
          <ModalCloseButton />
          <ModalBody>
            {isLoading ? (
              <Loading title={'Fetching data...'} />
            ) : (
              <div className='p-2 my-3'>
                <div className='flex w-full'>
                  <div className='w-full'>
                    {announcements.length === 0 && announcements ? (
                      <p className='text-center font-bold text-xl'>
                        No data to show
                      </p>
                    ) : (
                      <div className='flex border rounded-lg w-full'>
                        <TableContainer width={'100%'}>
                          <Table variant={'simple'}>
                            <Thead>
                              <Tr>
                                <Th>Name</Th>
                                <Th>Title</Th>
                                <Th>Description</Th>
                                <Th>Requested on</Th>
                                <Th>Attatchment</Th>
                                <Th>Action</Th>
                              </Tr>
                            </Thead>
                            <Tbody>
                              {announcements &&
                                announcements.map((announcement, index) => (
                                  <Tr key={index}>
                                    <Td className='text-sm'>
                                      {announcement.name}
                                    </Td>
                                    <Td className='text-sm'>
                                      {announcement.title}
                                    </Td>
                                    <Td className='text-sm'>
                                      {announcement.description}
                                    </Td>
                                    <Td className='text-sm'>
                                      {new Date(
                                        announcement.uploadDateTime
                                      ).toLocaleDateString()}
                                    </Td>
                                    <Td>
                                      <CButton1
                                        size={'sm'}
                                        title={'Attatchment'}
                                        onClick={() => {
                                          handleAttachmentModal()
                                          setSelectedAttachment(announcement)
                                        }}
                                      />
                                    </Td>
                                    <Td>
                                      <div className='flex flex-col gap-y-2'>
                                        <Button
                                          background={'green.600'}
                                          color={'white'}
                                          _hover={{ background: 'green.700' }}
                                          size={'sm'}
                                          onClick={() => {
                                            handleApproveOrReject({
                                              id: announcement._id,
                                              status: 'approved',
                                            })
                                          }}
                                        >
                                          Approve
                                        </Button>
                                        <Button
                                          background={'red.600'}
                                          color={'white'}
                                          _hover={{ background: 'red.700' }}
                                          size={'sm'}
                                          onClick={() => {
                                            handleApproveOrReject({
                                              id: announcement._id,
                                              status: 'rejected',
                                            })
                                          }}
                                        >
                                          Reject
                                        </Button>
                                      </div>
                                    </Td>
                                  </Tr>
                                ))}
                            </Tbody>
                          </Table>
                        </TableContainer>
                      </div>
                    )}
                  </div>
                </div>
                {isAttachmentModal && (
                  <SinglPostModal
                    isOpen={true}
                    onClose={() => setIsAttachmentModal(false)}
                    announcement={selectedAttachment}
                  />
                )}
              </div>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default AlumniPostRequest
