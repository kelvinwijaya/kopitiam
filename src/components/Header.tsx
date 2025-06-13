import React from 'react'
import { Coffee, ShoppingCart, Menu, Home } from 'lucide-react'

interface HeaderProps {
  cartItemCount: number
  onCartClick: () => void
  onHomeClick: () => void
  onMenuClick: () => void
}

const Header: React.FC<HeaderProps> = ({ cartItemCount, onCartClick, onHomeClick, onMenuClick }) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center cursor-pointer" onClick={onHomeClick}>
            <Coffee className="w-8 h-8 text-amber-600 mr-2" />
            <span className="text-xl font-bold text-gray-900">LimKopi</span>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <button 
              onClick={onHomeClick}
              className="text-gray-700 hover:text-amber-600 px-3 py-2 text-sm font-medium transition-colors"
            >
              Home
            </button>
            <button 
              onClick={onMenuClick}
              className="text-gray-700 hover:text-amber-600 px-3 py-2 text-sm font-medium transition-colors"
            >
              Menu
            </button>
            <span className="text-gray-700 px-3 py-2 text-sm font-medium">About</span>
            <span className="text-gray-700 px-3 py-2 text-sm font-medium">Contact</span>
          </nav>

          <div className="flex items-center space-x-4">
            <button 
              onClick={onCartClick}
              className="relative p-2 text-gray-700 hover:text-amber-600 transition-colors"
            >
              <ShoppingCart className="w-6 h-6" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </button>
            
            <button className="md:hidden p-2 text-gray-700">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
