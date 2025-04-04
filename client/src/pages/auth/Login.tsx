import { useContext, useRef, useState } from 'react'
import { SiBloglovin } from 'react-icons/si'
import { Link, useNavigate } from 'react-router'
import { validate } from 'email-validator'
import { Spinner } from '@/components/Spinner'
import { API_STATUS } from '../../types/types'
import { UserContext } from '@/context/UserContext'

export const Login = () => {
  const userContext = useContext(UserContext)
  let setUser = null
  if (userContext) {
    setUser = userContext.setUser()
  }
  const emailInputRef = useRef<HTMLInputElement | null>(null)
  const passwordInputRef = useRef<HTMLInputElement | null>(null)
  const [emailInputValid, setEmailInputValid] = useState<boolean>(true)
  const [passwordInputValid, setPasswordInputValid] = useState<boolean>(true)
  const [apiStatus, setApiStatus] = useState<API_STATUS>(API_STATUS.IDLE)

  const navigate = useNavigate()

  const validateInput = () => {
    const emailValue: string | undefined = emailInputRef?.current?.value
    const passwordValue: string | undefined = passwordInputRef.current?.value
    if (!emailValue || emailValue === '' || !validate(emailValue)) {
      setEmailInputValid(false)
      return false
    }
    if (!passwordValue || passwordValue === '') {
      setPasswordInputValid(false)
      return false
    }
    return true
  }

  const handleLogin = async () => {
    if (apiStatus === API_STATUS.WAITING || !validateInput()) {
      setApiStatus(API_STATUS.IDLE)
      return
    }
    setApiStatus(API_STATUS.WAITING)

    const emailValue: string | undefined = emailInputRef.current?.value
    const passwordValue: string | undefined = passwordInputRef.current?.value

    const response = await fetch(
      `${import.meta.env.VITE_SERVER_ADDRESS}${import.meta.env.VITE_SERVER_PORT}/auth/login`,
      {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          email: emailValue,
          password: passwordValue,
        }),
      }
    )
    const result = await response.json()
    if (!result || !result.success) {
      setApiStatus(API_STATUS.ERROR)
      setEmailInputValid(false)
      setPasswordInputValid(false)
      return
    }
    setApiStatus(API_STATUS.SUCCESS)
    if (setUser) {
      setUser({
        username: result.username,
        email: result.email,
      })
    }
    navigate('/feed')
  }

  return (
    <div className='mt-[20vh] flex h-full w-screen items-center justify-center'>
      <div className='flex flex-col justify-center p-4 font-[sans-serif]'>
        <div className='mx-auto w-full max-w-md rounded-2xl border border-gray-300 p-8'>
          <div className='mb-12 text-center'>
            <a href={`${import.meta.env.VITE_SERVER_ADDRESS}${import.meta.env.VITE_SERVER_PORT}/`}>
              <div className='flex w-full flex-row items-center justify-center gap-1 text-gray-700'>
                <SiBloglovin className='mb-1' />
                <p className='font-bolder'>Logify</p>
              </div>
            </a>
          </div>

          <form>
            <div className='space-y-6'>
              <div>
                <label className='mb-2 block text-sm text-gray-800'>Email Id</label>
                <input
                  ref={emailInputRef}
                  name='email'
                  type='text'
                  className={`border bg-white text-gray-800 ${emailInputValid ? 'border-gray-300' : 'border-red-500'} w-full rounded-md px-4 py-3 text-sm outline-blue-500`}
                  placeholder='Enter email'
                />
              </div>
              <div>
                <label className='mb-2 block text-sm text-gray-800'>Password</label>
                <input
                  ref={passwordInputRef}
                  name='password'
                  type='password'
                  className={`border bg-white text-gray-800 ${passwordInputValid ? 'border-gray-300' : 'border-red-500'} w-full rounded-md px-4 py-3 text-sm outline-blue-500`}
                  placeholder='Enter password'
                />
              </div>
            </div>

            <div className='!mt-8'>
              <button
                type='button'
                className='min-h-11 w-full rounded-md bg-blue-600 px-4 py-3 text-sm font-semibold tracking-wider text-white hover:bg-blue-700 focus:outline-none'
                onClick={handleLogin}
              >
                {apiStatus === API_STATUS.WAITING ? <Spinner /> : <span>Login</span>}
              </button>
            </div>
            <p className='mt-6 text-center text-sm text-gray-800'>
              Don't have an account?
              <Link className='ml-1 font-semibold text-blue-600 hover:underline' to='/signup'>
                Signup now
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}
