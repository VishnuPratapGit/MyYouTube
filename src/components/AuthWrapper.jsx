import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const AuthWrapper = ({ children, authentication = true }) => {
    const authStatus = useSelector(state => state.auth.status);
    const navigate = useNavigate();

    useEffect(() => {
        if (authentication && authStatus !== authentication) {
            navigate("/login")
        } else if (!authentication && authStatus !== authentication) {
            navigate("/")
        }
    }, [authStatus, navigate, authentication])

    return (
        <>{children}</>
    )
}

export default AuthWrapper

//false checks for navigate to root component or not.
//true checks for navigate to login component or not.