import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import databaseServices from '../appwrite/database';

const MainVideo = () => {
    const { videoId } = useParams();

    return (
        <div className='flex h-full justify-center items-center'>
            <video
                className="h-[95%] rounded-lg shadow-lg"
                src={databaseServices.getFilePreview(videoId)}
                controls
                autoPlay
                playsInline
            ></video>
        </div>
    );
};

export default MainVideo;
