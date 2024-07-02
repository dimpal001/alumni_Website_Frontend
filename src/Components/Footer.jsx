import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div>
      <div className='bg-slate-950 text-white flex justify-center items-center min-h-[80px]'>
        <div>
          <p>
            Design and developed by{' '}
            <Link className='text-primary'>Minor Project Team</Link>{' '}
          </p>
        </div>
      </div>
    </div>
  )
}

export default Footer
