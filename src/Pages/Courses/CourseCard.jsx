import { Box } from '@chakra-ui/react'
import { CButton1 } from '../Components/CustomDesign'
import { IoMdAddCircle } from 'react-icons/io'
import { useEffect, useState } from 'react'
import MakeRequestModal from '../Components/MakeRequestModal'
import axios from 'axios'

const CourseCard = () => {
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false)
  const handleModalOpen = () => {
    setIsRequestModalOpen(true)
  }

  const [courses, setCourses] = useState([])

  const fetchCourses = async () => {
    const jwtToken = sessionStorage.getItem('jwtToken')
    await axios
      .get('http://localhost:3000/api/auth/courses', {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      })
      .then((response) => {
        setCourses(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  useEffect(() => {
    fetchCourses()
  }, [])

  const handleFetch = () => {
    fetchCourses()
  }

  return (
    <>
      <Box className='dark:bg-slate-900 bg-slate-200 mt-3' borderRadius={'2xl'}>
        <div className='p-3 m-1'>
          <p className='text-center text-2xl py-3 font-bold'>Courses</p>
          <div className='flex justify-center'>
            <CButton1
              onClick={handleModalOpen}
              leftIcon={<IoMdAddCircle size={20} />}
              title={'Add more degree'}
            />
          </div>
          <div className='grid grid-cols-1 lg:grid-cols-2'>
            {courses.map((course, index) => (
              <div key={index} className='lg:px-5'>
                <Box className=' rounded-lg my-5 bg-slate-50 dark:bg-slate-800 px-3 py-3'>
                  <div className='grid grid-cols-2 gap-y-2 text-[1px] lg:text-base font-bold'>
                    <p className='text-[13px]'>Registration Number</p>
                    <p className='text-primary text-[13px]'>
                      {course.registrationNumber && course.registrationNumber}
                    </p>
                    <p className='text-[13px]'>Degree</p>
                    <p className='text-primary text-[13px]'>{course.degree}</p>
                    <p className='text-[13px]'>Department</p>
                    <p className='text-primary text-[13px]'>
                      {course.department}
                    </p>
                    <p className='text-[13px]'>Admission Year</p>
                    <p className='text-primary text-[13px]'>
                      {course.admissionYear}
                    </p>
                    <p className='text-[13px]'>Completion Year</p>
                    <p className='text-primary text-[13px]'>
                      {course.completionYear}
                    </p>
                    <p className='text-[13px]'>Roll Number</p>
                    <p className='text-primary text-[13px]'>
                      {course.rollNumber}
                    </p>
                    <p className='text-[13px]'>CGPA</p>
                    <p className='text-primary text-[13px]'>{course.cgpa}</p>
                  </div>
                </Box>
              </div>
            ))}
          </div>
        </div>
      </Box>
      {isRequestModalOpen && (
        <MakeRequestModal
          title={'addMore'}
          isOpen={true}
          setOpen={() => setIsRequestModalOpen(false)}
          fetchCourse={handleFetch}
        />
      )}
    </>
  )
}

export default CourseCard
