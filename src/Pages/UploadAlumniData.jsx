import { useState } from 'react'
import axios from 'axios'
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useToast,
} from '@chakra-ui/react'
import { MdOutlineCloudUpload } from 'react-icons/md'
import * as XLSX from 'xlsx'
import { CButton1 } from './Components/CustomDesign'

const UploadAlumniData = ({ isOpen, onClose }) => {
  const [data, setData] = useState([])
  const [fileName, setFileName] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const toast = useToast()
  const expectedColumnNames = [
    'registrationNumber',
    'name',
    'degree',
    'department',
    'admissionYear',
    'completionYear',
    'rollNumber',
    'cgpa',
  ]

  const handleFileChange = (e) => {
    const file = e.target.files[0]

    if (file) {
      setFileName(file.name)
      const reader = new FileReader()
      reader.readAsBinaryString(file)
      reader.onload = (e) => {
        const data = e.target.result
        const workbook = XLSX.read(data, { type: 'binary' })
        const sheetName = workbook.SheetNames[0]
        const sheet = workbook.Sheets[sheetName]
        const parsedData = XLSX.utils.sheet_to_json(sheet)
        setData(parsedData)
      }
    }
  }

  const handleUpload = () => {
    if (!data.length) {
      toast({
        title: 'No file selected!',
        status: 'error',
        isClosable: true,
        duration: 2500,
        position: 'top',
      })
      return
    }
    const firstRow = data[0]
    const isValidColumns = expectedColumnNames.every((expectedColumnName) =>
      Object.keys(firstRow).includes(expectedColumnName)
    )

    if (!isValidColumns) {
      toast({
        title: 'Invalid column names!',
        description:
          'Please make sure the Excel file has the correct column names.',
        status: 'error',
        isClosable: true,
        duration: 2500,
        position: 'top',
      })
      return
    }

    setIsLoading(true)
    axios
      .post('http://localhost:3000/api/alumniData/upload-excel', {
        jsonData: data,
      })
      .then(() => {
        toast({
          title: 'Data has been updated.',
          status: 'success',
          isClosable: true,
          duration: 2500,
          position: 'top',
        })
        onClose()
      })
      .catch(() => {
        toast({
          title: 'Error uploading file.',
          status: 'error',
          isClosable: true,
          duration: 2500,
          position: 'top',
        })
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  return (
    <div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent className='dark:bg-slate-900 dark:text-white'>
          <ModalHeader>Upload Alumni Data</ModalHeader>
          <ModalCloseButton />
          <ModalBody className='flex mt-5 items-center w-full flex-col'>
            <div>
              <input
                className='hidden'
                id='file'
                type='file'
                accept='.xlsx, .xls'
                onChange={handleFileChange}
              />
              <label
                id='file-label'
                htmlFor='file'
                className='border-dashed cursor-pointer font-bold border-primary rounded-lg border-2 p-6'
              >
                {fileName ? `File Selected : ${fileName}` : 'Upload Excel file'}
              </label>
            </div>

            <div className='mt-7'>
              <i>
                Upload your <span className='text-primary'>excel</span> file.
              </i>
            </div>
          </ModalBody>

          <ModalFooter>
            <CButton1
              title={'Upload'}
              onClick={handleUpload}
              isLoading={isLoading}
              loadingText='Uploading...'
              leftIcon={<MdOutlineCloudUpload size={20} />}
            />
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}

export default UploadAlumniData
