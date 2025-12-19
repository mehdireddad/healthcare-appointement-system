import React from 'react';
import { cn } from '../../lib/utils';
import { motion } from 'framer-motion';

const Button = React.forwardRef(({ className, variant = 'primary', size = 'default', children, ...props }, ref) => {
    const variants = {
        primary: 'bg-[#0596DE] text-white hover:bg-[#0483c2] shadow-[0_4px_14px_0_rgba(5,150,222,0.39)] hover:shadow-[0_6px_20px_rgba(5,150,222,0.23)]',
        secondary: 'bg-teal-50 text-teal-700 border border-teal-200 hover:bg-teal-100',
        outline: 'bg-transparent border-2 border-[#0596DE] text-[#0596DE] hover:bg-blue-50',
        ghost: 'bg-transparent text-gray-700 hover:bg-gray-100',
        danger: 'bg-red-500 text-white hover:bg-red-600',
    };

    const sizes = {
        default: 'h-11 py-2 px-6',
        sm: 'h-9 px-3 text-xs',
        lg: 'h-12 px-8 text-lg',
        icon: 'h-10 w-10',
    };

    return (
        <motion.button
            ref={ref}
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.02 }}
            className={cn(
                'inline-flex items-center justify-center rounded-xl font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0596DE] disabled:opacity-50 disabled:pointer-events-none',
                variants[variant],
                sizes[size],
                className
            )}
            {...props}
        >
            {children}
        </motion.button>
    );
});

Button.displayName = "Button";

export { Button };
