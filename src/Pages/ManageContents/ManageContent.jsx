import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Divider,
  List,
  ListIcon,
  ListItem,
} from '@chakra-ui/react'
import { CButton1 } from '../Components/CustomDesign'
import { MdCheckCircle } from 'react-icons/md'
import { useContext, useEffect, useState } from 'react'
import UpdateDegreeModal from './UpdateDegreeModal'
import axios from 'axios'
import UploadAlumniData from '../UploadAlumniData'
import SignUpModal from '../Components/SignUpModal'
import { MdOutlineCloudUpload } from 'react-icons/md'
import { FiUserPlus } from 'react-icons/fi'
import { api } from '../Components/API'
import { UserContext } from '../../UserContext'

const ManageContent = () => {
  const { user } = useContext(UserContext)
  const [isDegreeModalOpen, setIsDegreeModalOpen] = useState(false)
  const [isNewAdminModalOpen, setIsNewAdminModalOpen] = useState(false)
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false)
  const [degrees, setDegrees] = useState([])
  const [openAccordion, setOpenAccordion] = useState(null)

  const fetchContent = async () => {
    const jwtToken = sessionStorage.getItem('jwtToken')

    await axios
      .get(`${api}/api/departments/degrees/${user.department}`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      })
      .then((response) => {
        console.log(response.data)
        setDegrees(response.data.degrees)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  useEffect(() => {
    fetchContent()
  }, [])

  const handleUploadModal = () => {
    setIsUploadModalOpen(true)
  }

  const handleDegreeModalOpen = () => {
    setIsDegreeModalOpen(true)
    setOpenAccordion(null)
  }

  const handleNewAdminModalOpen = () => {
    setIsNewAdminModalOpen(true)
  }

  return (
    <>
      <div>
        <Box className='bg-slate-200 dark:bg-slate-900' borderRadius={'2xl'}>
          <div className='p-5'>
            <div>
              <Accordion
                className='flex border-0 flex-col gap-5'
                allowToggle
                index={openAccordion}
                ringOffsetColor={'transparent'}
                onChange={(index) => setOpenAccordion(index)}
              >
                <AccordionItem
                  className='rounded-lg hover:rounded-lg bg-slate-50 dark:bg-slate-800'
                  borderWidth={0}
                  ringOffsetColor={'transparent'}
                >
                  <AccordionButton
                    className='border-0 hover:rounded-lg hover:bg-white'
                    onClick={() => fetchContent()}
                  >
                    <Box
                      as='span'
                      flex='1'
                      className='font-bold'
                      textAlign='left'
                    >
                      Degrees
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                  <AccordionPanel pb={4}>
                    <Divider className='mb-3' />
                    <CButton1
                      onClick={handleDegreeModalOpen}
                      title={'Update degree'}
                    />
                    <List className='font-bold mt-3'>
                      {degrees &&
                        degrees.map((degree, index) => (
                          <ListItem
                            className='rounded-lg text-slate-950 dark:text-white my-1'
                            key={index}
                          >
                            <div className='flex w-full'>
                              <ListIcon
                                as={MdCheckCircle}
                                className='mt-1'
                                color='green.500'
                              />
                              <div className='flex w-full justify-between items-center'>
                                {degree.name}
                              </div>
                            </div>
                          </ListItem>
                        ))}
                    </List>
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
              <div className='mt-5'>
                <CButton1
                  leftIcon={<MdOutlineCloudUpload size={22} />}
                  width={'100%'}
                  onClick={handleUploadModal}
                  title={'Upload Alumni data'}
                />
              </div>
              <div className='mt-5'>
                <CButton1
                  leftIcon={<FiUserPlus size={22} />}
                  width={'100%'}
                  onClick={handleNewAdminModalOpen}
                  title={'Create new admin'}
                />
              </div>
            </div>
          </div>
        </Box>
        {isDegreeModalOpen && (
          <UpdateDegreeModal
            isOpen={true}
            onClose={() => setIsDegreeModalOpen(false)}
          />
        )}
        {isUploadModalOpen && (
          <UploadAlumniData
            isOpen={true}
            onClose={() => setIsUploadModalOpen(false)}
          />
        )}
        {isNewAdminModalOpen && (
          <SignUpModal
            title={'createAdmin'}
            open={true}
            onClose={() => setIsNewAdminModalOpen(false)}
          />
        )}
      </div>
    </>
  )
}

export default ManageContent
