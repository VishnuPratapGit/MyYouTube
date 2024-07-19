import React from "react";

const Button = ({
    children,
    type = "button",
    bgColor = "bg-blue-600",
    textColor = "text-white",
    className = "",
    ...props }) => {
    return (
        <button className={`${bgColor} ${textColor} hover:bg-blue-700 px-2 py-1 rounded-md border-2 border-transparent hover:dark:border-white ${className}`} {...props}>
            {children}
        </button>
    )
}

export default Button