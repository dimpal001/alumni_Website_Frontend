import { useEffect, useState } from 'react'
import { CButton } from '../../Components/CustomDesigns'
import { api } from '../../Components/API'
import axios from 'axios'
import toast from 'react-hot-toast'
import Img from '../../assets/user.png'

const AdvancedSearchPage = () => {
  const [departments, setDepartments] = useState([])
  const [years, setYears] = useState([])
  const [alumnies, setAlumnies] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [selectedSearchType, setSelectedSearchType] = useState('')
  const [selectedDepartment, setSelectedDepartment] = useState('')
  const [selectedBatch, setSelectedBatch] = useState('')

  const fetchDegreeDept = async () => {
    const token = sessionStorage.getItem('token')
    await axios
      .get(`${api}/api/degree-department`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setDepartments(response.data.departments)
      })
      .catch((error) => {
        console.error(error)
      })
  }

  useEffect(() => {
    scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }, [])

  useEffect(() => {
    fetchDegreeDept()

    // Generate years from 1990 to the current year
    const currentYear = new Date().getFullYear()
    const yearsArray = Array.from(
      { length: currentYear - 1975 },
      (_, index) => 1976 + index
    )
    setYears(yearsArray)
  }, [])

  const handleSearch = () => {
    if (selectedSearchType === '') {
      toast.error('Select a search type')
      return
    }
    if (selectedBatch === '') {
      toast.error('Select a Batch')
      return
    }
    if (selectedDepartment === '') {
      toast.error('Select a Department')
      return
    }

    setIsLoading(true)

    const token = sessionStorage.getItem('token')

    axios
      .get(
        `${api}/api/profile/find-by-batch-department/${selectedBatch}/${selectedDepartment}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data.alumni)
        setAlumnies(response.data.alumni)
      })
      .catch((error) => {
        toast.error(error.response.data.message)
        setAlumnies([])
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  return (
    <>
      <div className='w-full container max-sm:px-5 p-5 min-h-[700px] lg:min-h-[580px]'>
        <div className='container my-5'>
          <div className='lg:flex gap-x-5'>
            <div
              data-aos='fade-right'
              className='flex flex-col lg:w-[20%] gap-2 '
            >
              <select
                className='px-3 py-1 dark:bg-slate-950 rounded-md font-bold'
                value={selectedSearchType}
                onChange={(e) => {
                  setSelectedSearchType(e.target.value)
                  setSelectedBatch('')
                  setSelectedDepartment('')
                }}
              >
                <option value=''>Select Search Type</option>
                <option value='batch'>Search by Batch</option>
                <option value='department'>Search by Department</option>
              </select>

              {(selectedSearchType === 'batch' ||
                selectedSearchType === 'department') && (
                <>
                  {selectedSearchType === 'department' ? (
                    <select
                      className='px-3 py-1 dark:bg-slate-950 capitalize rounded-md font-bold'
                      value={selectedDepartment}
                      onChange={(e) => {
                        setSelectedDepartment(e.target.value)
                        setSelectedBatch('')
                      }}
                    >
                      <option value=''>Select a Department</option>
                      {departments.map((item, index) => (
                        <option key={index} value={item.name}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <select
                      className='px-3 py-1 dark:bg-slate-950 rounded-md font-bold'
                      value={selectedBatch}
                      onChange={(e) => {
                        setSelectedBatch(e.target.value)
                        setSelectedDepartment('')
                      }}
                    >
                      <option value=''>Select a Batch</option>
                      {years.map((year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                    </select>
                  )}

                  {selectedSearchType === 'department' &&
                    selectedDepartment && (
                      <select
                        className='px-3 py-1 dark:bg-slate-950 capitalize rounded-md font-bold'
                        value={selectedBatch}
                        onChange={(e) => setSelectedBatch(e.target.value)}
                      >
                        <option value=''>Select a Batch</option>
                        {years.map((year) => (
                          <option key={year} value={year}>
                            {year}
                          </option>
                        ))}
                      </select>
                    )}

                  {selectedSearchType === 'batch' && selectedBatch && (
                    <select
                      className='px-3 dark:bg-slate-950 capitalize py-1 rounded-md font-bold'
                      value={selectedDepartment}
                      onChange={(e) => setSelectedDepartment(e.target.value)}
                    >
                      <option value=''>Select a Department</option>
                      {departments.map((item, index) => (
                        <option key={index} value={item.name}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                  )}
                </>
              )}

              <CButton
                title={'Search'}
                isLoading={isLoading}
                loadingText={'Searching...'}
                onClick={handleSearch}
              />
            </div>
            <div data-aos='fade-left' className='lg:w-[80%] '>
              <p className='text-2xl max-sm:mt-3 lg:text-3xl mb-2 font-bold text-center'>
                Advanced Search
              </p>
              {alumnies && alumnies.length > 0 && (
                <p className='text-center mb-3 text-lg'>
                  Filtered data :{' '}
                  <span className='text-primary font-bold'>
                    {selectedBatch}
                  </span>{' '}
                  batch of{' '}
                  <span className='capitalize text-primary font-bold'>
                    {selectedDepartment}
                  </span>{' '}
                  department
                </p>
              )}
              {alumnies && alumnies.length === 0 && (
                <p className='text-center text-lg'>
                  No matching alumni found for the given batch and department
                </p>
              )}
              <div className='lg:flex flex-wrap justify-center'>
                {alumnies &&
                  alumnies.map((item, index) => (
                    <div key={index} className='lg:w-[25%]'>
                      <AlumniCard
                        alumni={item}
                        demo={Img}
                        onClick={() =>
                          window.open(`/profile/${item.user}`, '_blank')
                        }
                      />
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

const AlumniCard = ({ alumni, demo, onClick }) => {
  return (
    <div className='lg:px-5 px-10 max-sm:py-3'>
      <div
        onClick={onClick}
        className='bg-white cursor-pointer rounded-md hover:shadow-2xl transition-all delay-[0.03s] dark:bg-slate-950 p-5'
      >
        <div className='flex justify-center'>
          <img className='rounded-md h-[160px]' src={demo} alt='' />
        </div>
        <p className='font-bold text-3xl lg:text-xl mt-2 text-primary'>
          {alumni.name}
        </p>
        <p className='font-bold'>
          Dept :{' '}
          <span className='capitalize'>
            {alumni.academicDetails[0].department}
          </span>
        </p>
        <p className='font-bold'>
          Batch : {alumni.academicDetails[0].admissionYear}
        </p>
      </div>
    </div>
  )
}

export default AdvancedSearchPage
