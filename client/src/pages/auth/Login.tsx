import { useRef, useState } from "react";
import { SiBloglovin } from "react-icons/si";
import { Link, useNavigate } from "react-router";
import { validate } from "email-validator";
import { Spinner } from "@/components/Spinner";
import { API_STATUS } from "../../types/types";

export const Login = () => {
    const emailInputRef = useRef<HTMLInputElement>(null)
    const passwordInputRef = useRef<HTMLInputElement>(null)
    const [emailInputValid, setEmailInputValid] = useState<boolean>(true)
    const [passwordInputValid, setPasswordInputValid] = useState<boolean>(true)
    const [apiStatus, setApiStatus] = useState<API_STATUS>(API_STATUS.IDLE)

    const navigate = useNavigate()

    const validateInput = () => {
        const emailValue: string | undefined = emailInputRef?.current?.value
        const passwordValue: string | undefined = passwordInputRef.current?.value
        if (!emailValue || emailValue === "" || !validate(emailValue)) {
            setEmailInputValid(false)
            return false;
        }
        if (!passwordValue || passwordValue === "") {
            setPasswordInputValid(false)
            return false;
        }
        return true;
    }

    const handleLogin = async () => {
        if (apiStatus === API_STATUS.WAITING || !validateInput()) {
            setApiStatus(API_STATUS.IDLE)
            return
        }
        setApiStatus(API_STATUS.WAITING)

        const emailValue: string | undefined = emailInputRef.current?.value
        const passwordValue: string | undefined = passwordInputRef.current?.value

        const response = await fetch(`${import.meta.env.VITE_SERVER_ADDRESS}${import.meta.env.VITE_SERVER_PORT}/auth/login`, {
            method: "POST",
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                email: emailValue,
                password: passwordValue
            }),
        });
        const result = await response.json();
        if (!result || !result.success) {
            setApiStatus(API_STATUS.ERROR)
            setEmailInputValid(false)
            setPasswordInputValid(false)
            return
        }
        setApiStatus(API_STATUS.SUCCESS)
        navigate("/feed")
    }

    return (
        <div className="w-screen h-full flex items-center justify-center mt-[20vh]">
            <div className="flex flex-col justify-center font-[sans-serif] p-4">
                <div className="max-w-md w-full mx-auto border border-gray-300 rounded-2xl p-8">
                    <div className="text-center mb-12">
                        <a href={`${import.meta.env.VITE_SERVER_ADDRESS}${import.meta.env.VITE_SERVER_PORT}/`}>
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
                                <input ref={passwordInputRef} name="password" type="password" className={`text-gray-800 bg-white border ${passwordInputValid ? "border-gray-300" : "border-red-500"} w-full text-sm px-4 py-3 rounded-md outline-blue-500`} placeholder="Enter password" />
                            </div>
                        </div>

                        <div className="!mt-8">
                            <button type="button" className="w-full py-3 px-4 min-h-11 text-sm tracking-wider font-semibold rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none" onClick={handleLogin}>
                                {apiStatus === API_STATUS.WAITING ? <Spinner /> : <span>Login</span>}
                            </button>
                        </div>
                        <p className="text-gray-800 text-sm mt-6 text-center">Don't have an account?<Link className="text-blue-600 font-semibold hover:underline ml-1" to="/signup">Signup now</Link></p>
                    </form>
                </div>
            </div>
        </div>
    )
}
