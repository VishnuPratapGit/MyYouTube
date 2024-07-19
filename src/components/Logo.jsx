import React from 'react';
import { FaYoutube } from 'react-icons/fa';

function Logo({ logo = "", text = "" }) {
    return (
        <div className="flex items-center gap-0.5 cursor-pointer">
            <FaYoutube className={`text-red-500 ${logo}`} />
            <div className={` mb-0.5 select-none font-oswald ${text}`}>YouTube</div>
        </div>
    );
}

export default Logo;
