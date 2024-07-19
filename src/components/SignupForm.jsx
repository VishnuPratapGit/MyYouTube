import React, { useState } from 'react'
import { Input, Button } from './index'
import { useForm } from 'react-hook-form'
import authService from '../appwrite/auth'
import { useDispatch } from 'react-redux'
import { login } from '../redux/authSlice'
import { useNavigate } from 'react-router-dom'
import { PreLoader } from './index'


const SignupForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    async function onSubmit(data) {
        setLoading(true);
        try {
            const session = await authService.createAccount({ ...data });
            if (session) {
                authService.getCurrentUser()
                    .then((userData) => {
                        dispatch(login(userData));
                        navigate("/");
                    })
            }
        } catch (error) {
            alert(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <Input label="Name" type="text" {...register("name", {
                required: "Name is required",
            })} />
            <p className='text-red-500 min-h-5 my-1 font-roboto font-semibold text-sm'>{errors.name?.message}</p>

            <Input label="Email" type="text"{...register("email", {
                required: "Email is required",
                validate: {
                    matchPattern: (value) =>
                        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) || "Email address must be a valid address",
                }
            })}
            />
            <p className='text-red-500 min-h-5 my-1 font-roboto font-semibold text-sm'>{errors.email?.message}</p>

            <Input label="Password" type="password" {...register("password", {
                required: "Password is required",
                minLength: {
                    value: 8,
                    message: "Password must be between 8 and 265 characters long"
                }
            })} />
            <p className='text-red-500 min-h-5 my-1 font-roboto font-semibold text-sm'>{errors.password?.message}</p>

            {/* PRELOADER */}
            <div className='flex justify-center items-center'>
                {loading && <PreLoader type="spin" color="gray" />}
            </div>

            <Button className='w-full mt-4'>Submit</Button>
        </form>
    )
}

export default SignupForm