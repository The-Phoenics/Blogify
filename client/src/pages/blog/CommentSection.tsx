import { Spinner } from "@/components/Spinner";
import { API_STATUS, IComment } from "@/types/types";
import { useRef, useState } from "react";

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

export default CommentSection