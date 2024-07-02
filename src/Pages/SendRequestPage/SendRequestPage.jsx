import { FormControl, FormLabel, Select } from '@chakra-ui/react'
import { CButton, CInput } from '../../Components/CustomDesigns'
import { FiSend } from 'react-icons/fi'
import { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { api } from '../../Components/API'
import toast from 'react-hot-toast'
import { UserContext } from '../../UserContext'
import { useNavigate } from 'react-router-dom'

const SendRequestPage = () => {
  const navigate = useNavigate()
  const { user } = useContext(UserContext)
  const [degrees, setDegrees] = useState([])
  const [departments, setDepartments] = useState([])
  const [formData, setFormData] = useState({
    name: '',
    profession: '',
    organisation: '',
    workingFrom: '',
    address: '',
    degree: '',
    registrationNo: '',
    department: '',
    admissionYear: '',
    completionYear: '',
    rollNo: '',
    cgpa: '',
    email: '',
    mobileNo: '',
    gender: '',
  })

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const token = sessionStorage.getItem('token')

  const fetchDegreeDept = () => {
    axios
      .get(`${api}/api/degree-department`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setDegrees(response.data.degrees)
        setDepartments(response.data.departments)
      })
      .catch((error) => {
        console.error(error)
      })
  }

  useEffect(() => {
    fetchDegreeDept()
  }, [])

  const handleSubmit = () => {
    console.log(formData)
    const {
      name,
      profession,
      organisation,
      workingFrom,
      address,
      degree,
      registrationNo,
      department,
      admissionYear,
      completionYear,
      rollNo,
      cgpa,
      email,
      mobileNo,
      gender,
    } = formData

    if (name === '') {
      toast.error('Name should not be empty!')
      return
    }

    if (degree === '') {
      toast.error('Select a valid degree name!')
      return
    }

    if (department === '') {
      toast.error('Select a valid department name!')
      return
    }

    if (rollNo === '') {
      toast.error('Roll number should not be empty!')
      return
    }

    if (registrationNo === '') {
      toast.error('Registration number should not be empty!')
      return
    }

    if (cgpa === '') {
      toast.error('CGPA should not be empty!')
      return
    }

    if (address === '') {
      toast.error('Address should not be empty!')
      return
    }

    if (admissionYear === '') {
      toast.error('Admission Year should not be empty!')
      return
    }

    if (completionYear === '') {
      toast.error('Completion Year should not be empty!')
      return
    }

    if (!/^\d{10}$/.test(formData.mobileNo)) {
      toast.error('Mobile number should be numeric and 10 characters long')
      return
    }

    if (
      !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/.test(formData.email)
    ) {
      toast.error('Enter a valid email address')
      return
    }

    if (!/^\d+$/.test(formData.registrationNo)) {
      toast.error('Registration number should be numeric only')
      return
    }

    if (formData.admissionYear >= formData.completionYear) {
      toast.error('Admission year should be less than completion year')
      return
    }

    const currentYear = new Date().getFullYear()
    if (formData.admissionYear < 1975 || formData.admissionYear > currentYear) {
      toast.error('Admission year should be between 1975 and current year')
      return
    }

    if (formData.workingFrom > currentYear) {
      toast.error('Enter a valid year (Working from)')
      return
    }

    if (
      formData.completionYear <= formData.admissionYear ||
      formData.completionYear > currentYear - 1
    ) {
      toast.error(
        'Completion year should be greater than admission year and less than or equal to the last year'
      )
      return
    }

    if (
      !/^\d+(\.\d+)?$/.test(formData.cgpa) ||
      formData.cgpa < 5 ||
      formData.cgpa > 10
    ) {
      toast.error('CGPA should be a numeric value between 5 and 10')
      return
    }

    axios
      .post(
        `${api}/api/alumni-request/${user._id}`,
        {
          name,
          profession,
          organisation,
          workingFrom,
          address,
          degree,
          registrationNo,
          department,
          admissionYear,
          completionYear,
          rollNo,
          cgpa,
          email,
          mobileNo,
          gender,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data) // Handle success response
        toast.success('Request submitted successfully!')
        navigate('/my-requests')
      })
      .catch((error) => {
        console.error(error)
        toast.error('Failed to submit request. Please try again.')
      })
  }

  useEffect(() => {
    scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }, [])

  return (
    <>
      <div className='w-full container max-sm:px-3 py-5 px-5 lg:px-36 min-h-[700px] lg:min-h-[580px]'>
        <div className='bg-white dark:bg-slate-950 lg:px-16 p-5 rounded-lg'>
          <p className='text-2xl lg:text-3xl font-bold text-center'>
            Send a request
          </p>
          <div className='mt-4 lg:px-10'>
            <div className='lg:grid grid-cols-2 capitalize gap-y-5 gap-x-24'>
              <CInput
                star={true}
                label={'Full name'}
                name={'name'}
                onChange={handleInputChange}
                placeholder={'Full name'}
              />
              <FormControl className='py-2'>
                <FormLabel>
                  <div className='flex gap-x-1'>
                    <p>Branch</p>
                    <p className='text-error'>*</p>
                  </div>
                </FormLabel>
                <Select
                  name={'department'}
                  className='capitalize'
                  onChange={handleInputChange}
                >
                  <option value=''>Select a department</option>
                  {departments &&
                    departments.map((department, index) => (
                      <option key={index} value={department.name}>
                        <span className='capitalize'>{department.name}</span>
                      </option>
                    ))}
                </Select>
              </FormControl>
              <FormControl className='py-2'>
                <FormLabel>
                  <div className='flex gap-x-1'>
                    <p>Degree</p>
                    <p className='text-error'>*</p>
                  </div>
                </FormLabel>
                <Select
                  name={'degree'}
                  className='capitalize'
                  onChange={handleInputChange}
                >
                  <option value=''>Select a degree</option>
                  {degrees &&
                    degrees.map((degree, index) => (
                      <option key={index} value={degree.name}>
                        <span className='capitalize'>{degree.name}</span>
                      </option>
                    ))}
                </Select>
              </FormControl>
              <FormControl className='py-2'>
                <FormLabel>
                  <div className='flex gap-x-1'>
                    <p>Gender</p>
                    <p className='text-error'>*</p>
                  </div>
                </FormLabel>
                <Select
                  name={'gender'}
                  className='capitalize'
                  onChange={handleInputChange}
                >
                  <option value=''>Select gender</option>
                  <option value='male'>Male</option>
                  <option value='female'>Female</option>
                  <option value='other'>Other</option>
                </Select>
              </FormControl>
              <CInput
                star={true}
                label={'Mobile Number'}
                name={'mobileNo'}
                onChange={handleInputChange}
                placeholder={'Mobile Number'}
              />
              <CInput
                star={true}
                label={'Email Address'}
                name={'email'}
                onChange={handleInputChange}
                placeholder={'Email Address'}
              />
              <CInput
                star={true}
                label={'Registration Number'}
                name={'registrationNo'}
                onChange={handleInputChange}
                placeholder={'Registration Number'}
              />
              <CInput
                star={true}
                label={'Admission Year'}
                name={'admissionYear'}
                onChange={handleInputChange}
                placeholder={'Admission year'}
              />
              <CInput
                star={true}
                name={'completionYear'}
                onChange={handleInputChange}
                label={'Completion Year'}
                placeholder={'Completion year'}
              />
              <CInput
                star={true}
                label={'Roll Number'}
                name={'rollNo'}
                onChange={handleInputChange}
                placeholder={'Roll number'}
              />
              <CInput
                star={true}
                label={'CGPA'}
                name={'cgpa'}
                onChange={handleInputChange}
                placeholder={'CGPA'}
              />
              <CInput
                name={'profession'}
                onChange={handleInputChange}
                label={'Current Profession'}
                placeholder={'Current profession'}
              />
              <CInput
                name={'organisation'}
                onChange={handleInputChange}
                label={'Organisation'}
                placeholder={'Organisation'}
              />
              <CInput
                name={'workingFrom'}
                onChange={handleInputChange}
                label={'Working from'}
                placeholder={'Working from'}
              />
              <CInput
                star={true}
                name={'address'}
                onChange={handleInputChange}
                label={'Current address'}
                placeholder={'Current address'}
              />
            </div>
          </div>
          <div className='lg:px-10 mt-7 mb-5'>
            <CButton
              onClick={handleSubmit}
              rightIcon={<FiSend />}
              width={'100%'}
              title={'Send request'}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default SendRequestPage
