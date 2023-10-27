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
      <Center className='min-h-[500px] bg-slate-50 rounded-lg p-5 dark:bg-slate-800 lg:px-20'></Center>
    </>
  )
}

export default PostPage
