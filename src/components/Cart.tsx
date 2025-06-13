import React from 'react'
import { Minus, Plus, ArrowLeft, ArrowRight, Trash2 } from 'lucide-react'
import { CartItem, CustomizationOptions } from '../types'
import { sugarLevelDescriptions, milkTypeDescriptions } from '../data/menuData'

interface CartProps {
  items: CartItem[]
  onUpdateItem: (id: string, customizations: CustomizationOptions, quantity: number) => void
  onRemoveItem: (id: string, customizations: CustomizationOptions) => void
  onProceedToCheckout: () => void
  onBackToMenu: () => void
  total: number
  customerName: string
}

const Cart: React.FC<CartProps> = ({ 
  items, 
  onUpdateItem, 
  onRemoveItem, 
  onProceedToCheckout, 
  onBackToMenu, 
  total,
  customerName
}) => {
  const formatCustomizations = (customizations: CustomizationOptions, item: CartItem) => {
    const details = []
    
    if (item.availableCustomizations.cupSize) {
      details.push(`${customizations.cupSize.charAt(0).toUpperCase() + customizations.cupSize.slice(1)} Cup`)
    }
    
    if (item.availableCustomizations.temperature) {
      details.push(`${customizations.temperature.charAt(0).toUpperCase() + customizations.temperature.slice(1)}`)
    }
    
    if (item.availableCustomizations.sugarLevel) {
      const sugarDesc = sugarLevelDescriptions[customizations.sugarLevel]
      details.push(sugarDesc)
    }
    
    if (item.availableCustomizations.milkType) {
      const milkDesc = milkTypeDescriptions[customizations.milkType]
      details.push(milkDesc.split(' (')[0]) // Just the milk type name
    }
    
    return details
  }

  const getItemKey = (item: CartItem) => {
    return `${item.id}-${JSON.stringify(item.customizations)}`
  }

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center py-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Cart is Empty</h2>
          <p className="text-gray-600 mb-8">Add some delicious beverages to get started!</p>
          <button
            onClick={onBackToMenu}
            className="bg-amber-600 text-white px-6 py-3 rounded-lg hover:bg-amber-700 transition-colors flex items-center mx-auto"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Menu
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Your Order</h1>
          <p className="text-gray-600 mt-1">Hi {customerName}, review your items below</p>
        </div>
        <button
          onClick={onBackToMenu}
          className="text-amber-600 hover:text-amber-700 flex items-center"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to Menu
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
        {items.map((item) => {
          const itemKey = getItemKey(item)
          const customizationDetails = formatCustomizations(item.customizations, item)
          
          return (
            <div key={itemKey} className="p-6 border-b border-gray-200 last:border-b-0">
              <div className="flex items-start gap-4">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{item.name}</h3>
                  <p className="text-gray-600 text-sm mb-2">{item.description}</p>
                  
                  {/* Customizations */}
                  {customizationDetails.length > 0 && (
                    <div className="mb-3">
                      <div className="flex flex-wrap gap-2">
                        {customizationDetails.map((detail, index) => (
                          <span 
                            key={index}
                            className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
                          >
                            {detail}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => onUpdateItem(item.id, item.customizations, item.quantity - 1)}
                        className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="font-medium text-lg min-w-[2rem] text-center">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateItem(item.id, item.customizations, item.quantity + 1)}
                        className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <span className="text-lg font-bold text-amber-600">
                        ${(item.finalPrice * item.quantity).toFixed(2)}
                      </span>
                      <button
                        onClick={() => onRemoveItem(item.id, item.customizations)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Order Summary */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between text-xl font-bold text-gray-900 mb-6">
          <span>Total</span>
          <span className="text-amber-600">${total.toFixed(2)}</span>
        </div>
        
        <button
          onClick={onProceedToCheckout}
          className="w-full bg-amber-600 text-white py-4 rounded-lg hover:bg-amber-700 transition-colors flex items-center justify-center text-lg font-medium"
        >
          Proceed to Checkout
          <ArrowRight className="w-5 h-5 ml-2" />
        </button>
      </div>
    </div>
  )
}

export default Cart
