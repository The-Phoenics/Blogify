import { useState } from "react";
import { BsBookmark, BsBoxArrowRight, BsClockHistory, BsGear, BsListCheck } from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";
import { SiBloglovin } from "react-icons/si";
import { useNavigate } from "react-router";

const Header = () => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    const handleLogout = async () => {
        await fetch(`${import.meta.env.VITE_SERVER_ADDRESS}${import.meta.env.VITE_SERVER_PORT}/auth/logout`);
        navigate("/login")
    }

    return (
        <div className="relative flex justify-between items-center px-6 py-4 mb-6 shadow-sm bg-white border">
            <a href={`${import.meta.env.VITE_SERVER_ADDRESS}${import.meta.env.VITE_SERVER_PORT}/`}>
                <div className="flex items-center gap-1 text-gray-700">
                    <SiBloglovin className='mb-1' />
                    <p className="font-bold">Logify</p>
                </div>
            </a>
            <div className="relative">
                <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none">
                    <FaUserCircle size={28} className="text-gray-700" />
                </button>
                {isOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 shadow-lg rounded-lg p-2">
                        <div className="p-3 border-b border-gray-200 cursor-pointer">
                            <p className="font-bold">Bjp King</p>
                            <p className="text-sm text-gray-500">@BjpKing221</p>
                        </div>
                        <ul className="py-1">
                            <li className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 cursor-pointer">
                                <BsBookmark className="text-gray-600" /> Bookmarks
                            </li>
                            <li className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 cursor-pointer">
                                <BsClockHistory className="text-gray-600" /> My reading history
                            </li>
                            <li className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 cursor-pointer">
                                <BsGear className="text-gray-600" /> Account settings
                            </li>
                            <li className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 cursor-pointer">
                                <BsListCheck className="text-gray-600" /> Changelog
                            </li>
                            <li onClick={handleLogout} className="flex items-center gap-3 px-4 py-2 text-red-500 hover:bg-gray-100 cursor-pointer">
                                <BsBoxArrowRight className="text-red-500" /> Log out
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Header