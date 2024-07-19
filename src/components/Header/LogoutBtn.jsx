import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth'
import { logout } from '../../redux/authSlice';

const LogoutBtn = () => {
    const dispatch = useDispatch();

    async function logoutHandler() {
        authService.logout()
            .then(() => dispatch(logout()))
            .catch(() => {
                alert("Logout Issue: ", error);
            })
    }

    return (
        <button className='bg-rose-500 text-white font-semibold text-sm px-3 py-2 border-2 border-transparent hover:bg-red-600 hover:dark:border-white rounded-lg font-roboto' onClick={logoutHandler}>Logout</button>
    )
}

export default LogoutBtn;