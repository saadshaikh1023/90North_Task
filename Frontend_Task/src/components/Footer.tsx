import React from "react";

export default function Footer() {
    return (
      <footer className="bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 py-6 border-t border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white">FrontEndTask</h3>
              <p className="text-sm">© 2025 All rights reserved.</p>
            </div>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-gray-800 dark:hover:text-white transition-colors">Terms</a>
              <a href="#" className="hover:text-gray-800 dark:hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-gray-800 dark:hover:text-white transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    )
  }
  
  