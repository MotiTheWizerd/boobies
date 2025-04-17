"use client";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-footer dark:bg-footer border-t dark:border-gray-800 py-6 mt-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div>
            <h3 className="font-bold text-purple-800 dark:text-purple-300 mb-3">
              ראשי
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="#"
                  className="text-gray-700 hover:text-purple-600 dark:text-gray-300 dark:hover:text-purple-400"
                >
                  חם🔥 בלעדי
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-700 hover:text-purple-600 dark:text-gray-300 dark:hover:text-purple-400"
                >
                  נערות ליווי
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-700 hover:text-purple-600 dark:text-gray-300 dark:hover:text-purple-400"
                >
                  עלית
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-700 hover:text-purple-600 dark:text-gray-300 dark:hover:text-purple-400"
                >
                  שירותי ליווי
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-purple-800 dark:text-purple-300 mb-3">
              עלינו
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="#"
                  className="text-gray-700 hover:text-purple-600 dark:text-gray-300 dark:hover:text-purple-400"
                >
                  תנאי שימוש
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-700 hover:text-purple-600 dark:text-gray-300 dark:hover:text-purple-400"
                >
                  עיסוי אירוטי
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-700 hover:text-purple-600 dark:text-gray-300 dark:hover:text-purple-400"
                >
                  דירות דיסקרטיות
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-700 hover:text-purple-600 dark:text-gray-300 dark:hover:text-purple-400"
                >
                  חדרים לפי שעה
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-purple-800 dark:text-purple-300 mb-3">
              שירותים
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="#"
                  className="text-gray-700 hover:text-purple-600 dark:text-gray-300 dark:hover:text-purple-400"
                >
                  טופ 10
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-700 hover:text-purple-600 dark:text-gray-300 dark:hover:text-purple-400"
                >
                  מודעות חדשות
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-700 hover:text-purple-600 dark:text-gray-300 dark:hover:text-purple-400"
                >
                  חיפוש
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-700 hover:text-purple-600 dark:text-gray-300 dark:hover:text-purple-400"
                >
                  פרסום
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-purple-800 dark:text-purple-300 mb-3">
              הוספה
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="#"
                  className="text-gray-700 hover:text-purple-600 dark:text-gray-300 dark:hover:text-purple-400"
                >
                  הוסף מודעה
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-700 hover:text-purple-600 dark:text-gray-300 dark:hover:text-purple-400"
                >
                  מועדפים
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-700 hover:text-purple-600 dark:text-gray-300 dark:hover:text-purple-400"
                >
                  נצפו לאחרונה
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-700 hover:text-purple-600 dark:text-gray-300 dark:hover:text-purple-400"
                >
                  אנדרואיד
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-purple-800 dark:text-purple-300 mb-3">
              תקשורת
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="#"
                  className="text-gray-700 hover:text-purple-600 dark:text-gray-300 dark:hover:text-purple-400"
                >
                  טלגרם
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-700 hover:text-purple-600 dark:text-gray-300 dark:hover:text-purple-400"
                >
                  PWA
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-700 hover:text-purple-600 dark:text-gray-300 dark:hover:text-purple-400"
                >
                  RSS Feed
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="text-center mt-8 text-sm text-gray-600 dark:text-gray-400">
          <p>© 2025, שירותי פרסום - פאבליש בורד</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
