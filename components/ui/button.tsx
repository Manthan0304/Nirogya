import * as React from "react"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost"
  size?: "sm" | "md" | "lg"
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "md", ...props }, ref) => {
    const baseStyles =
      "font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"

    const variants = {
      default: "bg-primary text-white hover:bg-primary-dark focus:ring-primary",
      outline: "border border-border text-foreground hover:bg-input focus:ring-primary",
      ghost: "text-foreground hover:bg-input focus:ring-primary",
    }

    const sizes = {
      sm: "px-3 py-1.5 text-sm",
      md: "px-4 py-2 text-base",
      lg: "px-6 py-3 text-lg",
    }

    return (
      <button className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className || ""}`} ref={ref} {...props} />
    )
  },
)
Button.displayName = "Button"

export { Button }
