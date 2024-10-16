import { useCallback, useEffect, useRef, useState } from "react";
import databaseServices from "../../appwrite/database";
import { useSelector } from "react-redux";
import { Query } from "appwrite";
import { Link } from "react-router-dom";
import { throttle } from "lodash";

const MainStudioWindow = () => {
    const userId = useSelector(state => state.auth.userData?.$id);
    const [documents, setDocuments] = useState([]);
    const [page, setPage] = useState(0);
    const [fetching, setFetching] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const scrollableRef = useRef(null);
    const limit = 8;

    const handleScroll = useCallback(throttle(() => {
        const { scrollTop, scrollHeight, clientHeight } = scrollableRef.current;

        if (scrollTop + clientHeight >= scrollHeight - 10 && !fetching && hasMore) {
            console.log('Near the bottom!');
            setPage(prevPage => prevPage + 1);
        }
    }, 300), [hasMore, fetching]);

    useEffect(() => {
        const element = scrollableRef.current;
        element.addEventListener('scroll', handleScroll);

        return () => {
            element.removeEventListener('scroll', handleScroll);
        };
    }, [handleScroll])

    useEffect(() => {
        setFetching(true);
        const offset = page * limit;
        hasMore && databaseServices.getPosts([Query.equal("userId", userId)], limit, offset)
            .then(response => {
                if (response.documents.length > 0) {
                    setDocuments(prevVideos => [...prevVideos, ...response.documents]);
                    setFetching(false);
                } else {
                    setHasMore(false);
                }
            })
    }, [page]);

    function dateFormatChange(createdAt) {
        const event = new Date(createdAt)
        return (event.toLocaleString('en-GB', { timeZone: 'UTC' })).split(",")[0]
    }

    return (
        <section id="studio-table" className="flex flex-col font-roboto mx-auto w-full h-full sm:p-4 p-2">
            <div ref={scrollableRef} className="sm:scroll-visible scroll-hidden flex-1 overflow-y-auto font-roboto scrollbar md:px-10">
                <table className="w-full divide-gray-200 shadow-lg">
                    <thead className="sticky top-0 shadow-md dark:shadow-sm dark:shadow-neutral-600 bg-gray-50 dark:bg-neutral-800">
                        <tr>
                            <th
                                scope="col"
                                className="px-4 sm:py-3.5 py-2 text-left text-sm font-normal text-gray-700 dark:text-white"
                            >
                                Video
                            </th>
                            <th
                                scope="col"
                                className="px-4  text-center text-sm font-normal text-gray-700 dark:text-white"
                            >
                                Visibility
                            </th>

                            <th
                                scope="col"
                                className="px-4  text-center text-sm font-normal text-gray-700 dark:text-white"
                            >
                                Date
                            </th>
                            <th
                                scope="col"
                                className="px-4  text-center text-sm font-normal text-gray-700 dark:text-white"
                            >
                                Views
                            </th>
                            <th
                                scope="col"
                                className="px-4  text-center text-sm font-normal text-gray-700 dark:text-white"
                            >
                                Comments
                            </th>
                            <th
                                scope="col"
                                className="px-4  text-center text-sm font-normal text-gray-700 dark:text-white"
                            >
                                Likes
                            </th>
                        </tr>
                    </thead>

                    <tbody className="dark:bg-neutral-900">
                        {documents.map((video) => (
                            <tr key={video.$id} className="border-b dark:border-neutral-700">
                                <td className="whitespace-nowrap p-2 px-4">
                                    <div className="flex sm:w-max w-28 overflow-hidden">
                                        {/* image */}
                                        <div className="flex-shrink-0 rounded-md">
                                            <Link to={`updatepost/${video.$id}`}>
                                                <img
                                                    className="h-16 w-28 rounded-md object-cover"
                                                    src={databaseServices.getThumbnailPreview(video.thumbnailId)}
                                                    alt="Thumbnail"
                                                />
                                            </Link>
                                        </div>
                                        {/* video-details */}
                                        <div className="ml-4 max-w-[20rem]">
                                            <Link to={`updatepost/${video.$id}`} className="text-sm text-gray-900 font-semibold dark:text-white">
                                                {video.title}
                                            </Link>
                                            <div className="text-xs text-gray-700 dark:text-neutral-400 truncate">
                                                {video.description}
                                            </div>
                                        </div>
                                    </div>
                                </td>

                                <td className="whitespace-nowrap p-2 px-5">
                                    <div className={`text-sm font-semibold py-1 md:rounded-2xl rounded sm:px-0 px-2 text-center text-black ${video.visibility === 'public' ? 'bg-emerald-400' : video.visibility === 'unlisted' ? 'bg-yellow-200' : 'bg-rose-500'}`}>
                                        {video.visibility.charAt(0).toUpperCase() + video.visibility.slice(1)}
                                    </div>
                                </td>

                                <td className="whitespace-nowrap text-center text-sm text-gray-700 dark:text-white p-2 px-4">
                                    {dateFormatChange(video.$createdAt)}
                                </td>

                                <td className="whitespace-nowrap p-2 px-4">
                                    <span className="flex justify-center text-lg">{video.views}</span>
                                </td>

                                <td className="whitespace-nowrap p-2 px-4">
                                    <span className="flex justify-center text-lg">{0}</span>
                                </td>

                                <td className="whitespace-nowrap p-2 px-4">
                                    <span className="flex justify-center text-lg">{video.likes}</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="sm:flex hidden items-center justify-end shadow-md bg-gray-50 dark:bg-neutral-800 lg:mx-10 lg:mr-11 py-2 lg:pr-9">
                <div className="mx-2 hover:text-orange-500 hover:dark:text-white cursor-pointer text-sm font-semibold text-gray-900 dark:text-neutral-400">
                    <span className="hidden lg:block">&larr; Prev</span>
                    <span className="block lg:hidden">&larr;</span>
                </div>

                <div className="mx-1 cursor-pointer flex items-center rounded-md border-2 border-gray-400 px-2 text-gray-900 dark:text-neutral-400 font-semibold">
                    1
                </div>

                <div className="mx-2 hover:text-blue-500 hover:dark:text-white cursor-pointer text-sm font-semibold text-gray-900 dark:text-neutral-400">
                    <span className="hidden lg:block">Next &rarr;</span>
                    <span className="block lg:hidden">&rarr;</span>
                </div>
            </div>
        </section>
    );
};


export default MainStudioWindow