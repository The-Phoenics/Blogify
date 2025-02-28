import { useState } from "react";
import { SiBloglovin } from "react-icons/si";

export const BlogPost = () => {
    const [title, setTitle] = useState();
    const [author, setAuthor] = useState();
    const [description, setDescription] = useState();

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

                    <article>
                        <h1 className="text-2xl font-bold text-gray-900 mb-4">Blog Title</h1>
                        <p className="text-gray-700 text-sm mb-4">By <span className="font-semibold">Author Name</span></p>
                        <p className="text-gray-800 text-lg leading-relaxed mb-6">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin gravida sit amet quam a malesuada. Duis nibh turpis, sagittis id pulvinar at, vestibulum eu nunc. Donec ultrices porttitor justo sit amet hendrerit. Etiam vulputate a odio ut tincidunt. Aliquam varius ullamcorper elit ac suscipit. Maecenas vel eros dolor. Ut condimentum nec est et lacinia. Vestibulum tellus nunc, pharetra eu consequat rhoncus, sodales et ligula. Maecenas pretium consequat pulvinar. Praesent vestibulum vehicula dolor maximus accumsan. Nunc vitae imperdiet erat. Mauris a nunc pellentesque, sagittis est in, scelerisque mauris. Vivamus laoreet urna leo, eu porttitor lectus euismod eu. Proin ullamcorper nunc vitae tellus finibus tempor. Vivamus ac lorem quis tortor consectetur feugiat.

                            Ut suscipit arcu nisi, vitae tempus magna accumsan et. Mauris ullamcorper dolor at arcu placerat, non hendrerit lectus tempus. In nec euismod tortor. Fusce hendrerit tellus suscipit, fermentum odio eget, sollicitudin urna. Donec a turpis tristique, dignissim nulla id, lacinia ex. Fusce consectetur ipsum a est ullamcorper tempor. Cras tempus dapibus fringilla. Ut lacinia nisi imperdiet, ullamcorper erat feugiat, ullamcorper tellus. Mauris quis ultricies lectus, blandit accumsan tellus. Pellentesque et nunc malesuada, faucibus mauris nec, fermentum tortor. Aliquam lacinia orci facilisis nisl euismod condimentum.

                            Nunc ut turpis velit. Fusce at convallis purus. Sed sit amet nisi in turpis mollis faucibus vel a massa. Suspendisse et congue nunc, in iaculis turpis. Etiam lobortis sollicitudin vulputate. Sed vel urna ipsum. Sed efficitur tempor rutrum. Curabitur ornare lacinia iaculis. Integer eget tincidunt ex. Fusce quis justo luctus, bibendum ante et, venenatis turpis.

                            Proin ut dolor convallis, dictum mauris quis, aliquet ex. Quisque porttitor ut quam in vulputate. Pellentesque mattis, orci at suscipit sodales, diam risus consectetur nibh, id consequat tortor nisi in felis. Pellentesque est sem, vulputate ut lectus at, egestas molestie nunc. Morbi porttitor, nisl et varius imperdiet, massa metus accumsan justo, quis dapibus nisl velit eget purus. Suspendisse eu elementum massa. Donec sed est at diam egestas sagittis at eget dui. In lectus leo, ornare quis enim ut, venenatis hendrerit quam. Quisque iaculis erat vel nisi pulvinar accumsan.

                            Duis id egestas dolor. In ut porttitor sapien. Pellentesque euismod, felis at dapibus pellentesque, libero arcu ornare lectus, nec lobortis dui purus a diam. In dolor tortor, interdum non ipsum a, lacinia finibus ligula. Nam vitae ipsum cursus, viverra dui cursus, ultrices tortor. Vivamus ut luctus mauris. Aliquam bibendum arcu nulla, quis pellentesque justo semper vitae. Maecenas id venenatis tellus. Nullam at eros nunc. Vivamus sodales ultricies lacus vel eleifend. Suspendisse turpis nulla, tristique quis tempor sed, bibendum id mi. Curabitur molestie massa eros, eget rhoncus felis egestas in. Sed urna sem, vestibulum at congue non, pharetra in mi. In tincidunt pulvinar facilisis.
                        </p>
                    </article>

                    <div className="mt-14">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">Comments</h2>
                        <div className="border border-gray-300 p-4 rounded-lg">
                            <p className="text-gray-800 text-sm">User1: This is a great post!</p>
                        </div>
                        <div className="border border-gray-300 p-4 rounded-lg mt-2">
                            <p className="text-gray-800 text-sm">User2: Very informative, thanks!</p>
                        </div>
                        <textarea className="mt-8 p-2 px-4 w-full border border-gray-300 rounded-md text-gray-800" placeholder="Add a comment..."></textarea>
                        <button className="mt-2 py-2 px-4 text-sm tracking-wider font-semibold rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none">
                            Post Comment
                        </button>
                    </div>

                    <div className="flex items-center justify-center mt-8">
                        <div className="flex gap-2 flex-wrap">
                            <span className="bg-blue-100 text-blue-700 px-3 py-1 text-sm rounded-full hover:cursor-pointer">Technology</span>
                            <span className="bg-blue-100 text-blue-700 px-3 py-1 text-sm rounded-full hover:cursor-pointer">Development</span>
                            <span className="bg-blue-100 text-blue-700 px-3 py-1 text-sm rounded-full hover:cursor-pointer">React</span>
                            <span className="bg-blue-100 text-blue-700 px-3 py-1 text-sm rounded-full hover:cursor-pointer">Web Development</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};