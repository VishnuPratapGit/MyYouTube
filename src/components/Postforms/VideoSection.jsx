import { useMemo } from 'react'
import databaseServices from '../../appwrite/database';
import PreLoader from '../PreLoader';


const VideoSection = ({ edit, videoLoader, videoData }) => {
    // MEMOIZED VIDEO COMPONENT
    const VideoComponent = useMemo(() => (
        <video
            className='w-full min-h-44 h-1/2 object-cover rounded-t-lg'
            src={databaseServices.getFilePreview(videoData ? videoData.$id : null)}
            controls
        ></video>
    ), [videoData]);

    return (
        <div className={`bg-neutral-900 rounded-lg w-full ${edit && "max-w-full min-w-80 h-min"} sm:h-3/4 relative`}>

            {videoLoader && <div className="absolute flex justify-center items-center z-10 w-full h-1/2 "><PreLoader color="gray" /></div>}

            {VideoComponent}

            <div className="p-5 pb-2">
                <span className="text-xs block font-semibold text-neutral-500">Video Link</span>
                <a href={databaseServices.getFilePreview(videoData ? videoData.$id : null)} className="text-sm truncate block text-blue-400">{videoData ? `https://cloud.appwrite.io/v1/${videoData.$id}` : <PreLoader type="bubbles" />}
                </a>
            </div>

            <div className="p-5 pt-2">
                <span className="text-xs font-semibold text-neutral-500">File Name</span>
                <h1>{videoData ? videoData.name : <PreLoader type="bubbles" />}</h1>
            </div>
        </div>
    )
}

export default VideoSection