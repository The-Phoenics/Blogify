import { Spinner } from "@/components/Spinner";
import { useEffect, useRef, useState } from "react";
import { SiBloglovin } from "react-icons/si";
import { useParams } from "react-router";

export interface ITag {
    tag: string,
    blogsCount: number,
    followers: number
}

export interface IComment {
    content: string,
    userId: string,
    date: Date
}

export interface IUser {
    username: string,
}

export interface IBlog {
    title: string,
    author: IUser,
    content: string,
    comments: [IComment],
    published: boolean,
    public: boolean,
    image: string,
    tags: [ITag],
    date: Date,
    lastUpdated: Date,
}


enum API_STATUS {
    WAITING = 1, DONE
}

export const BlogPost = () => {
    const titleElementRef = useRef<HTMLInputElement>(null);
    const authorElementRef = useRef<HTMLInputElement>(null);
    const descriptionElementRef = useRef<HTMLInputElement>(null);

    const [apiStatus, setApiStatus] = useState<API_STATUS>(API_STATUS.WAITING)
    const [blogData, setBlogData] = useState<IBlog>()
    const params = useParams()

    const fetchBlog = async () => {
        const response = await fetch(`http://localhost:4000/blog/${params.blogId}`, {
            method: "GET",
        });
        const result: IBlog = await response.json()
        console.log(result)
        setApiStatus(API_STATUS.DONE)
        setBlogData(result)
    }

    useEffect(() => {
        fetchBlog()
    }, [])

    if (apiStatus === API_STATUS.WAITING)
        return <Spinner />

    return (
        <div className="w-screen flex items-center justify-center">
            <div className="flex flex-col justify-center font-[sans-serif] p-4">
                <div className="rounded-2xl p-8">
                    <div className="text-center mb-12">
                        <a href="http://localhost:4000">
                            <div className="flex justify-center items-center flex-row gap-1 text-gray-700">
                                <SiBloglovin className='mb-1' />
                                <p className="font-bolder">Logify</p>
                            </div>
                        </a>
                    </div>

                    {
                        apiStatus === API_STATUS.WAITING ?
                            <div className="w-full h-full flex justify-center border border-red-600">
                                <div className={`border-4 border-t-transparent border-white rounded-full animate-spin`}></div>
                            </div> :
                            <div>
                                <article>
                                    <h1 className="text-2xl font-bold text-gray-900 mb-4">{blogData?.title}</h1>
                                    <p className="text-gray-700 text-sm mb-4">By <span className="font-semibold">{blogData?.author.username}</span></p>
                                    <p className="text-gray-800 text-lg leading-relaxed mb-6">
                                        {blogData?.content}
                                    </p>
                                </article>

                                <div className="mt-14">
                                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Comments</h2>
                                    {
                                        blogData?.comments.map((comment, idx: number) => {
                                            return <div key={idx} className="border border-gray-300 p-4 rounded-lg">
                                                <p className="text-gray-800 text-sm">{comment.content}</p>
                                            </div>

                                        })
                                    }
                                    <textarea className="mt-8 p-2 px-4 w-full border border-gray-300 rounded-md text-gray-800" placeholder="Add a comment..."></textarea>
                                    <button className="mt-2 py-2 px-4 text-sm tracking-wider font-semibold rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none">
                                        Post Comment
                                    </button>
                                </div>

                                <div className="flex items-center justify-center mt-8">
                                    <div className="flex gap-2 flex-wrap">
                                        {
                                            blogData?.tags.map((tag: ITag, idx: number) => {
                                                return <span key={idx} className="bg-blue-100 text-blue-700 px-3 py-1 text-sm rounded-full hover:cursor-pointer">{tag.tag}</span>

                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                    }
                </div>
            </div>
        </div>
    );
};