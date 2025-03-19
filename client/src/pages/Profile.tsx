import { API_STATUS, IBlog, IUser } from "@/types/types";
import { useEffect, useState } from "react";
import BlogHeader from "@/components/Header";

const ProfilePage = () => {
    const [userData, setUserData] = useState<IUser>()
    const [publishedBlogs, setPublishedBlogs] = useState<IBlog[]>([]);
    const [blogFetchApiStatus, setBlogFetchApiStatus] = useState<API_STATUS>(API_STATUS.WAITING)

    const fetchPublishedBlogs = async () => {
        setBlogFetchApiStatus(API_STATUS.WAITING)
        const url = `${import.meta.env.VITE_SERVER_ADDRESS}${import.meta.env.VITE_SERVER_PORT}/blog`
        const res = await fetch(url, {
            credentials: 'include',
        })
        if (!res.ok) {
            setBlogFetchApiStatus(API_STATUS.ERROR)
            return
        }
        const blogs = await res.json()
        setPublishedBlogs(blogs)
        setBlogFetchApiStatus(API_STATUS.SUCCESS)
    }

    useEffect(() => {
        setUserData({
            username: "Dark Dynamo",
            email: "darkdynamo",
        })

        fetchPublishedBlogs()
    }, [])

    return (
        <div className="w-full max-w-[2100px] mx-auto">
            <BlogHeader />
            {/* User Details */}
            <div className="p-10">
            <div className="bg-white shadow-md rounded-lg p-6 mb-6">
                <h1 className="text-2xl font-bold">{userData?.username}</h1>
                <p className="text-gray-600">{userData?.email}</p>
            </div>
            </div>

            {/* Published Blogs */}
            <div className="p-10 pt-0">
                {publishedBlogs.length === 0 ? (
                    <p className="text-gray-500">No published blogs available.</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {publishedBlogs.map((blog, idx) => (
                            <div
                                className="bg-white shadow-md rounded-lg p-4 flex items-center space-x-4 border hover:cursor-pointer hover:shadow-lg hover:scale-[1.02] transition-all"
                                key={idx}
                            >
                                <img
                                    src={blog.image}
                                    alt={blog.title}
                                    className="w-24 h-24 object-cover rounded-lg"
                                />
                                <div>
                                    <h3 className="text-lg font-semibold">{blog.title}</h3>
                                    <p className="text-gray-500 text-sm">
                                        {new Date(blog.date).toLocaleDateString()}
                                    </p>
                                    <p className="text-gray-700 line-clamp-2">
                                        {blog.content.substring(0, 100)}...
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProfilePage;