import { useState } from 'react'
import { useResponsiveScale } from '../hooks/useResponsiveScale'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import MainContent from './MainContent'
import RightPanel from './RightPanel'
import Footer from './Footer'

export default function Layout() {
  const [isMenuOpen, setIsMenuOpen] = useState(true)
  const { scale, containerWidth } = useResponsiveScale()

  return (
    <div className="overflow-x-hidden w-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div 
        style={{ 
          transform: `scale(${scale})`, 
          transformOrigin: 'top left',
          width: containerWidth
        }} 
        className="flex flex-col min-h-screen overflow-x-hidden w-screen"
      >
        <Navbar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

        <div className="flex flex-1 pt-16">
          <Sidebar isMenuOpen={isMenuOpen} />
          <MainContent />
          <RightPanel />
        </div>

        <Footer />
      </div>
    </div>
  )
}

