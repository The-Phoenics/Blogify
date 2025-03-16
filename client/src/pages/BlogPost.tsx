import { useParams } from "react-router";
import { useEffect, useRef, useState } from "react";
import BlogHeader from "@/components/Header";
import { ITag, IBlog, API_STATUS, IComment } from "@/types/types";
import { Spinner } from "@/components/Spinner";
import Editor from "@/components/Editor";

const MONTHS: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']

const CommentSection = ({ blogData, setBlogData }) => {
    const commentInputRef = useRef<HTMLTextAreaElement>(null)
    const [apiStatus, setApiStatus] = useState<API_STATUS>(API_STATUS.IDLE)

    const handlePostComment = async () => {
        if (apiStatus === API_STATUS.WAITING)
            return
        setApiStatus(API_STATUS.WAITING)

        const response = await fetch(`${import.meta.env.VITE_SERVER_ADDRESS}${import.meta.env.VITE_SERVER_PORT}/blog/comment`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                // TODO: send comment data and create comment
            }),
        });

        if (!response.ok) {
            setApiStatus(API_STATUS.ERROR)
            return
        }
        const result = await response.json();
        console.log(result)
        setApiStatus(API_STATUS.SUCCESS)
    }

    return (
        <div className="mt-8 mb-6 flex flex-col justify-center items-center">
            <h2 className="text-xl font-semibold text-gray-900">Comments</h2>
            {
                blogData?.comments?.map((comment: IComment, idx: number) => {
                    return (
                        <div key={idx} className="flex flex-col text-left gap-2 w-full text-gray-800 text-lg p-4 rounded-lg">
                            <p className="">{comment.content}</p>
                            <span className="w-full flex justify-end">
                                <span className="font-semibold mr-10 hover:cursor-pointer text-gray-700">@{"UserA232E!"}</span>
                            </span>
                        </div>
                    )
                })
            }
            <textarea ref={commentInputRef} rows={6} className="w-full mx-2 mt-8 p-2 px-4 border border-gray-300 rounded-md text-gray-800" placeholder="Add a comment..."></textarea>
            <button className="mt-4 min-w-[200px] min-h-9 py-2 px-4 text-sm tracking-wider font-semibold rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none" onClick={handlePostComment}>
                {
                    apiStatus === API_STATUS.WAITING ? <Spinner /> : "Post Comment"
                }
            </button>
        </div>
    )
}

const BlogBody = ({ blogData, setBlogData }) => {
    const date = new Date(blogData.date)
    const dateString = MONTHS[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear();

    return (
        <div className="px-16 max-w-[2100px]">
            <article>
                <h1 className="text-2xl font-bold text-gray-900 mb-4">{blogData?.title}</h1>
                <div className="flex justify-center items-center gap-2 text-gray-700 text-sm mb-4">
                    <div className="hover:cursor-pointer">
                        <p className="">By <span className="font-semibold">{blogData?.author?.username}</span></p>
                    </div>
                    <span>•</span>
                    <div>{dateString}</div>
                </div>

                {/* image banner for blog */}
                {
                    blogData?.image ? <div className="h-90 w-full mb-6 flex justify-center items-center">
                        <img src={`${blogData?.image}`} className="w-full md:w-[80%] shadow-lg max-w-[500px] rounded-md object-cover" />
                    </div> : ""
                }

                {/* editor for writing blogs content */}
                <Editor className="text-gray-800 text-lg text-left leading-relaxed mb-6">
                    {blogData?.content}
                </Editor>
            </article>
            <hr />
            
            {/* render comments */}
            <CommentSection blogData={blogData} setBlogData={setBlogData} />

            <div className="flex items-center justify-center mt-8">
                <div className="flex gap-2 flex-wrap">
                    {
                        blogData?.tags?.map((tag: ITag, idx: number) => {
                            return <span key={idx} className="bg-blue-100 text-blue-700 px-3 py-1 text-sm rounded-full hover:cursor-pointer">{tag.tag}</span>

                        })
                    }
                </div>
            </div>
        </div>
    )
}

// Main component
export const BlogPost = () => {
    const [apiStatus, setApiStatus] = useState<API_STATUS>(API_STATUS.WAITING)
    const [blogData, setBlogData] = useState<IBlog>()
    const params = useParams()

    const fetchBlog = async () => {
        const response = await fetch(`${import.meta.env.VITE_SERVER_ADDRESS}${import.meta.env.VITE_SERVER_PORT}/blog/${params.blogId}`, {
            method: "GET",
        });
        const result = await response.json()
        if (result.message === "invalid blog") {
            setApiStatus(API_STATUS.ERROR)
        } else {
            setApiStatus(API_STATUS.SUCCESS)
            setBlogData(result)
        }
    }

    useEffect(() => {
        fetchBlog()
    }, [])

    if (apiStatus === API_STATUS.ERROR) {
        return (<div className="w-screen flex items-center justify-center">
            <div className="flex flex-col justify-center font-[sans-serif]">
                <div className="rounded-2xl">
                    <BlogHeader />
                    <div>Couldn't find this blog</div>
                </div>
            </div>
        </div>)
    }

    return (
        <div className="w-screen flex items-center justify-center">
            <div className="flex flex-col justify-center font-[sans-serif]">
                <div className="rounded-2xl pb-6">
                    <BlogHeader />
                    {
                        apiStatus === API_STATUS.WAITING ?
                            <div className="w-full h-full flex justify-center items-center mt-20"><div className="w-10 h-10 border-4 border-t-transparent border-blue-500 rounded-full animate-spin"></div></div> :
                            <BlogBody blogData={blogData} setBlogData={setBlogData} />
                    }
                </div>
            </div>
        </div>
    );
};
