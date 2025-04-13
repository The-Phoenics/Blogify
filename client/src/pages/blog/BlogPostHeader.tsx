import { SiBloglovin } from 'react-icons/si'
import { Spinner } from '@/components/Spinner'
import { BlogHeaderUserModel } from '@/components/Header'
import { API_STATUS, IBlog, IUser } from '@/types/types'
import { Link } from 'react-router'
import useUserAuth from '@/hooks/useUserAuth'

interface BlogPostHeaderProps {
  setBlogData: (blog: IBlog) => void,
  setBlogType: (val: string) => void,
  blogData: IBlog | undefined
  editing: boolean
  isOwner: boolean
  publishApiStatus: API_STATUS
  handlePreviewing?: () => void
  handlePublishing?: () => void
  handleEditing?: () => void
  handleBlogSave?: () => void
}

export const BlogPostHeader = ({
  blogData,
  editing,
  isOwner,
  handlePreviewing,
  handlePublishing,
  publishApiStatus,
  handleEditing,
  handleBlogSave,
}: BlogPostHeaderProps): React.JSX.Element => {
  const { isLoading, user }: { isLoading: boolean; user: IUser | null } = useUserAuth()

  const LoginSignupButtons = (): React.JSX.Element => {
    return (
      <>
        <div className='flex items-center gap-4'>
          <Link to='/login' className='rounded-md border px-4 py-2 text-sm'>
            Log in
          </Link>
          <Link to='/signup' className='rounded-md bg-blue-600 px-4 py-2 text-sm text-white'>
            Sign up
          </Link>
        </div>
      </>
    )
  }

  const SaveButtonHeader = () => {
    return (
      <button className='min-h-14 min-w-[140px] rounded-lg border p-2 px-6 py-3 shadow-sm' onClick={handleBlogSave}>
        Save
      </button>
    )
  }

  const PublishButtonHeader = () => {
    return (
      <button
        className='min-h-14 min-w-[140px] rounded-lg border bg-blue-600 p-2 px-6 py-3 text-white shadow-sm'
        onClick={handlePublishing}
      >
        {publishApiStatus === API_STATUS.WAITING ? <Spinner /> : 'Publish'}
      </button>
    )
  }

  const EditButtonHeader = () => {
    return (
      <button className='min-h-14 min-w-[100px] rounded-lg border p-2 px-6 py-3 shadow-sm' onClick={handleEditing}>
        Edit
      </button>
    )
  }

  const PreviewButtonHeader = () => {
    return (
      <button className='min-h-14 min-w-[140px] rounded-lg border p-2 px-6 py-3 shadow-sm' onClick={handlePreviewing}>
        Preview
      </button>
    )
  }

  let rightPortion: React.JSX.Element = <></>
  if (isOwner) {
    if (editing) {
      rightPortion = (
        <div className='flex gap-6'>
          <div className='flex gap-4'>
            <SaveButtonHeader />
            <PreviewButtonHeader />
            {blogData?.published ? <PublishButtonHeader /> : null}
          </div>
          <BlogHeaderUserModel />
        </div>
      )
    } else {
      rightPortion = (
        <div className='flex gap-6'>
          <div className='flex gap-4'>
            <SaveButtonHeader />
            <EditButtonHeader />
            {blogData?.published ? <PublishButtonHeader /> : null}
          </div>
          <BlogHeaderUserModel />
        </div>
      )
    }
  } else {
    rightPortion = <BlogHeaderUserModel />
  }

  return (
    <div className='relative mb-6 flex w-full items-center justify-between border-b bg-white px-6 py-4 shadow-sm'>
      <a href={`${import.meta.env.VITE_SERVER_ADDRESS}${import.meta.env.VITE_SERVER_PORT}/`}>
        <div className='flex items-center gap-1 text-gray-700'>
          <SiBloglovin className='mb-1' />
          <p className='font-bold'>Logify</p>
        </div>
      </a>

      {/* right section of the header for blog page */}
      {!isLoading && user ? rightPortion : <LoginSignupButtons />}
    </div>
  )
}
