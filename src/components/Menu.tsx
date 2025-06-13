import React, { useState } from 'react'
import { Plus, Star, ArrowRight } from 'lucide-react'
import { MenuItem, CustomizationOptions } from '../types'
import { menuItems } from '../data/menuData'
import BeverageCustomizer from './BeverageCustomizer'

interface MenuProps {
  onAddToCart: (item: MenuItem, customizations: CustomizationOptions, finalPrice: number) => void
  onProceedToTable: () => void
  cartItemCount: number
}

const Menu: React.FC<MenuProps> = ({ onAddToCart, onProceedToTable, cartItemCount }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null)

  const categories = [
    { id: 'all', name: 'All Beverages' },
    { id: 'coffee', name: 'Kopi (Coffee)' },
    { id: 'tea', name: 'Teh (Tea)' },
    { id: 'specialty', name: 'Specialty Drinks' }
  ]

  const filteredItems = selectedCategory === 'all' 
    ? menuItems 
    : menuItems.filter(item => item.category === selectedCategory)

  const handleItemClick = (item: MenuItem) => {
    setSelectedItem(item)
  }

  const handleAddToCart = (item: MenuItem, customizations: CustomizationOptions, finalPrice: number) => {
    onAddToCart(item, customizations, finalPrice)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Traditional Nanyang Beverages</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Authentic traditional coffee shop favorites with full customization options. 
          Each beverage can be tailored to your preference.
        </p>
      </div>

      {/* Customization Guide */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mb-8">
        <h2 className="text-lg font-semibold text-amber-900 mb-4">Customization Options Available</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
          <div>
            <h3 className="font-medium text-amber-800 mb-2">Cup Size</h3>
            <ul className="text-amber-700 space-y-1">
              <li>• Regular</li>
              <li>• Large (+$0.50)</li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium text-amber-800 mb-2">Temperature</h3>
            <ul className="text-amber-700 space-y-1">
              <li>• Hot</li>
              <li>• Cold (+$0.30)</li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium text-amber-800 mb-2">Sugar Level</h3>
            <ul className="text-amber-700 space-y-1">
              <li>• Kosong (No sugar)</li>
              <li>• Siu2xtai (25%)</li>
              <li>• Siutai (50%)</li>
              <li>• Normal (75%)</li>
              <li>• Katai (100%)</li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium text-amber-800 mb-2">Milk Type</h3>
            <ul className="text-amber-700 space-y-1">
              <li>• Condensed Milk</li>
              <li>• Evaporated Milk</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === category.id
                ? 'bg-amber-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Menu Items Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {filteredItems.map(item => (
          <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative">
              <img 
                src={item.image} 
                alt={item.name}
                className="w-full h-48 object-cover"
              />
              {item.popular && (
                <div className="absolute top-2 left-2 bg-amber-600 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center">
                  <Star className="w-3 h-3 mr-1" />
                  Popular
                </div>
              )}
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.name}</h3>
              <p className="text-gray-600 text-sm mb-3">{item.description}</p>
              
              {/* Available Customizations Indicator */}
              <div className="flex flex-wrap gap-1 mb-3">
                {item.availableCustomizations.cupSize && (
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">Size</span>
                )}
                {item.availableCustomizations.temperature && (
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Temp</span>
                )}
                {item.availableCustomizations.sugarLevel && (
                  <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded">Sugar</span>
                )}
                {item.availableCustomizations.milkType && (
                  <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded">Milk</span>
                )}
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xl font-bold text-amber-600">From ${item.basePrice.toFixed(2)}</span>
                  <div className="text-xs text-gray-500">Base price</div>
                </div>
                <button
                  onClick={() => handleItemClick(item)}
                  className="bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition-colors flex items-center"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Customize
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Proceed to Table Button */}
      {cartItemCount > 0 && (
        <div className="fixed bottom-4 right-4">
          <button
            onClick={onProceedToTable}
            className="bg-amber-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-amber-700 transition-colors flex items-center"
          >
            Proceed to Table ({cartItemCount})
            <ArrowRight className="w-4 h-4 ml-2" />
          </button>
        </div>
      )}

      {/* Beverage Customizer Modal */}
      {selectedItem && (
        <BeverageCustomizer
          item={selectedItem}
          onAddToCart={handleAddToCart}
          onClose={() => setSelectedItem(null)}
        />
      )}
    </div>
  )
}

export default Menu
