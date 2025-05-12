import React from "react";

interface LoadingSpinnerProps {
  show: boolean;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ show }) => {
  if (!show) return null;

  return (
    <div className="bg-card text-card-foreground rounded-lg border border-border shadow-sm p-8 flex justify-center">
      <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
    </div>
  );
};

export default LoadingSpinner;
