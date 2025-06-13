import React from 'react'
import { Coffee, ShoppingCart, User, Home, Menu } from 'lucide-react'

interface HeaderProps {
  cartItemCount: number
  onCartClick: () => void
  onHomeClick: () => void
  onMenuClick: () => void
  customerName?: string
}

const Header: React.FC<HeaderProps> = ({ 
  cartItemCount, 
  onCartClick, 
  onHomeClick, 
  onMenuClick,
  customerName 
}) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <button 
              onClick={onHomeClick}
              className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
            >
              <Coffee className="w-8 h-8 text-amber-600" />
              <span className="text-xl font-bold text-gray-900">LimKopi</span>
            </button>
          </div>

          <div className="flex items-center space-x-4">
            {customerName && (
              <div className="hidden sm:flex items-center space-x-2 bg-amber-50 px-3 py-1 rounded-full">
                <User className="w-4 h-4 text-amber-600" />
                <span className="text-sm font-medium text-amber-700">Hello, {customerName}!</span>
              </div>
            )}

            <button
              onClick={onHomeClick}
              className="p-2 text-gray-600 hover:text-amber-600 transition-colors"
              title="Home"
            >
              <Home className="w-5 h-5" />
            </button>

            <button
              onClick={onMenuClick}
              className="p-2 text-gray-600 hover:text-amber-600 transition-colors"
              title="Menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            <button
              onClick={onCartClick}
              className="relative p-2 text-gray-600 hover:text-amber-600 transition-colors"
              title="Cart"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
