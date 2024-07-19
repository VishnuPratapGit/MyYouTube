import React from 'react'
import TextareaAutosize from "react-textarea-autosize";

const TextArea = ({ textAreaLength, ...props }, ref) => {
    return (
        <div className="relative">
            <TextareaAutosize
                ref={ref}
                className={`${textAreaLength > 5000
                    ? "border-red-500 focus:border-red-500"
                    : "border-neutral-300 dark:border-neutral-600"
                    } scroll-hidden p-4 rounded-lg outline-none dark:bg-neutral-800 w-full border bg-transparent focus:border-2 focus:border-blue-600 mb-4 h-40 resize-none`}
                minRows={6}
                placeholder="Description"
                {...props}
            />
            <span
                className={`absolute font-roboto font-semibold ${textAreaLength > 5000
                    ? "text-red-500"
                    : "text-stone-400"
                    } text-xs bottom-6 right-2`}
            >
                {textAreaLength}/5000
            </span>
        </div>
    )
}

export default React.forwardRef(TextArea) 