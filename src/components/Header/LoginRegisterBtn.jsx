import React from 'react'
import { useNavigate } from 'react-router-dom'

const LoginRegisterBtn = () => {
    const navigate = useNavigate();

    return (
        <button
            className="bg-white text-black hover:dark:bg-zinc-200 rounded-lg font-roboto text-sm px-3 py-2 hover:shadow-md font-semibold border-2 border-black"
            onClick={() => navigate("/login")}
        >
            Login/Register
        </button>
    )
}

export default LoginRegisterBtn