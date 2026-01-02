import React from 'react';

interface ButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    className?: string;
    disabled?: boolean;
    type?: 'button' | 'submit' | 'reset';
    style?: React.CSSProperties;
}

export const Button: React.FC<ButtonProps> = ({ 
    children, 
    onClick, 
    variant = 'primary', 
    className = '',
    disabled = false,
    type = 'button',
    style
}) => {
    // Luxe Minimalist Base Styles: Square corners, Uppercase, Tracking
    const baseStyles = "px-6 py-3 rounded-none font-medium uppercase tracking-widest text-xs transition-all duration-300 flex items-center justify-center gap-2";
    
    const variants = {
        // Primary: Black background, White text (as per CSS .cta-principal)
        primary: "bg-black text-white border-2 border-black hover:bg-gray-800 hover:border-gray-800",
        
        // Secondary: Gold text, Gold border (as per CSS .cta-secondaire)
        secondary: "bg-transparent text-equidex-gold border border-equidex-gold hover:bg-equidex-gold hover:text-white",
        
        // Outline: White border (for dark backgrounds)
        outline: "bg-transparent text-white border border-white hover:bg-white hover:text-black",
        
        // Ghost: Subtle
        ghost: "text-gray-600 hover:text-black hover:bg-gray-50"
    };

    const disabledStyles = "opacity-50 cursor-not-allowed";

    return (
        <button 
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`${baseStyles} ${variants[variant]} ${disabled ? disabledStyles : ''} ${className}`}
            style={style}
        >
            {children}
        </button>
    );
};