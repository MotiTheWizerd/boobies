import React from "react";
import { VariantProps, cva } from "class-variance-authority";
import { cn } from "../../../../../app/utils/cn";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20",
        secondary:
          "bg-gray-100 text-gray-800 border border-gray-200 hover:bg-gray-200/80",
        success:
          "bg-green-100 text-green-800 border border-green-200 hover:bg-green-200/80",
        warning:
          "bg-yellow-100 text-yellow-800 border border-yellow-200 hover:bg-yellow-200/80",
        danger:
          "bg-red-100 text-red-800 border border-red-200 hover:bg-red-200/80",
        info: "bg-blue-100 text-blue-800 border border-blue-200 hover:bg-blue-200/80",
      },
      size: {
        default: "h-6 px-2.5 py-0.5 text-xs",
        sm: "h-5 px-2 py-0 text-xs",
        lg: "h-7 px-3 py-1 text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  children: React.ReactNode;
}

function Badge({ className, variant, size, ...props }: BadgeProps) {
  return (
    <div
      className={cn(badgeVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
