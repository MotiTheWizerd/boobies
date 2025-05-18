import React from "react";

interface ErrorMessageProps {
  message: string | null;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  if (!message) return null;

  return (
    <div className="bg-destructive/10 border border-destructive/20 text-destructive rounded-md p-4">
      {message}
    </div>
  );
};

export default ErrorMessage;
