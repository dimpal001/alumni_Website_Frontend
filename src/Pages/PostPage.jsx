import { Center } from '@chakra-ui/react'
import { useEffect } from 'react'

const PostPage = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
    document.title = 'Posts'
  }, [])
  return (
    <>
      <div className='min-h-[700px] lg:min-h-[500px] bg-slate-50 rounded-lg p-5 dark:bg-slate-800 lg:px-20'>
        <p className='text-center font-bold pb-3 text-3xl'>Announcements</p>
        <Center></Center>
      </div>
    </>
  )
}

export default PostPage
