import { useState } from 'react'
import MakeRequestModal from './Components/MakeRequestModal'

const RequestPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleOpen = () => {
    setIsModalOpen(true)
  }

  return (
    <>
      <div className='bg-slate-50 rounded-lg dark:bg-slate-800'>
        <div className='flex justify-center '>
          <div className='w-[100% p-10'>
            <p className='text-3xl font-bold text-center'>
              Make a request to the <span className='text-primary'>Admin</span>
            </p>
            <div className='grid grid-cols-1 gap-x-5 lg:grid-cols-2'></div>
          </div>
        </div>
        <button
          className=' py-2 w-[280px] font-bold rounded-lg dark:bg-slate-800 fixed bottom-[170px] left-[125px]'
          onClick={handleOpen}
        >
          Make a request
        </button>
        {isModalOpen && (
          <MakeRequestModal
            isOpen={isModalOpen}
            setOpen={() => setIsModalOpen(false)}
          />
        )}
      </div>
    </>
  )
}

export default RequestPage
