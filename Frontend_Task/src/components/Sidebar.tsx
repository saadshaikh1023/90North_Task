import { Home, BarChart2, FileText, Settings } from 'lucide-react'
import React from 'react';

interface SidebarProps {
  isMenuOpen: boolean;
}

export default function Sidebar({ isMenuOpen }: SidebarProps) {
  const menuItems = [
    { icon: Home, label: 'Dashboard' },
    { icon: BarChart2, label: 'Analytics' },
    { icon: FileText, label: 'Reports' },
    { icon: Settings, label: 'Settings' },
  ]

  return (
    <aside 
      className={`${
        isMenuOpen ? 'translate-x-0' : '-translate-x-full'
      } fixed lg:static lg:translate-x-0 z-40 w-64 bg-white dark:bg-gray-800 text-gray-800 dark:text-white h-[calc(100vh-4rem)] overflow-y-auto border-r border-gray-200 dark:border-gray-700 transition-transform duration-300`}
    >
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">Menu</h2>
        <ul className="space-y-2">
          {menuItems.map((item, index) => (
            <li key={index}>
              <button className="w-full text-left px-4 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-150 flex items-center">
                <item.icon className="mr-2 h-4 w-4" />
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  )
}

