import React from 'react'
import { SignupForm, Logo } from '../components/index'
import { Link } from 'react-router-dom'

const Signup = () => {
    return (
        <div className='flex flex-col w-full items-center justify-center h-full'>
            <div className='border-2 p-5 rounded-2xl'>
                <div className="mb-2 flex justify-center">
                    <Logo logo='text-5xl' text='text-3xl' />
                </div>
                <h2 className="text-center text-2xl font-roboto font-semibold mt-6">Register to create account</h2>
                <p className="mt-2 font-roboto text-center mb-6">Already have an account?&nbsp;
                    <Link to="/login" className="font-medium text-primary transition-all duration-200 hover:underline text-blue-500">Login</Link>
                </p>
                <SignupForm />
            </div>
        </div>
    )
}

export default Signup