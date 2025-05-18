import React, { useState, useEffect, useRef } from "react";
import { MoreVertical } from "lucide-react";
import Link from "next/link";

export interface MenuItem {
  icon?: React.ReactNode;
  label: string;
  href?: string;
  onClick?: () => void;
  variant?: "default" | "danger";
}

interface DropdownMenuProps {
  items: MenuItem[];
  align?: "left" | "right";
  triggerIcon?: React.ReactNode;
}

const DropdownMenu = ({
  items,
  align = "right",
  triggerIcon = <MoreVertical className="h-5 w-5 text-muted-foreground" />,
}: DropdownMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });

  // Calculate menu position
  useEffect(() => {
    if (isOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const menuWidth = 192; // w-48 = 12rem = 192px

      // Position the menu based on align prop
      setMenuPosition({
        top: rect.bottom + 5,
        left:
          align === "right"
            ? Math.max(0, rect.left - menuWidth + rect.width)
            : rect.left,
      });
    }
  }, [isOpen, align]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block">
      <button
        ref={buttonRef}
        className="p-1 rounded-full hover:bg-accent"
        onClick={() => setIsOpen(!isOpen)}
      >
        {triggerIcon}
      </button>

      {isOpen && (
        <div
          ref={menuRef}
          className="z-50 w-48 mt-2 origin-top-right bg-background dark:bg-gray-800 text-foreground rounded-md shadow-lg border border-border"
          style={{
            position: "fixed",
            top: menuPosition.top,
            left: menuPosition.left,
          }}
        >
          <div className="py-1" role="menu" aria-orientation="vertical">
            {items.map((item, index) => {
              const className = `flex items-center px-4 py-2 text-sm ${
                item.variant === "danger"
                  ? "text-destructive hover:bg-destructive/10 font-medium"
                  : "text-foreground hover:bg-accent/80"
              }`;

              return item.href ? (
                <Link
                  key={index}
                  href={item.href}
                  className={className}
                  onClick={() => setIsOpen(false)}
                >
                  {item.icon && <span className="ml-2">{item.icon}</span>}
                  {item.label}
                </Link>
              ) : (
                <button
                  key={index}
                  className={`w-full ${className}`}
                  onClick={() => {
                    if (item.onClick) item.onClick();
                    setIsOpen(false);
                  }}
                >
                  {item.icon && <span className="ml-2">{item.icon}</span>}
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
