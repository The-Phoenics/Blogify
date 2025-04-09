import { Link, useNavigate } from 'react-router'
import { Search, ChevronRight, BookOpen } from 'lucide-react'
import useUserAuth from '@/hooks/useUserAuth'
import { Spinner } from '@/components/Spinner'
import { IUser } from '@/types/types'

export const Home = () => {
  const { isLoading, user }: { isLoading: boolean; user: IUser | null } = useUserAuth()
  const navigate = useNavigate()
  if (!isLoading && user) {
    navigate('/feed')
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <div className='flex min-h-screen flex-col'>
      {/* Header */}
      <header className='sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur'>
        <div className='flex h-16 items-center justify-between px-4 md:px-6'>
          <div className='flex items-center gap-2'>
            <BookOpen className='h-6 w-6' />
            <span className='text-xl font-bold'>Blogify</span>
          </div>
          <nav className='hidden gap-6 md:flex'>
            <Link to='/' className='hover:text-primary text-sm font-medium'>
              Home
            </Link>
            <Link to='/feed' className='hover:text-primary text-sm font-medium text-gray-500'>
              Explore
            </Link>
            <Link to='#' className='hover:text-primary text-sm font-medium text-gray-500'>
              About
            </Link>
            <Link to='#' className='hover:text-primary text-sm font-medium text-gray-500'>
              Contact
            </Link>
          </nav>
          <div className='flex items-center gap-4'>
            <div className='relative hidden md:flex'>
              <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-gray-400' />
              <input type='search' placeholder='Search...' className='w-[200px] rounded-md border px-2 py-1 pl-8' />
            </div>
            <Link to='/login' className='rounded-md border px-4 py-2 text-sm'>
              Log in
            </Link>
            <Link to='/signup' className='rounded-md bg-blue-600 px-4 py-2 text-sm text-white'>
              Sign up
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className='relative flex h-full w-full flex-1 items-center justify-center bg-gray-100 bg-transparent text-white'>
        <section className='mb-10 w-full'>
          <div className='px-4 text-center md:px-6'>
            <h1 className='text-4xl font-bold'>Share Your Stories with the World</h1>
            <p className='mt-2'>Join our community of writers and readers today.</p>
            <div className='mt-4 flex flex-col justify-center gap-4 sm:flex-row'>
              <Link to='/signup' className='rounded-md bg-blue-600 px-6 py-3 text-white shadow-md'>
                Get Started
              </Link>
              <Link to='/feed' className='flex items-center rounded-md border px-6 py-3 shadow-md'>
                Explore Blogs <ChevronRight className='ml-1 h-4 w-4' />
              </Link>
            </div>
          </div>
        </section>
        <div className='absolute left-0 top-0 z-[-1] h-full w-full object-cover blur-sm'>
          <img src='/backgroundimg.jpg' className='h-full w-full object-cover' />
        </div>
      </main>
    </div>
  )
}
