import { Center, Spinner } from '@chakra-ui/react'
import { brandColor } from './CustomDesign'

const Loading = ({ title }) => {
  return (
    <>
      <div className=' max-md:min-h-[700px] w-full'>
        <Center>
          <div className='flex justify-center mt-10  flex-col items-center'>
            <Spinner color={brandColor.first} thickness='4px' size={'lg'} />
            <p className='font-bold py-5 text-primary text-xl'>{title}</p>
          </div>
        </Center>
      </div>
    </>
  )
}

export default Loading
