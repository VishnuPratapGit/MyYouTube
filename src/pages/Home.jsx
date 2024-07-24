import { useEffect, useState, useRef, useCallback } from 'react';
import databaseServices from '../appwrite/database';
import { VideoCard } from '../components/index';
import { Query } from 'appwrite';
import { throttle } from 'lodash';

const Home = () => {
    const [videos, setVideos] = useState([]);
    const [page, setPage] = useState(0);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const mainRef = useRef(null);
    const limit = 8;

    const handleScroll = useCallback(throttle(() => {
        const { scrollTop, scrollHeight, clientHeight } = mainRef.current;

        if (scrollTop + clientHeight >= scrollHeight - 10 && !loading && hasMore) {
            console.log('Near the bottom!');
            setPage(prevPage => prevPage + 1);
        }
    }, 300), [loading, hasMore]);

    useEffect(() => {
        const mainElement = mainRef.current;
        mainElement.addEventListener('scroll', handleScroll);

        return () => {
            mainElement.removeEventListener('scroll', handleScroll);
        };
    }, [handleScroll]);

    useEffect(() => {
        const fetchVideos = async () => {
            setLoading(true);
            try {
                console.log(page);
                const offset = page * limit;
                const response = await databaseServices.getPosts([Query.equal("visibility", "public")], limit, offset);
                if (response.documents.length > 0) {
                    setVideos(prevVideos => [...prevVideos, ...response.documents]);
                } else {
                    setHasMore(false);
                }
            } catch (error) {
                console.error('Failed to fetch videos:', error);
            } finally {
                setLoading(false);
            }
        };

        if (hasMore) fetchVideos();
    }, [page]);

    return (
        <div ref={mainRef} className='grid grid-cols-1 h-full overflow-auto sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4'>
            {videos.map((videoData) => (
                <VideoCard key={videoData.$id} {...videoData} />
            ))}
            {loading && <div>Loading more videos...</div>}
        </div>
    );
};

export default Home;
