import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router";
import { API_STATUS, IBlog } from "../types/types";

const MONTHS: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

export const Feed = () => {
    const [feedBlogs, setFeedBlogs] = useState<IBlog[]>([])
    const [apiStatus, setApiStatus] = useState<API_STATUS>(API_STATUS.WAITING)

    const navigate = useNavigate()
    const searchInputRef = useRef<HTMLInputElement>(undefined)

    const fetchFeedBlogs = async () => {
        const url = `${import.meta.env.VITE_SERVER_ADDRESS}${import.meta.env.VITE_SERVER_PORT}/blog`
        const res = await fetch(url, {
            credentials: "include"
        })
        if (!res.ok) {
            setApiStatus(API_STATUS.ERROR)
            navigate("/login")
            return
        }
        const blogs = await res.json()
        setFeedBlogs(blogs)
        setApiStatus(API_STATUS.SUCCESS)
    }

    const searchBlogs = async () => {
        const searchString = searchInputRef.current?.value
        if (searchString?.trim() !== "") {
            const url = `${import.meta.env.VITE_SERVER_ADDRESS}${import.meta.env.VITE_SERVER_PORT}/blog/search?title=${searchString}`
            const res = await fetch(url, {
                credentials: "include"
            })
            console.log(res)
            if (res.ok) {
                const result = await res.json()
                if (result.message === "found matches") {
                    setFeedBlogs([...result.data])
                }
            }
        }
    }

    useEffect(() => {
        fetchFeedBlogs()
    }, [])

    if (apiStatus === API_STATUS.WAITING) {
        return (
            <div className="w-full h-full flex justify-center items-center mt-20"><div className="w-10 h-10 border-4 border-t-transparent border-blue-500 rounded-full animate-spin"></div></div>
        )
    }

    return (
        <div className="w-screen h-full flex justify-center bg-gray-100 p-6">
            <div className="max-w-6xl w-full grid grid-cols-3 gap-6">
                <div className="col-span-2">
                    {/* Featured Post */}
                    {/* <div className="bg-white border border-gray-300 p-6 rounded-lg mb-6 shadow">
                        <div className="bg-gray-300 h-64 flex items-center justify-center text-gray-500 text-xl font-bold">850 x 350</div>
                        <p className="text-sm text-gray-600 mt-4">January 1, 2023</p>
                        <h2 className="text-2xl font-bold text-gray-900 mt-2">Featured Post Title</h2>
                        <p className="text-gray-700 mt-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Reiciendis aliquid atque, nulla?</p>
                        <button className="mt-4 px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded hover:bg-blue-700">Read more →</button>
                    </div> */}

                    {/* Blog Grid */}
                    <div className="grid grid-cols-2 gap-6">
                        {feedBlogs?.map((blog: IBlog, idx: number) => (
                            <div key={idx} className="pb-6 bg-white border border-gray-300 p-4 rounded-lg shadow">
                                <img src={`${blog.image}`} className="w-full aspect-square bg-transparent rounded-md object-cover" />
                                <p className="text-sm text-gray-600 mt-2">{new Date(blog.date).getDate()}&nbsp;{MONTHS[new Date(blog.date).getMonth()]},&nbsp;{new Date(blog.date).getFullYear()}</p>
                                <h3 className="text-lg font-semibold text-gray-900 mt-1">{blog.title.split(" ", 4).map((word: string, idx: number) => {
                                    return <span key={idx}>{word}&nbsp;</span>
                                })}{blog.content.length > 4 ? <span>...</span> : ""}</h3>
                                <p className="text-gray-700 mb-4 text-sm">{blog.content.split(" ", 5).map((word: string, idx: number) => {
                                    return <span key={idx}>{word}&nbsp;</span>
                                })}{blog.content.length > 5 ? <span>...</span> : ""}</p>
                                <Link to={`/blog/${blog._id}`} className="mt-13 px-3 py-2 text-sm font-semibold text-white bg-blue-600 rounded hover:bg-blue-700">Read more →</Link>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    <div className="bg-white border border-gray-300 p-4 rounded-lg shadow">
                        <h4 className="font-semibold text-gray-900 mb-2">Search</h4>
                        <input ref={searchInputRef} type="text" className="w-full border border-gray-300 p-2 rounded-md" placeholder="Enter search term..." />
                        <button onClick={searchBlogs} className="mt-2 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Go!</button>
                    </div>
                    <div className="bg-white border border-gray-300 p-4 rounded-lg shadow">
                        <h4 className="font-semibold text-gray-900 mb-4">Categories</h4>
                        <div className="flex flex-wrap gap-2">
                            <span className="bg-blue-100 text-blue-700 px-3 py-1 text-sm rounded-full hover:cursor-pointer">Technology</span>
                            <span className="bg-blue-100 text-blue-700 px-3 py-1 text-sm rounded-full hover:cursor-pointer">Development</span>
                            <span className="bg-blue-100 text-blue-700 px-3 py-1 text-sm rounded-full hover:cursor-pointer">React</span>
                            <span className="bg-blue-100 text-blue-700 px-3 py-1 text-sm rounded-full hover:cursor-pointer">Web Development</span>

                        </div>
                    </div>
                    <div className="bg-white border border-gray-300 p-4 rounded-lg shadow">
                        <h4 className="font-semibold text-gray-900 mb-2">Side Widget</h4>
                        <p className="text-gray-700 text-sm">You can put anything you want inside of these side widgets. They are easy to use and feature the Bootstrap 5 card component!</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
