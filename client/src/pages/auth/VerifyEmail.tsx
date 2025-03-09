import { SiBloglovin } from "react-icons/si";
import { useRef } from "react";

export const VerifyEmail = () => {
    const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const value = e.target.value;
        if (value && index < inputsRef.current.length - 1) {
            inputsRef.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === "Backspace" && !e.currentTarget.value && index > 0) {
            inputsRef.current[index - 1]?.focus();
        }
    };

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
                                <label className="text-gray-800 text-sm mb-4 block">Verification Code</label>
                                <div className="flex gap-2 justify-center">
                                    {[...Array(6)].map((_, index) => (
                                        <input
                                            key={index}
                                            type="text"
                                            maxLength={1}
                                            className="text-gray-800 bg-white border border-gray-300 w-12 text-center text-xl px-2 py-3 rounded-md outline-blue-500"
                                            onChange={(e) => handleInputChange(e, index)}
                                            onKeyDown={(e) => handleKeyDown(e, index)}
                                            ref={(el) => {
                                                if (el) inputsRef.current[index] = el;
                                            }}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="!mt-8">
                            <button type="button" className="w-full py-3 px-4 text-sm tracking-wider font-semibold rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none">
                                Verify Email
                            </button>
                        </div>
                        <p className="text-gray-800 text-sm mt-6 text-center">Didn’t receive a code? <a href="javascript:void(0);" className="text-blue-600 font-semibold hover:underline ml-1">Resend Code</a></p>
                    </form>
                </div>
            </div>
        </div>
    )
}
