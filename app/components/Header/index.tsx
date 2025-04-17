"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import PlaceholderImage from "../Common/PlaceholderImage";
import { buttonAnimation, slideDown } from "../../utils/animations";
import ThemeToggle from "../ThemeToggle";

const Header = () => {
  const [languageHovered, setLanguageHovered] = useState(false);
  const [signupHovered, setSignupHovered] = useState(false);
  const [loginHovered, setLoginHovered] = useState(false);

  return (
    <motion.header
      className="bg-white dark:bg-gray-900 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100 dark:border-gray-800"
      initial="hidden"
      animate="visible"
      variants={slideDown}
      dir="rtl"
    >
      <div
        className="container mx-auto px-4 py-2"
        style={{
          direction: "rtl",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "row-reverse",
        }}
      >
        <div className="flex items-center gap-3" style={{ order: 3 }}>
          <ThemeToggle />

          <motion.button
            className="border rounded-full px-4 py-2 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800 dark:border-gray-700 transition-colors"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              flexDirection: "row-reverse",
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            onHoverStart={() => setLanguageHovered(true)}
            onHoverEnd={() => setLanguageHovered(false)}
          >
            <span className="text-sm">עברית</span>
            <motion.svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
              animate={{ rotate: languageHovered ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <path d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z" />
            </motion.svg>
          </motion.button>
        </div>

        <div
          style={{
            order: 2,
            flex: 1,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <motion.div
            className="relative h-16 w-60"
            whileHover={{
              scale: 1.05,
              transition: { duration: 0.2 },
            }}
          >
            <PlaceholderImage
              src="/images/logo.png"
              alt="לוגו פאבליש בורד"
              fill
              style={{ objectFit: "contain" }}
              priority
              fallbackSrc="/images/placeholder-logo.png"
            />
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0 }}
              whileHover={{ opacity: 0.1 }}
              transition={{ duration: 0.3 }}
            >
              <motion.h1
                className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                פאבליש בורד
              </motion.h1>
            </motion.div>
          </motion.div>
        </div>

        <div
          style={{
            order: 1,
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <motion.button
            className="relative overflow-hidden bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full px-4 py-1"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              flexDirection: "row-reverse",
            }}
            variants={buttonAnimation}
            initial="idle"
            whileHover="hover"
            whileTap="tap"
            onHoverStart={() => setSignupHovered(true)}
            onHoverEnd={() => setSignupHovered(false)}
          >
            <motion.span
              className="absolute inset-0 bg-gradient-to-r from-pink-400 to-purple-400 opacity-0"
              animate={{ opacity: signupHovered ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            />
            <span className="relative z-10">רישום</span>
            <motion.svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
              initial={{ scale: 1 }}
              animate={{ scale: signupHovered ? 1.1 : 1 }}
              transition={{ duration: 0.2 }}
            >
              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c0-.001-.001-.006-.002-.008C12.928 9.678 11.022 8 8 8s-4.928 1.679-4.998 3.988c0 .002 0 .007-.002.008C3.001 12.005 3 13 3 13h10c0 0-.001-.995-.001-1.004z" />
            </motion.svg>
          </motion.button>

          <motion.button
            className="border border-purple-200 hover:border-purple-300 dark:border-purple-900 dark:hover:border-purple-800 rounded-full px-4 py-1 relative overflow-hidden text-gray-900 dark:text-white"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              flexDirection: "row-reverse",
            }}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 2px 10px rgba(138, 43, 226, 0.1)",
            }}
            whileTap={{ scale: 0.98 }}
            onHoverStart={() => setLoginHovered(true)}
            onHoverEnd={() => setLoginHovered(false)}
          >
            <motion.span
              className="absolute inset-0 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950 opacity-0"
              animate={{ opacity: loginHovered ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            />
            <span className="relative z-10">התחבר</span>
            <motion.svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
              animate={{
                rotate: loginHovered ? [0, -10, 10, -5, 5, 0] : 0,
                scale: loginHovered ? 1.1 : 1,
              }}
              transition={{
                duration: 0.5,
                times: loginHovered ? [0, 0.2, 0.4, 0.6, 0.8, 1] : [0, 1],
                type: "spring",
              }}
            >
              <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
            </motion.svg>
          </motion.button>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
