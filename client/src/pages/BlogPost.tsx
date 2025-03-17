import { useParams } from "react-router";
import { useEffect, useState } from "react";
import BlogHeader from "@/components/Header";
import { IBlog, API_STATUS } from "@/types/types";
import Editable from "./blog/Editable";
import NonEditable from "./blog/NonEditable";

function BlogContent(props) {
    const { editable, blogData, setBlogData } = props

    if (editable) {
        return (<Editable blogData={blogData} setBlogData={setBlogData} />)
    }
    return (<NonEditable blogData={blogData} setBlogData={setBlogData} />)
}

// Main component
export const BlogPost = () => {
    const [apiStatus, setApiStatus] = useState<API_STATUS>(API_STATUS.WAITING)
    const [blogData, setBlogData] = useState<IBlog>()
    const [editable, setEditable] = useState<boolean>(false)
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
                            <BlogContent editable={editable} blogData={blogData} setBlogData={setBlogData} />
                    }
                </div>
            </div>
        </div>
    );
};
