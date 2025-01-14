import React from "react";

export default function MainContent() {
    return (
      <main className="flex-1 bg-gray-50 dark:bg-gray-900 min-h-[calc(100vh-4rem)] p-6 overflow-y-auto">
        <div className="max-w-[2000px] mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">Welcome to the Dashboard</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={item}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-all duration-300 hover:shadow-lg"
              >
                <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Card {item}</h2>
                <p className="text-gray-600 dark:text-gray-300">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                  Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>
    )
  }
  
  