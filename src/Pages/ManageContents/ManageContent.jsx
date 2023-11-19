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
import { useEffect, useState } from 'react'
import UpdateDegreeModal from './UpdateDegreeModal'
import UpdateDepartmentModal from './UpdateDepartmentModal'
import axios from 'axios'
import UploadAlumniData from '../UploadAlumniData'
import SignUpModal from '../Components/SignUpModal'
import { MdOutlineCloudUpload } from 'react-icons/md'
import { FiUserPlus } from 'react-icons/fi'

const ManageContent = () => {
  const [isDegreeModalOpen, setIsDegreeModalOpen] = useState(false)
  const [isDepartmentModalOpen, setIsDepartmentModalOpen] = useState(false)
  const [isNewAdminModalOpen, setIsNewAdminModalOpen] = useState(false)
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false)
  const [degrees, setDegrees] = useState([])
  const [departments, setDepartments] = useState([])
  const [openAccordion, setOpenAccordion] = useState(null)

  const fetchContent = async () => {
    const jwtToken = sessionStorage.getItem('jwtToken')

    await axios
      .get('http://localhost:3000/api/content', {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      })
      .then((response) => {
        setDegrees(response.data.degrees)
        setDepartments(response.data.departments)
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
  const handleDepartmentModalOpen = () => {
    setIsDepartmentModalOpen(true)
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
                className='rounded-lg flex flex-col gap-5'
                allowToggle
                borderWidth={0}
                boxShadow={0}
                index={openAccordion}
                onChange={(index) => setOpenAccordion(index)}
              >
                <AccordionItem
                  className='rounded-lg bg-slate-50 dark:bg-slate-800'
                  borderWidth={0}
                >
                  <AccordionButton onClick={() => fetchContent()}>
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
                          <ListItem className='rounded-lg my-1' key={index}>
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
                <AccordionItem
                  style={{ borderBottomWidth: 0 }}
                  className='rounded-lg bg-slate-50 dark:bg-slate-800'
                  borderWidth={0}
                >
                  <AccordionButton onClick={() => fetchContent()}>
                    <Box
                      as='span'
                      flex='1'
                      className='font-bold'
                      textAlign='left'
                    >
                      Department
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                  <AccordionPanel pb={4}>
                    <Divider className='mb-3' />
                    <CButton1
                      onClick={handleDepartmentModalOpen}
                      title={'Update department'}
                    />
                    <List className='font-bold mt-3'>
                      {departments &&
                        departments.map((department, index) => (
                          <ListItem className='rounded-lg my-1' key={index}>
                            <div className='flex w-full'>
                              <ListIcon
                                as={MdCheckCircle}
                                className='mt-1'
                                color='green.500'
                              />
                              <div className='flex w-full justify-between items-center'>
                                {department.name}
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
        {isDepartmentModalOpen && (
          <UpdateDepartmentModal
            isOpen={true}
            onClose={() => setIsDepartmentModalOpen(false)}
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
