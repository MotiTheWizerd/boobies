"use client";
import React, { useState, useRef, ReactNode } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface CarouselProps<T> {
  /**
   * Array of data items to display in the carousel
   */
  items: T[];

  /**
   * Render function that receives an item and index and returns a ReactNode
   */
  renderItem: (item: T, index: number) => ReactNode;

  /**
   * Optional title to display above the carousel
   */
  title?: string;

  /**
   * Whether the title should have an underline
   */
  titleUnderline?: boolean;

  /**
   * Custom classes for the title
   */
  titleClassName?: string;

  /**
   * Custom classes for the container
   */
  containerClassName?: string;

  /**
   * Custom classes for the items container
   */
  itemsContainerClassName?: string;

  /**
   * The amount to scroll on button click
   */
  scrollAmount?: number;

  /**
   * Whether to show navigation arrows
   */
  showArrows?: boolean;

  /**
   * Whether the content is RTL
   */
  rtl?: boolean;

  /**
   * Whether to show faded edges
   */
  fadedEdges?: boolean;

  /**
   * Gap between items (tailwind gap class)
   */
  gap?: string;

  /**
   * Optional classes for each item wrapper
   */
  itemWrapperClassName?: string;
}

/**
 * A reusable carousel component that can display any content
 */
function Carousel<T>({
  items,
  renderItem,
  title,
  titleUnderline = true,
  titleClassName = "text-2xl font-bold text-center relative text-gray-900 dark:text-gray-100",
  containerClassName = "py-4",
  itemsContainerClassName = "py-4 px-8",
  scrollAmount = 300,
  showArrows = true,
  rtl = false,
  fadedEdges = true,
  gap = "gap-8 md:gap-10",
  itemWrapperClassName = "flex-shrink-0 p-2",
}: CarouselProps<T>) {
  const [isHovering, setIsHovering] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll the carousel left or right
  const scroll = (direction: "left" | "right") => {
    if (containerRef.current) {
      // Adjust scroll direction based on RTL setting
      const adjustedDirection = rtl
        ? direction === "left"
          ? "right"
          : "left"
        : direction;

      const amount =
        adjustedDirection === "left" ? -scrollAmount : scrollAmount;

      containerRef.current.scrollBy({
        left: amount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className={containerClassName}>
      {title && (
        <h2 className={titleClassName}>
          <span className="relative">
            {title}
            {titleUnderline && (
              <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-pink-500 to-purple-500" />
            )}
          </span>
        </h2>
      )}

      <div
        className="relative mt-4"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {/* Right Arrow */}
        {showArrows && isHovering && items.length > 0 && (
          <button
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full p-3 shadow-lg z-10 hover:bg-purple-50 dark:hover:bg-purple-900/50 transition-colors"
            onClick={() => scroll(rtl ? "left" : "right")}
            aria-label={rtl ? "Previous" : "Next"}
          >
            <FaChevronRight className="text-purple-700 dark:text-purple-300" />
          </button>
        )}

        {/* Carousel Items */}
        <div
          className={`flex overflow-x-auto ${gap} ${itemsContainerClassName} no-scrollbar`}
          ref={containerRef}
          style={
            fadedEdges
              ? {
                  maskImage:
                    "linear-gradient(to right, transparent, black 5%, black 95%, transparent)",
                  WebkitMaskImage:
                    "linear-gradient(to right, transparent, black 5%, black 95%, transparent)",
                }
              : undefined
          }
          dir={rtl ? "rtl" : "ltr"}
        >
          {items.map((item, index) => (
            <div key={index} className={itemWrapperClassName}>
              {renderItem(item, index)}
            </div>
          ))}
        </div>

        {/* Left Arrow */}
        {showArrows && isHovering && items.length > 0 && (
          <button
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full p-3 shadow-lg z-10 hover:bg-purple-50 dark:hover:bg-purple-900/50 transition-colors"
            onClick={() => scroll(rtl ? "right" : "left")}
            aria-label={rtl ? "Next" : "Previous"}
          >
            <FaChevronLeft className="text-purple-700 dark:text-purple-300" />
          </button>
        )}
      </div>
    </div>
  );
}

export default Carousel;
