import { Box } from '@chakra-ui/react'

const CourseCard = ({ courses }) => {
  console.log(courses)
  return (
    <>
      <Box className='dark:bg-slate-900 bg-slate-200 mt-3' borderRadius={'2xl'}>
        <div className='p-6 m-1'>
          <p className='text-center text-2xl py-3 font-bold'>Courses</p>
          {courses.map((course, index) => (
            <div key={index} className='lg:px-14'>
              <Box className=' rounded-lg my-5 bg-slate-50 dark:bg-slate-800 px-7 py-3'>
                <div className='grid grid-cols-2 gap-y-3 text-xs lg:text-base font-bold'>
                  <p>Degree</p>
                  <p className='text-primary'>{course.degree}</p>
                  <p>Department</p>
                  <p className='text-primary'>{course.department}</p>
                  <p>Admission Year</p>
                  <p className='text-primary'>{course.admissionYear}</p>
                  <p>Completion Year</p>
                  <p className='text-primary'>{course.completionYear}</p>
                  <p>Roll Number</p>
                  <p className='text-primary'>{course.rollNumber}</p>
                  {course.cgpa && <p>CGPA</p>}
                  {course.cgpa && <p className='text-primary'>{course.cgpa}</p>}
                </div>
              </Box>
            </div>
          ))}
        </div>
      </Box>
    </>
  )
}

export default CourseCard
