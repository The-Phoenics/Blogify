import { useRef, useState } from "react";
import { SiBloglovin } from "react-icons/si";
import { Link } from "react-router";
import { validate } from "email-validator"
import { Spinner } from "@/components/Spinner";

export const EmailSentMessageInfo = () => {
    return (
        <div className="w-screen h-full flex items-center justify-center mt-[20vh]">
            <div className="flex flex-col justify-center font-[sans-serif] p-6 px-8 border rounded-md">
                <h1 className="font-medium text-xl">Check your email to verify your account!</h1>
                <h1 className="mt-2">Please <Link style={{ textDecoration: 'underline', color: 'blue' }} to="/login">login here</Link> after verifying your account.</h1>
            </div>
        </div>
    )
}

export const Signup = () => {
    enum API_STATUS {
        NOTSENT = 0, WAITING, DONE
    }

    const [emailInputValid, setEmailInputValid] = useState<boolean>(true)
    const [passwordMatching, setPasswordMatching] = useState<boolean>(true)
    const [apiStatus, setApiStatus] = useState<API_STATUS>(API_STATUS.NOTSENT)

    const emailInputRef = useRef<HTMLInputElement>(null)
    const passwordInputRef = useRef<HTMLInputElement>(null)
    const confirmPasswordInputRef = useRef<HTMLInputElement>(null)

    const isInputValid = (): boolean => {
        const emailValue = emailInputRef.current?.value
        const passwordValue = passwordInputRef.current?.value
        const confirmPassValue = confirmPasswordInputRef.current?.value

        if (!emailValue || emailValue === "" || !validate(emailValue)) {
            setEmailInputValid(false)
            return false
        } else {
            setEmailInputValid(true)
        }
        if (!passwordValue || passwordValue !== confirmPassValue || passwordValue === "") {
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
        const response = await fetch("http://localhost:4000/auth/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: emailValue,
                password: passwordValue
            }),
        });
        const result = await response.json();
        if (result.success == true) {
            setApiStatus(API_STATUS.DONE)
        } else {
            console.log(result.message)
        }
    }

    // Handle signup form submission on sign up click
    const handleSignup = async () => {
        if (isInputValid() && apiStatus !== API_STATUS.WAITING) {
            await sendSignUpRequest()
        }
    }

    if (apiStatus === API_STATUS.DONE)
        return <EmailSentMessageInfo />

    return (
        <div className="w-screen h-full flex items-center justify-center mt-[20vh]">
            <div className="flex flex-col justify-center font-[sans-serif] p-4">
                <div className="max-w-md w-full mx-auto border border-gray-300 rounded-2xl p-8">
                    <div className="text-center mb-12">
                        <a href="http://localhost:4000">
                            <div className="flex justify-center items-center flex-row w-full gap-1 text-gray-700">
                                <SiBloglovin className='mb-1' />
                                <p className="font-bolder">Logify</p>
                            </div>
                        </a>
                    </div>

                    <form>
                        <div className="space-y-6">
                            <div>
                                <label className="text-gray-800 text-sm mb-2 block">Email Id</label>
                                <input ref={emailInputRef} name="email" type="text" className={`text-gray-800 bg-white border ${emailInputValid ? "border-gray-300" : "border-red-500"} w-full text-sm px-4 py-3 rounded-md outline-blue-500`} placeholder="Enter email" />
                            </div>
                            <div>
                                <label className="text-gray-800 text-sm mb-2 block">Password</label>
                                <input ref={passwordInputRef} name="password" type="password" className={`text-gray-800 bg-white border ${passwordMatching ? "border-gray-300" : "border-red-500"} w-full text-sm px-4 py-3 rounded-md outline-blue-500`} placeholder="Enter password" />
                            </div>
                            <div>
                                <label className="text-gray-800 text-sm mb-2 block">Confirm Password</label>
                                <input ref={confirmPasswordInputRef} name="cpassword" type="password" className={`text-gray-800 bg-white border ${passwordMatching ? "border-gray-300" : "border-red-500"} w-full text-sm px-4 py-3 rounded-md outline-blue-500`} placeholder="Enter confirm password" />
                            </div>

                            <div className="flex items-center">
                                <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                                <label className="text-gray-800 ml-3 block text-sm">
                                    I accept the <a href="javascript:void(0);" className="text-blue-600 font-semibold hover:underline ml-1">Terms and Conditions</a>
                                </label>
                            </div>
                        </div>

                        <div className="!mt-8">
                            <button type="button" className="w-full min-h-11 py-3 px-4 text-sm tracking-wider font-semibold rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none" onClick={handleSignup}>
                                {apiStatus === API_STATUS.WAITING ? <Spinner /> : <span>Create an account</span>}
                            </button>
                        </div>
                        <p className="text-gray-800 text-sm mt-6 text-center">Already have an account? <Link className="text-blue-600 font-semibold hover:underline ml-1" to="/login">Login here</Link></p>
                    </form>
                </div>
            </div>
        </div>
    )
}