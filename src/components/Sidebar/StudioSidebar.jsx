import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import {
    House,
    LayoutDashboard,
    SquarePlay,
    AreaChart,
    MessageSquareText,
    Captions,
    Copyright,
    IndianRupee,
    MessageSquareWarning,
    Settings,
} from "lucide-react";

const StudioSidebar = () => {
    const userData = useSelector((state) => state.auth.userData);

    const sideLinks = [
        [],
        [
            { icon: <House />, name: "Youtube", url: "/" },
            { icon: <LayoutDashboard />, name: "Dashboard", url: "/dashboard" },
            { icon: <SquarePlay />, name: "Content", url: "/content" },
            { icon: <AreaChart />, name: "Analytics", url: "/analytics" },
            { icon: <MessageSquareText />, name: "Comments", url: "/commnets" },
            { icon: <Captions />, name: "Subtitles", url: "/subtitles" },
            { icon: <Copyright />, name: "Copyright", url: "/Copyright" },
            { icon: <IndianRupee />, name: "Earn", url: "/earn" },
        ],
        [
            {
                icon: <MessageSquareWarning />,
                name: "Give Feedback",
                url: "/feedback",
            },
            { icon: <Settings />, name: "Settings", url: "/settings" },
        ],
    ];

    return (
        <div
            className={`sidebar max-w-[20%] min-w-[16rem] h-[90vh] py-5 overflow-y-auto bg-white dark:bg-stone-950 border-r border-neutral-800`}
        >
            <div className="grid place-content-center gap-4">
                <div className="border-2 border-neutral-900 dark:border-slate-100 w-28 h-28 rounded-full"></div>
                <h1 className="text-center font-roboto font-semibold">
                    {userData ? userData.name : "Channel Name"}
                </h1>
            </div>

            {sideLinks.map((categories, categoryIndex) => (
                <div
                    key={categoryIndex}
                    className="flex flex-col cursor-pointer select-none"
                >
                    {categories.map((items) => (
                        <NavLink
                            to={items.url}
                            key={items.name}
                            className={({ isActive }) => {
                                const baseClass =
                                    "flex items-center gap-5 rounded-lg px-5 py-2 mx-5 my-1 dark:hover:bg-neutral-900 hover:bg-neutral-200";
                                const activeClass = "bg-neutral-200 dark:bg-neutral-800";
                                return isActive ? `${baseClass} ${activeClass}` : baseClass;
                            }}
                        >
                            <div className="text-xl">{items.icon}</div>
                            {items.name}
                        </NavLink>
                    ))}
                    <hr className="border-t w-4/5 border-stone-800 my-5 self-center" />
                </div>
            ))}
            <div className="px-5 py-2 mx-5 my-1 text-sm font-roboto font-[500] text-neutral-400">
                About Press Copyright Contact us Creators Advertise Developers
                TermsPrivacyPolicy & Safety How YouTube works Test new features © 2024
                Google LLC
            </div>
        </div>
    );
};
export default StudioSidebar;
