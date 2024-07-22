import React, { useEffect, useState } from 'react'
import { VideoCard } from '../components/index'
import databaseServices from '../appwrite/database'
import { Query } from 'appwrite'

const Home = () => {
    const [documents, setDocuments] = useState([]);

    useEffect(() => {
        databaseServices.getPosts([Query.equal("visibility", "public")])
            .then(response => {
                if (response) {
                    setDocuments(response.documents);
                }
            })
    }, [])
    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4'>
            {
                documents.map((videoData) => (
                    <VideoCard key={videoData.$id} {...videoData} />
                ))
            }

        </div>
    )
}

export default Home