import { Link } from 'react-router-dom'
import databaseServices from '../appwrite/database';
import { useEffect, useRef, useState } from 'react';
import { CheckCircle, Dot } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

const VideoCard = ({ title, thumbnailId, videoId, channelName, views, $createdAt }) => {
    const videoRef = useRef(null);
    const mutebtnRef = useRef(null);
    const [isVideoReady, setIsVideoReady] = useState(false);
    const formattedDate = formatDistanceToNow(new Date($createdAt), { addSuffix: true });

    useEffect(() => {
        const videoElement = videoRef.current;
        const handleCanPlay = () => setIsVideoReady(true);
        if (videoElement) videoElement.addEventListener('canplay', handleCanPlay);
        return () => videoElement?.removeEventListener('canplay', handleCanPlay);
    }, []);

    const handleMouseEnter = () => {
        if (videoRef.current && isVideoReady && videoRef.current.readyState >= 2) {
            videoRef.current.play();
            mutebtnRef.current.style.opacity = "1";
        }
    };

    const handleMouseLeave = () => {
        if (videoRef.current) {
            if (!videoRef.current.paused) {
                videoRef.current.pause();
            }
            mutebtnRef.current.style.opacity = "0";
            videoRef.current.currentTime = 0;
        }
    };

    const toggleMute = () => {
        if (videoRef.current) {
            videoRef.current.muted = !videoRef.current.muted;
            mutebtnRef.current.innerHTML = videoRef.current.muted ? "🔇" : "🔊";
        }
    };

    return (
        <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className='relative'>
            <Link to={`/video/${videoId}`} className=''>
                <div className='w-full h-min mb-5 overflow-hidden bg-red transition-all duration-500 sm:rounded-xl hover:rounded-none'>

                    <div id='homepage-video' className='w-full hover:rounded-none rounded-xl overflow-hidden'>
                        <video
                            ref={videoRef}
                            className='w-full h-56 sm:h-52 object-contain bg-neutral-600'
                            src={databaseServices.getFilePreview(videoId)}
                            muted
                        ></video>
                    </div>

                    <div className="flex font-roboto pt-4 rounded-b-lg max-w-md">
                        <div className="flex-shrink-0">
                            <div className="bg-gray-800 rounded-full p-2">
                                <CheckCircle className="text-white" />
                            </div>
                        </div>

                        <div className="ml-4">
                            <div className="font-semibold text-md line-clamp-2">
                                {title}
                            </div>
                            <div className="text-neutral-400">
                                <span>{channelName}</span>
                                <div className='flex items-center text-sm'>
                                    {views} view <Dot size={17} strokeWidth={4} /> {formattedDate}
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </Link>

            <button
                ref={mutebtnRef}
                className='opacity-0 flex items-center justify-center absolute p-1 text-2xl transition-all duration-300 bg-black top-2 right-2 bg-opacity-50 rounded-full'
                onClick={toggleMute}
            >  🔇
            </button>
        </div>

    )
}

export default VideoCard;