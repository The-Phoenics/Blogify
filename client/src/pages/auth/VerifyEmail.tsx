import { SiBloglovin } from 'react-icons/si'
import { useRef } from 'react'

export const VerifyEmail = () => {
  const inputsRef = useRef<(HTMLInputElement | null)[]>([])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value
    if (value && index < inputsRef.current.length - 1) {
      inputsRef.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && !e.currentTarget.value && index > 0) {
      inputsRef.current[index - 1]?.focus()
    }
  }

  return (
    <div className='mt-[20vh] flex h-full w-screen items-center justify-center'>
      <div className='flex flex-col justify-center p-4 font-[sans-serif]'>
        <div className='mx-auto w-full max-w-md rounded-2xl border border-gray-300 p-8'>
          <div className='mb-12 text-center'>
            <a href={`${import.meta.env.VITE_SERVER_URL}/`}>
              <div className='flex w-full flex-row items-center justify-center gap-1 text-gray-700'>
                <SiBloglovin className='mb-1' />
                <p className='font-bolder'>Logify</p>
              </div>
            </a>
          </div>

          <form>
            <div className='space-y-6'>
              <div>
                <label className='mb-4 block text-sm text-gray-800'>Verification Code</label>
                <div className='flex justify-center gap-2'>
                  {[...Array(6)].map((_, index) => (
                    <input
                      key={index}
                      type='text'
                      maxLength={1}
                      className='w-12 rounded-md border border-gray-300 bg-white px-2 py-3 text-center text-xl text-gray-800 outline-blue-500'
                      onChange={e => handleInputChange(e, index)}
                      onKeyDown={e => handleKeyDown(e, index)}
                      ref={el => {
                        if (el) inputsRef.current[index] = el
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className='!mt-8'>
              <button
                type='button'
                className='w-full rounded-md bg-blue-600 px-4 py-3 text-sm font-semibold tracking-wider text-white hover:bg-blue-700 focus:outline-none'
              >
                Verify Email
              </button>
            </div>
            <p className='mt-6 text-center text-sm text-gray-800'>
              Didn’t receive a code?{' '}
              <a href='javascript:void(0);' className='ml-1 font-semibold text-blue-600 hover:underline'>
                Resend Code
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}
