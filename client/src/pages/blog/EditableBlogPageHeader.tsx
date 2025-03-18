import { SiBloglovin } from "react-icons/si";
import { useNavigate } from "react-router";

const EditableBlogPageHeader = () => {
    const navigate = useNavigate();

    return (
        <div className="relative flex justify-between items-center px-6 py-4 mb-6 shadow-sm bg-white border-b">
            <a href={`${import.meta.env.VITE_SERVER_ADDRESS}${import.meta.env.VITE_SERVER_PORT}/`}>
                <div className="flex items-center gap-1 text-gray-700">
                    <SiBloglovin className='mb-1' />
                    <p className="font-bold">Logify</p>
                </div>
            </a>
        </div>
    );
};

export default EditableBlogPageHeader