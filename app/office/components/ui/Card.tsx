import React from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Card({ className, ...props }: CardProps) {
  return (
    <div
      className={`bg-gray-850 rounded-lg border border-gray-700 shadow-md ${
        className || ""
      }`}
      {...props}
    />
  );
}

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

export function CardHeader({ className, ...props }: CardHeaderProps) {
  return (
    <div
      className={`p-6 pb-3 flex flex-col space-y-1.5 ${className || ""}`}
      {...props}
    />
  );
}

interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}

export function CardTitle({ className, ...props }: CardTitleProps) {
  return (
    <h3
      className={`text-lg font-semibold leading-none tracking-tight text-gray-100 ${
        className || ""
      }`}
      {...props}
    />
  );
}

interface CardDescriptionProps
  extends React.HTMLAttributes<HTMLParagraphElement> {}

export function CardDescription({ className, ...props }: CardDescriptionProps) {
  return (
    <p className={`text-sm text-gray-400 ${className || ""}`} {...props} />
  );
}

interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {}

export function CardContent({ className, ...props }: CardContentProps) {
  return <div className={`p-6 pt-0 ${className || ""}`} {...props} />;
}

interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

export function CardFooter({ className, ...props }: CardFooterProps) {
  return (
    <div
      className={`p-6 pt-0 flex items-center ${className || ""}`}
      {...props}
    />
  );
}
