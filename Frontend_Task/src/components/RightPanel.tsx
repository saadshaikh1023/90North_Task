import React from 'react';

export default function RightPanel() {
    return (
      <aside className="hidden xl:block w-64 bg-white dark:bg-gray-800 p-4 border-l border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Updates</h2>
        <div className="space-y-4">
          {[1, 2, 3].map((item) => (
            <div key={item} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg shadow-sm ">
              <h3 className="font-semibold text-gray-800 dark:text-white">Update {item}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Latest update information goes here...
              </p>
            </div>
          ))}
        </div>
      </aside>
    )
  }
  
  