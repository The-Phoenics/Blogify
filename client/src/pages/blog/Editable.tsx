import Editor from "@/components/Editor";
import { ITag } from "@/types/types";

const MONTHS: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']

function EditableBlogHeader() {
    
}

function Editable({ blogData, setBlogData }) {
    const date = new Date(blogData.date)
    const dateString = MONTHS[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear();

    return (
        <div className="px-16 max-w-[2100px]">
            <article>
                <h1 className="text-2xl font-bold text-gray-900 border-none" contentEditable={true}>{blogData?.title}</h1>

                <div className="flex items-center justify-center mt-8 mb-8">
                    <div className="flex gap-2 flex-wrap">
                        {
                            blogData?.tags?.map((tag: ITag, idx: number) => {
                                return <span key={idx} className="bg-blue-100 text-blue-700 px-3 py-1 text-sm rounded-full hover:cursor-pointer">{tag.tag}</span>

                            })
                        }
                    </div>
                </div>

                {/* image banner for blog */}
                {
                    blogData?.image ? <div className="h-90 w-full mb-6 flex justify-center items-center">
                        <img src={`${blogData?.image}`} className="w-full md:w-[80%] shadow-lg max-w-[500px] rounded-md object-cover" />
                    </div> : ""
                }

                {/* editor for writing blogs content */}
                <Editor editable={true} className="text-gray-800 text-lg text-left leading-relaxed mb-14">
                    {blogData?.content}
                </Editor>
            </article>
        </div>
    )
}

export default Editable