import { useParams } from "react-router";
import React, { useEffect, useState } from "react";
import BlogHeader, { BlogHeaderUserModel } from "@/components/Header";
import { IBlog, API_STATUS } from "@/types/types";
import Editable from "./Editable";
import NonEditable from "./NonEditable";
import { SiBloglovin } from "react-icons/si";
import { Spinner } from "@/components/Spinner";

function BlogContent(props) {
    const { editing, blogData, setBlogData } = props

    if (editing) {
        return (<Editable blogData={blogData} setBlogData={setBlogData} />)
    }
    return (<NonEditable blogData={blogData} setBlogData={setBlogData} />)
}

// TODO: Add a blog save button, which sends a PATCH request to update blog data in db

// Main component
export const BlogPost = () => {
    const params = useParams()

    const [apiStatus, setApiStatus] = useState<API_STATUS>(API_STATUS.WAITING)
    const [blogData, setBlogData] = useState<IBlog>()
    const [editable, setEditable] = useState<boolean>(true)
    const owner: boolean = editable

    const [publishApiStatus, setPublishApiStatus] = useState<API_STATUS>(API_STATUS.IDLE)
    const [previewStatus, setpPreviewStatus] = useState<API_STATUS>(API_STATUS.IDLE)
    const [editing, setEditing] = useState<boolean>(false)

    const handleEditing = () => {
        setEditing((prev) => !prev)
    }

    const handlePublishing = () => {
        if (publishApiStatus === API_STATUS.WAITING) {
            return
        }
        setPublishApiStatus(API_STATUS.WAITING);

        // TODO: send blog publish request
    }

    const handlePreviewing = () => {
        if (previewStatus === API_STATUS.WAITING) {
            return
        }
        setpPreviewStatus(API_STATUS.WAITING);
        // TODO: also save the blog
        setEditing(false)
        setpPreviewStatus(API_STATUS.SUCCESS);
    }

    const getHeader = (): React.JSX.Element => {
        let rightPortion: React.JSX.Element = <></>
        if (owner) {
            if (editing) {
                rightPortion = (
                    <div className="flex gap-6">
                        <div className="flex gap-4">
                            <button className="border shadow-sm rounded-lg p-2 min-h-14 min-w-[140px] py-3 px-6" onClick={handlePreviewing}>
                                {
                                    previewStatus === API_STATUS.WAITING ? <Spinner color={"black"} /> : "Preview"
                                }
                            </button>                            <button className="border shadow-sm rounded-lg p-2 text-white min-h-14 min-w-[140px] py-3 px-6 bg-blue-600" onClick={handlePublishing}>
                                {
                                    publishApiStatus === API_STATUS.WAITING ? <Spinner /> : "Publish"
                                }
                            </button>
                        </div>
                        <BlogHeaderUserModel />
                    </div>
                )
            } else {
                rightPortion = (<div className="flex gap-6">
                    <div className="flex gap-4">
                        <button className="border shadow-sm rounded-lg p-2 min-h-14 min-w-[100px] py-3 px-6" onClick={handleEditing}>
                            Edit
                        </button>
                    </div>
                    <BlogHeaderUserModel />
                </div>)
            }
        } else {
            rightPortion = <BlogHeaderUserModel />
        }

        return (<div className="relative flex justify-between items-center px-6 py-4 mb-6 shadow-sm bg-white border-b">
            <a href={`${import.meta.env.VITE_SERVER_ADDRESS}${import.meta.env.VITE_SERVER_PORT}/`}>
                <div className="flex items-center gap-1 text-gray-700">
                    <SiBloglovin className='mb-1' />
                    <p className="font-bold">Logify</p>
                </div>
            </a>

            {rightPortion}
        </div>)
    }

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
                    {getHeader()}
                    {
                        apiStatus === API_STATUS.WAITING ?
                            <div className="w-full h-full flex justify-center items-center mt-20"><div className="w-10 h-10 border-4 border-t-transparent border-blue-500 rounded-full animate-spin"></div></div> :
                            <BlogContent editing={editing} blogData={blogData} setBlogData={setBlogData} />
                    }
                </div>
            </div>
        </div>
    );
};
