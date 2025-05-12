import React from "react";
import { Plus } from "lucide-react";

interface PageHeaderProps {
  title: string;
  subtitle: string;
  buttonText: string;
  onButtonClick: () => void;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  buttonText,
  onButtonClick,
}) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          {title}
        </h1>
        <p className="text-muted-foreground">{subtitle}</p>
      </div>
      <button
        onClick={onButtonClick}
        className="flex items-center justify-center px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
      >
        <Plus className="h-5 w-5 ml-1 rtl:mr-1 rtl:ml-0" />
        {buttonText}
      </button>
    </div>
  );
};

export default PageHeader;
