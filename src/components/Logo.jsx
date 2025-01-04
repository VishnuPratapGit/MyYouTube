import React from 'react';
import { FaYoutube } from 'react-icons/fa';

function Logo({ logo = "", text = "" }) {
    return (
        <div className="flex items-center gap-0.5 cursor-pointer">
            <img src="/logoipsum.svg" className={`h-5 mr-2`}/>
            <div className={` mb-0.5 select-none font-oswald ${text}`}>videoshare</div>
        </div>
    );
}

export default Logo;
