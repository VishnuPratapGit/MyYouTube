import { Button, Logo, Search } from "../index";
import { BiSolidVideoPlus } from "react-icons/bi";
import { IoNotifications, IoMenu, IoCloseSharp } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import LogoutBtn from "./LogoutBtn";
import LoginRegisterBtn from "./LoginRegisterBtn";
import { useNavigate, Link } from "react-router-dom";

const Header = ({ toggleSidebar, isSidebarOpen, studio, toggleCreate }) => {
    const authStatus = useSelector((state) => state.auth.status);
    const navigate = useNavigate();

    return (
        <div className="flex lg:h-[10svh] justify-between gap-2 items-center border-b border-stone-800 px-8">
            <div className="flex items-center gap-3 md:gap-5">
                {isSidebarOpen ? (
                    <IoCloseSharp
                        className="cursor-pointer md:text-xl lg:text-3xl"
                        onClick={toggleSidebar}
                    />
                ) : (
                    <IoMenu
                        className="cursor-pointer md:text-xl lg:text-3xl"
                        onClick={toggleSidebar}
                    />
                )}
                <Link to={"/"}><Logo logo="text-xl md:text-3xl" text="text-lg md:text-xl" /></Link>
            </div>

            <div className="w-1/2 lg:w-2/5 flex justify-center">
                <Search className="w-full min-w-[10rem]" />
            </div>

            {studio ? (
                <div onClick={toggleCreate} className="flex items-center gap-2 md:gap-5">
                    <Button className="flex items-center gap-1 dark:bg-neutral-600">
                        <BiSolidVideoPlus className="md:text-xl lg:text-2xl" />
                        <h2 className="font-roboto font-semibold">Create</h2>
                    </Button>
                    <FaUserCircle className="cursor-pointer md:text-xl lg:text-2xl" />
                </div>
            ) : (
                authStatus ? (
                    <div className="flex items-center gap-2 md:gap-5">
                        <BiSolidVideoPlus
                            className="cursor-pointer md:text-xl lg:text-2xl"
                            onClick={() => navigate("/studio")}
                        />
                        <IoNotifications className="cursor-pointer md:text-xl lg:text-2xl" />
                        <FaUserCircle className="cursor-pointer md:text-xl lg:text-2xl" />
                        <LogoutBtn />
                    </div>
                ) : (
                    <LoginRegisterBtn />
                )
            )}
        </div>
    );
};

export default Header;
