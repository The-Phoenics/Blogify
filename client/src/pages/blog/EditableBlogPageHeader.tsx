import { SiBloglovin } from 'react-icons/si'
import { useNavigate } from 'react-router'

const EditableBlogPostHeader = () => {
  const navigate = useNavigate()

  return (
    <div className='relative mb-6 flex w-full items-center justify-between border-b bg-white px-6 py-4 shadow-sm'>
      <a href={`${import.meta.env.VITE_SERVER_URL}/`}>
        <div className='flex items-center gap-1 text-gray-700'>
          <SiBloglovin className='mb-1' />
          <p className='font-bold'>Logify</p>
        </div>
      </a>
    </div>
  )
}

export default EditableBlogPostHeader
