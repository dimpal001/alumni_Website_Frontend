import { Spinner } from '@chakra-ui/react'
import { brandColor } from './CustomDesigns'

const Loading = ({ title }) => {
  return (
    <>
      <div className='w-full p-20 flex justify-center'>
        <div className='flex items-center'>
          <Spinner
            size={'xl'}
            speed='0.50s'
            thickness='5px'
            color={brandColor.primary}
          />
          <p className='ml-5 text-lg'>{title}</p>
        </div>
      </div>
    </>
  )
}

export default Loading
