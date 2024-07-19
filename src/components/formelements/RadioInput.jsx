import React, { forwardRef, useId } from 'react'

const RadioInput = forwardRef(({ label, ...props }, ref) => {
    const id = useId()
    return (
        <div className="flex items-center gap-3 py-0.5">
            <input
                type="radio"
                id={id}
                ref={ref}
                {...props}
            />
            <label htmlFor={id}>{label}</label>
        </div>
    )
})

export default RadioInput