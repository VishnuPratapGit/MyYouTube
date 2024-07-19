import { forwardRef, useId } from 'react'

const SelectVisibility = ({
    options,
    error = false,
    label,
    className = "",
    color = "black",
    ...props
}, ref) => {
    const id = useId();
    return (
        <div className="form-group font-roboto flex items-center">
            {label && <label htmlFor={id}>Visibility:</label>}
            <select
                className={`ml-4 px-2 py-1 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-32 ${className}`}
                id={id}
                ref={ref}
                {...props}
            >
                {options?.map((option) => (
                    <option className="text-black" key={option} value={option}>
                        {option.charAt(0).toUpperCase() + option.slice(1)}
                    </option>
                ))}
            </select>
            {error && <p>{error.message}</p>}
        </div>
    )
}

export default forwardRef(SelectVisibility);