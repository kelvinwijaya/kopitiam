import React, { useState } from 'react'
import { ArrowRight, Star, Coffee, Thermometer, Droplets, Zap } from 'lucide-react'
import BeverageCustomizer from './BeverageCustomizer'
import { MenuItem, CustomizationOptions } from '../types'

interface MenuProps {
  onAddToCart: (item: MenuItem, customizations: CustomizationOptions, finalPrice: number) => void
  onProceedToCart: () => void
  cartItemCount: number
  customerName: string
}

const Menu: React.FC<MenuProps> = ({ onAddToCart, onProceedToCart, cartItemCount, customerName }) => {
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null)
  const [activeCategory, setActiveCategory] = useState<'all' | 'coffee' | 'tea' | 'specialty'>('all')

  const menuItems: MenuItem[] = [
    {
      id: 'kopi',
      name: 'Kopi',
      description: 'Traditional black coffee with condensed milk',
      basePrice: 1.20,
      category: 'coffee',
      image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      popular: true,
      availableCustomizations: {
        cupSize: true,
        temperature: true,
        sugarLevel: true,
        milkType: true
      }
    },
    {
      id: 'kopi-o',
      name: 'Kopi-O',
      description: 'Black coffee with sugar, no milk',
      basePrice: 1.00,
      category: 'coffee',
      image: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      popular: true,
      availableCustomizations: {
        cupSize: true,
        temperature: true,
        sugarLevel: true,
        milkType: false
      }
    },
    {
      id: 'kopi-c',
      name: 'Kopi-C',
      description: 'Coffee with evaporated milk and sugar',
      basePrice: 1.30,
      category: 'coffee',
      image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      availableCustomizations: {
        cupSize: true,
        temperature: true,
        sugarLevel: true,
        milkType: false
      }
    },
    {
      id: 'teh',
      name: 'Teh',
      description: 'Traditional milk tea with condensed milk',
      basePrice: 1.20,
      category: 'tea',
      image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      popular: true,
      availableCustomizations: {
        cupSize: true,
        temperature: true,
        sugarLevel: true,
        milkType: true
      }
    },
    {
      id: 'teh-o',
      name: 'Teh-O',
      description: 'Plain tea with sugar, no milk',
      basePrice: 1.00,
      category: 'tea',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      availableCustomizations: {
        cupSize: true,
        temperature: true,
        sugarLevel: true,
        milkType: false
      }
    },
    {
      id: 'teh-c',
      name: 'Teh-C',
      description: 'Tea with evaporated milk and sugar',
      basePrice: 1.30,
      category: 'tea',
      image: 'https://images.unsplash.com/photo-1571934811356-5cc061b6821f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      availableCustomizations: {
        cupSize: true,
        temperature: true,
        sugarLevel: true,
        milkType: false
      }
    },
    {
      id: 'milo',
      name: 'Milo',
      description: 'Chocolate malt drink with condensed milk',
      basePrice: 1.50,
      category: 'specialty',
      image: 'https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      popular: true,
      availableCustomizations: {
        cupSize: true,
        temperature: true,
        sugarLevel: true,
        milkType: true
      }
    },
    {
      id: 'horlicks',
      name: 'Horlicks',
      description: 'Malted milk drink with condensed milk',
      basePrice: 1.50,
      category: 'specialty',
      image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      availableCustomizations: {
        cupSize: true,
        temperature: true,
        sugarLevel: true,
        milkType: true
      }
    }
  ]

  const categories = [
    { id: 'all', name: 'All Items', icon: Coffee },
    { id: 'coffee', name: 'Coffee', icon: Coffee },
    { id: 'tea', name: 'Tea', icon: Droplets },
    { id: 'specialty', name: 'Specialty', icon: Star }
  ]

  const filteredItems = activeCategory === 'all' 
    ? menuItems 
    : menuItems.filter(item => item.category === activeCategory)

  const handleAddToCart = (item: MenuItem, customizations: CustomizationOptions, finalPrice: number) => {
    onAddToCart(item, customizations, finalPrice)
    setSelectedItem(null)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Our Menu</h1>
          <p className="text-gray-600 mt-1">Welcome {customerName}! Choose your favorite beverages</p>
        </div>
        {cartItemCount > 0 && (
          <button
            onClick={onProceedToCart}
            className="bg-amber-600 text-white px-6 py-3 rounded-lg hover:bg-amber-700 transition-colors flex items-center"
          >
            View Cart ({cartItemCount})
            <ArrowRight className="w-4 h-4 ml-2" />
          </button>
        )}
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-4 mb-8">
        {categories.map((category) => {
          const IconComponent = category.icon
          return (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id as any)}
              className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                activeCategory === category.id
                  ? 'bg-amber-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-amber-50 border border-gray-200'
              }`}
            >
              <IconComponent className="w-4 h-4 mr-2" />
              {category.name}
            </button>
          )
        })}
      </div>

      {/* Menu Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative">
              <img 
                src={item.image} 
                alt={item.name}
                className="w-full h-48 object-cover"
              />
              {item.popular && (
                <div className="absolute top-3 left-3 bg-amber-600 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center">
                  <Star className="w-3 h-3 mr-1" />
                  Popular
                </div>
              )}
            </div>
            
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.name}</h3>
              <p className="text-gray-600 text-sm mb-3">{item.description}</p>
              
              <div className="flex items-center justify-between">
                <span className="text-xl font-bold text-amber-600">
                  ${item.basePrice.toFixed(2)}
                </span>
                <button
                  onClick={() => setSelectedItem(item)}
                  className="bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition-colors"
                >
                  Customize
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

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
