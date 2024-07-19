import { FcHome } from 'react-icons/fc';
import { SiYoutubeshorts } from 'react-icons/si';
import { MdSubscriptions, MdWatchLater } from 'react-icons/md';
import { PiUserSquareFill, PiVideoFill } from 'react-icons/pi';
import { FaHistory } from 'react-icons/fa';
import { BiSolidLike } from 'react-icons/bi';
import { ImFire } from 'react-icons/im';
import { RiShoppingBag4Fill, RiPlayList2Fill } from 'react-icons/ri';
import { SiYoutubestudio } from 'react-icons/si';
import { IoSettings } from 'react-icons/io5';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
    const sideLinks = [
        [
            { icon: <FcHome />, name: "Home", url: "/" },
            { icon: <SiYoutubeshorts />, name: "Shorts", url: "/shorts" },
            { icon: <MdSubscriptions />, name: "Subscription", url: "/subscription" },
        ],
        [
            { icon: <PiUserSquareFill />, name: "Your Channel", url: "/yourchannel" },
            { icon: <FaHistory />, name: "History", url: "/history" },
            { icon: <RiPlayList2Fill />, name: "Playlists", url: "/playlists" },
            { icon: <PiVideoFill />, name: "Your Videos", url: "/yourvideo" },
            { icon: <MdWatchLater />, name: "Watch Later", url: "/watchlater" },
            { icon: <BiSolidLike />, name: "Liked Videos", url: "/likedvideos" },
        ],
        [
            { icon: <ImFire />, name: "Trending", url: "/trending" },
            { icon: <RiShoppingBag4Fill />, name: "Shopping", url: "/shopping" },

        ],
        [
            { icon: <SiYoutubestudio />, name: "YouTube Studio", url: "/studio" },
            { icon: <IoSettings />, name: "Settings", url: "/settings" }
        ]
    ];

    return (
        <div className={`sidebar max-w-[20%] min-w-[16rem] h-[90vh] py-5 overflow-y-auto bg-white dark:bg-stone-950 border-r border-neutral-800`}>
            {sideLinks.map((categories, categoryIndex) => (
                <div key={categoryIndex} className='flex flex-col cursor-pointer select-none'>
                    {categories.map((items) => (
                        <NavLink
                            to={items.url}
                            key={items.name}
                            className={({ isActive }) => {
                                const baseClass = "flex items-center gap-5 rounded-lg px-5 py-2 mx-5 my-1 dark:hover:bg-neutral-900 hover:bg-neutral-200";
                                const activeClass = "bg-neutral-200 dark:bg-neutral-800";
                                return isActive ? `${baseClass} ${activeClass}` : baseClass;
                            }}
                        >
                            <div className='text-xl'>{items.icon}</div>
                            {items.name}
                        </NavLink>
                    ))}
                    <hr className='border-t w-4/5 border-stone-800 my-5 self-center' />
                </div>
            ))}
            <div className='px-5 py-2 mx-5 my-1 text-sm font-roboto font-[500] text-neutral-400'>
                About Press Copyright Contact us Creators Advertise Developers TermsPrivacyPolicy & Safety How YouTube works
                Test new features © 2024 Google LLC
            </div>
        </div>
    )
}

export default Sidebar 