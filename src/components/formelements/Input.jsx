import React, { useId } from 'react'

const Input = React.forwardRef(function Input({
    label,
    placeholder,
    type = "text",
    className = "",
    error = false,
    ...props
}, ref) {
    const id = useId()
    return (
        <div className='w-full'>
            {label && <label
                className={`inline-block mb-1 pl-1`}
                htmlFor={id}>
                {label}
            </label>
            }
            <input
                type={type}
                className={`px-3 py-2 border-2 focus:border-blue-600 rounded-lg outline-none dark:bg-neutral-800 w-full ${className}`}
                ref={ref}
                spellCheck="false"
                placeholder={error ? error.message : placeholder}
                {...props}
                id={id}
            />
        </div>
    )
})

export default Input