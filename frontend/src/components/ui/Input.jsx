import React from 'react';
import { cn } from '../../lib/utils';

const Input = React.forwardRef(({ className, type, ...props }, ref) => {
    return (
        <input
            type={type}
            className={cn(
                "flex h-12 w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-2 text-sm font-medium placeholder:text-slate-400 focus:outline-none focus:border-[#0596DE] focus:ring-4 focus:ring-[#0596DE]/10 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200",
                className
            )}
            ref={ref}
            {...props}
        />
    )
})
Input.displayName = "Input"

export { Input }
