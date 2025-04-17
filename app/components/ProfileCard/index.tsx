import React, { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import PlaceholderImage from "../Common/PlaceholderImage";
import { profileCardAnimation } from "../../utils/animations";
import { FaFire, FaCrown, FaStar, FaHourglassHalf } from "react-icons/fa";

interface ProfileCardProps {
  name: string;
  imageUrl: string;
  isHot?: boolean;
  isPremium?: boolean;
  isHappyHour?: boolean;
  isTop?: boolean;
  delay?: number;
  showStats?: boolean;
}

const ProfileCard = ({
  name,
  imageUrl,
  isHot = false,
  isPremium = false,
  isHappyHour = false,
  isTop = false,
  delay = 0,
  showStats = false,
}: ProfileCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Get initials for fallback
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .substring(0, 2);

  return (
    <motion.div
      ref={ref}
      className="relative flex flex-col items-center"
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={profileCardAnimation}
      transition={{ delay: delay * 0.1 }}
    >
      <div className="relative">
        {/* Badges - positioned outside the card container but with proper positioning */}
        {isHot && (
          <motion.div
            className="absolute -top-2 -right-2 hot-badge z-20 flex items-center gap-1"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 500 }}
            style={{
              background: "linear-gradient(135deg, #ff4d4d, #ff1a1a)",
              color: "white",
              padding: "2px 6px",
              borderRadius: "4px",
              fontSize: "10px",
              fontWeight: "bold",
              boxShadow: "0 2px 5px rgba(255, 0, 0, 0.3)",
            }}
          >
            <FaFire className="text-yellow-300" />
            HOT
          </motion.div>
        )}

        {isPremium && (
          <motion.div
            className="absolute -bottom-2 -right-2 premium-badge flex items-center gap-1 z-20"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 500 }}
            whileHover={{
              scale: 1.1,
              boxShadow: "0 0 15px rgba(255, 215, 0, 0.7)",
              transition: { duration: 0.2 },
            }}
            style={{
              background: "linear-gradient(135deg, #ffd700, #ffb700)",
              color: "black",
              padding: "2px 6px",
              borderRadius: "4px",
              fontSize: "10px",
              fontWeight: "bold",
              boxShadow: "0 2px 5px rgba(255, 215, 0, 0.5)",
            }}
          >
            <FaCrown className="text-amber-900" />
            PREMIUM
          </motion.div>
        )}

        {isTop && (
          <motion.div
            className="absolute -top-2 -left-2 top-badge flex items-center gap-1 z-20"
            initial={{ scale: 0, rotate: -10, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            transition={{ delay: 0.4, type: "spring", stiffness: 500 }}
            whileHover={{
              scale: 1.1,
              rotate: 5,
              transition: { duration: 0.2 },
            }}
            style={{
              background: "linear-gradient(135deg, #9c27b0, #673ab7)",
              color: "white",
              padding: "2px 6px",
              borderRadius: "4px",
              fontSize: "10px",
              fontWeight: "bold",
              boxShadow: "0 2px 5px rgba(156, 39, 176, 0.5)",
            }}
          >
            <FaStar className="text-yellow-300" />
            TOP
          </motion.div>
        )}

        {/* Circular image container with hover effects */}
        <div
          className="relative h-36 w-36 rounded-full"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Ring glow effect - more subtle and elegant */}
          <motion.div
            className="absolute inset-0 rounded-full"
            initial={{ opacity: 0 }}
            animate={{
              opacity: isHovered ? 1 : 0,
              scale: isHovered ? 1.06 : 1,
            }}
            transition={{ duration: 0.3 }}
            style={{
              background:
                "radial-gradient(circle at center, transparent 60%, rgba(147, 51, 234, 0.5) 70%, rgba(147, 51, 234, 0.2) 80%, transparent 100%)",
              pointerEvents: "none",
              zIndex: 5,
            }}
          />

          {/* Profile image */}
          <motion.div
            className="relative h-full w-full rounded-full overflow-hidden"
            animate={{
              scale: isHovered ? 1.03 : 1,
              boxShadow: isHovered
                ? "0 0 0 3px rgba(147, 51, 234, 0.3)"
                : "none",
            }}
            transition={{ duration: 0.3 }}
            style={{ zIndex: 10 }}
          >
            <PlaceholderImage
              src={imageUrl}
              alt={`Profile photo of ${name}`}
              fill
              style={{ objectFit: "cover" }}
              className="rounded-full"
              initials={initials}
            />
          </motion.div>

          {/* Stats with animations - only shown when showStats is true */}
          {showStats && (
            <motion.div
              className="absolute bottom-0 left-0 right-0 flex justify-between p-1 bg-black/50 backdrop-blur-sm z-10 rounded-b-full"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <motion.div className="heart-count" whileHover={{ scale: 1.1 }}>
                <span className="heart-icon">❤️</span>
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  12
                </motion.span>
              </motion.div>

              <motion.div className="view-count" whileHover={{ scale: 1.1 }}>
                <span className="view-icon">👁️</span>
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                >
                  246
                </motion.span>
              </motion.div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Happy Hour Badge with pulse animation */}
      {isHappyHour && (
        <motion.div
          className="happy-hour-badge mt-3 flex items-center gap-1"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4, type: "spring", stiffness: 400 }}
          whileHover={{ scale: 1.05 }}
          style={{
            background: "linear-gradient(135deg, #ff9a9e, #fad0c4)",
            color: "#333",
            padding: "3px 8px",
            borderRadius: "12px",
            fontSize: "10px",
            fontWeight: "bold",
            marginTop: "8px",
            boxShadow: "0 2px 5px rgba(255, 154, 158, 0.5)",
          }}
        >
          <FaHourglassHalf className="text-pink-700" />
          HAPPY HOUR
        </motion.div>
      )}

      {/* Name with text reveal animation */}
      <motion.h3
        className="mt-2 text-center font-medium text-gray-900 dark:text-gray-100"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.3 }}
      >
        {name}
      </motion.h3>
    </motion.div>
  );
};

export default ProfileCard;
