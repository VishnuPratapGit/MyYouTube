import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth'
import { logout } from '../../redux/authSlice';
import { LogOut } from 'lucide-react';

const LogoutBtn = ({ className }) => {
    const dispatch = useDispatch();

    async function logoutHandler() {
        authService.logout()
            .then(() => dispatch(logout()))
            .catch(() => {
                alert("Logout Issue: ", error);
            })
    }

    return (
        <>
            <button className={`sm:block sm:bg-rose-500 ${className} text-white font-semibold text-sm sm:px-3 sm:py-2 border-2 border-transparent sm:hover:bg-red-600 sm:hover:dark:border-white rounded-lg font-roboto`} onClick={logoutHandler}>
                <span className='sm:inline hidden'>Logout</span>
                <LogOut className='sm:hidden' size={18} strokeWidth={3} />
            </button>
        </>
    )
}

export default LogoutBtn;