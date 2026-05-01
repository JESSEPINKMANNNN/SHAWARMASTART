import * as React from "react"
import { cn } from "@/lib/utils"

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "default" | "primary" | "secondary" | "outline" | "ghost" | "link";
    size?: "default" | "sm" | "lg" | "icon";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "default", size = "default", ...props }, ref) => {
        return (
            <button
                ref={ref}
                className={cn(
                    "inline-flex items-center justify-center whitespace-nowrap rounded-lg font-heading font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-95",
                    {
                        "bg-primary text-primary-foreground hover:bg-primary/90 shadow-md hover:shadow-lg": variant === "default" || variant === "primary",
                        "bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow-sm": variant === "secondary",
                        "border border-border bg-background hover:bg-muted": variant === "outline",
                        "hover:bg-muted": variant === "ghost",
                        "text-primary underline-offset-4 hover:underline": variant === "link",
                        "h-10 px-5 text-sm": size === "default",
                        "h-9 rounded-md px-3 text-xs": size === "sm",
                        "h-12 rounded-xl px-8 text-base": size === "lg",
                        "h-10 w-10": size === "icon",
                    },
                    className
                )}
                {...props}
            />
        )
    }
)
Button.displayName = "Button"

export { Button }
