import { useRef, useState } from 'react'
import { SiBloglovin } from 'react-icons/si'
import { Link } from 'react-router'
import { validate } from 'email-validator'
import { Spinner } from '@/components/Spinner'
import { API_STATUS } from '@/types/types'

export const EmailSentMessageInfo = () => {
  return (
    <div className='mt-[20vh] flex h-full w-screen items-center justify-center'>
      <div className='flex flex-col justify-center rounded-md border p-6 px-8 font-[sans-serif]'>
        <h1 className='text-xl font-medium'>
          Check your email to verify your account!
        </h1>
        <h1 className='mt-2'>
          Please{' '}
          <Link
            style={{ textDecoration: 'underline', color: 'blue' }}
            to='/login'
          >
            login here
          </Link>{' '}
          after verifying your account.
        </h1>
      </div>
    </div>
  )
}

export const Signup = () => {
  const [emailInputValid, setEmailInputValid] = useState<boolean>(true)
  const [passwordMatching, setPasswordMatching] = useState<boolean>(true)
  const [apiStatus, setApiStatus] = useState<API_STATUS>(API_STATUS.IDLE)

  const emailInputRef = useRef<HTMLInputElement>(null)
  const passwordInputRef = useRef<HTMLInputElement>(null)
  const confirmPasswordInputRef = useRef<HTMLInputElement>(null)

  const isInputValid = (): boolean => {
    const emailValue: string | undefined = emailInputRef.current?.value
    const passwordValue: string | undefined = passwordInputRef.current?.value
    const confirmPassValue: string | undefined =
      confirmPasswordInputRef.current?.value

    if (!emailValue || emailValue === '' || !validate(emailValue)) {
      setEmailInputValid(false)
      return false
    } else {
      setEmailInputValid(true)
    }
    if (
      !passwordValue ||
      passwordValue !== confirmPassValue ||
      passwordValue === ''
    ) {
      setPasswordMatching(false)
      return false
    } else {
      setPasswordMatching(true)
    }
    return true
  }

  const sendSignUpRequest = async () => {
    const emailValue = emailInputRef.current?.value
    const passwordValue = passwordInputRef.current?.value
    setApiStatus(API_STATUS.WAITING)

    const response = await fetch(
      `${import.meta.env.VITE_SERVER_ADDRESS}${import.meta.env.VITE_SERVER_PORT}/auth/signup`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: emailValue,
          password: passwordValue,
        }),
      }
    )
    const result = await response.json()
    if (result.success === true) {
      setApiStatus(API_STATUS.SUCCESS)
    } else {
      setApiStatus(API_STATUS.ERROR)
    }
  }

  // Handle signup form submission on sign up click
  const handleSignup = async () => {
    if (apiStatus !== API_STATUS.WAITING && isInputValid()) {
      await sendSignUpRequest()
    }
  }

  if (apiStatus === API_STATUS.ERROR) return <div>Failed to signup!</div>

  if (apiStatus === API_STATUS.SUCCESS) return <EmailSentMessageInfo />

  return (
    <div className='mt-[20vh] flex h-full w-screen items-center justify-center'>
      <div className='flex flex-col justify-center p-4 font-[sans-serif]'>
        <div className='mx-auto w-full max-w-md rounded-2xl border border-gray-300 p-8'>
          <div className='mb-12 text-center'>
            <a
              href={`${import.meta.env.VITE_SERVER_ADDRESS}${import.meta.env.VITE_SERVER_PORT}/`}
            >
              <div className='flex w-full flex-row items-center justify-center gap-1 text-gray-700'>
                <SiBloglovin className='mb-1' />
                <p className='font-bolder'>Logify</p>
              </div>
            </a>
          </div>

          <form>
            <div className='space-y-6'>
              <div>
                <label className='mb-2 block text-sm text-gray-800'>
                  Email Id
                </label>
                <input
                  ref={emailInputRef}
                  name='email'
                  type='text'
                  className={`border bg-white text-gray-800 ${emailInputValid ? 'border-gray-300' : 'border-red-500'} w-full rounded-md px-4 py-3 text-sm outline-blue-500`}
                  placeholder='Enter email'
                />
              </div>
              <div>
                <label className='mb-2 block text-sm text-gray-800'>
                  Password
                </label>
                <input
                  ref={passwordInputRef}
                  name='password'
                  type='password'
                  className={`border bg-white text-gray-800 ${passwordMatching ? 'border-gray-300' : 'border-red-500'} w-full rounded-md px-4 py-3 text-sm outline-blue-500`}
                  placeholder='Enter password'
                />
              </div>
              <div>
                <label className='mb-2 block text-sm text-gray-800'>
                  Confirm Password
                </label>
                <input
                  ref={confirmPasswordInputRef}
                  name='cpassword'
                  type='password'
                  className={`border bg-white text-gray-800 ${passwordMatching ? 'border-gray-300' : 'border-red-500'} w-full rounded-md px-4 py-3 text-sm outline-blue-500`}
                  placeholder='Enter confirm password'
                />
              </div>

              <div className='flex items-center'>
                <input
                  id='remember-me'
                  name='remember-me'
                  type='checkbox'
                  className='h-4 w-4 shrink-0 rounded border-gray-300 text-blue-600 focus:ring-blue-500'
                />
                <label className='ml-3 block text-sm text-gray-800'>
                  I accept the{' '}
                  <a
                    href='javascript:void(0);'
                    className='ml-1 font-semibold text-blue-600 hover:underline'
                  >
                    Terms and Conditions
                  </a>
                </label>
              </div>
            </div>

            <div className='!mt-8'>
              <button
                type='button'
                className='min-h-11 w-full rounded-md bg-blue-600 px-4 py-3 text-sm font-semibold tracking-wider text-white hover:bg-blue-700 focus:outline-none'
                onClick={handleSignup}
              >
                {apiStatus === API_STATUS.WAITING ? (
                  <Spinner />
                ) : (
                  <span>Create an account</span>
                )}
              </button>
            </div>
            <p className='mt-6 text-center text-sm text-gray-800'>
              Already have an account?{' '}
              <Link
                className='ml-1 font-semibold text-blue-600 hover:underline'
                to='/login'
              >
                Login here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}
