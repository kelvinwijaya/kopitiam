import React, { useState, useEffect } from 'react'
import { X, Info } from 'lucide-react'
import { MenuItem, CustomizationOptions, PricingRules } from '../types'
import { pricingRules, sugarLevelDescriptions, milkTypeDescriptions } from '../data/menuData'

interface BeverageCustomizerProps {
  item: MenuItem
  onAddToCart: (item: MenuItem, customizations: CustomizationOptions, finalPrice: number) => void
  onClose: () => void
}

const BeverageCustomizer: React.FC<BeverageCustomizerProps> = ({ item, onAddToCart, onClose }) => {
  const [customizations, setCustomizations] = useState<CustomizationOptions>({
    cupSize: 'regular',
    temperature: 'hot',
    sugarLevel: 'normal',
    milkType: 'condensed'
  })

  const [showTooltip, setShowTooltip] = useState<string | null>(null)

  const calculateFinalPrice = (): number => {
    let price = item.basePrice

    // Add cup size upcharge
    if (customizations.cupSize === 'large') {
      price += pricingRules.cupSizeUpcharge.large
    }

    // Add temperature upcharge for cold drinks
    if (customizations.temperature === 'cold') {
      price += pricingRules.temperatureUpcharge.cold
    }

    return price
  }

  const handleCustomizationChange = (category: keyof CustomizationOptions, value: string) => {
    setCustomizations(prev => ({
      ...prev,
      [category]: value
    }))
  }

  const handleAddToCart = () => {
    const finalPrice = calculateFinalPrice()
    onAddToCart(item, customizations, finalPrice)
    onClose()
  }

  const finalPrice = calculateFinalPrice()
  const priceIncrease = finalPrice - item.basePrice

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b p-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{item.name}</h2>
            <p className="text-gray-600 mt-1">{item.description}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Cup Size Selection */}
          {item.availableCustomizations.cupSize && (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-semibold text-gray-900">Cup Size</h3>
                <button
                  onMouseEnter={() => setShowTooltip('cupSize')}
                  onMouseLeave={() => setShowTooltip(null)}
                  className="relative"
                >
                  <Info className="w-4 h-4 text-gray-400" />
                  {showTooltip === 'cupSize' && (
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-gray-800 text-white text-xs rounded py-1 px-2 whitespace-nowrap">
                      Large size adds ${pricingRules.cupSizeUpcharge.large.toFixed(2)}
                    </div>
                  )}
                </button>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {['regular', 'large'].map(size => (
                  <button
                    key={size}
                    onClick={() => handleCustomizationChange('cupSize', size)}
                    className={`p-3 rounded-lg border-2 text-left transition-colors ${
                      customizations.cupSize === size
                        ? 'border-amber-600 bg-amber-50 text-amber-900'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="font-medium capitalize">{size}</div>
                    {size === 'large' && (
                      <div className="text-sm text-gray-600">+${pricingRules.cupSizeUpcharge.large.toFixed(2)}</div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Temperature Selection */}
          {item.availableCustomizations.temperature && (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-semibold text-gray-900">Temperature</h3>
                <button
                  onMouseEnter={() => setShowTooltip('temperature')}
                  onMouseLeave={() => setShowTooltip(null)}
                  className="relative"
                >
                  <Info className="w-4 h-4 text-gray-400" />
                  {showTooltip === 'temperature' && (
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-gray-800 text-white text-xs rounded py-1 px-2 whitespace-nowrap">
                      Cold drinks add ${pricingRules.temperatureUpcharge.cold.toFixed(2)}
                    </div>
                  )}
                </button>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {['hot', 'cold'].map(temp => (
                  <button
                    key={temp}
                    onClick={() => handleCustomizationChange('temperature', temp)}
                    className={`p-3 rounded-lg border-2 text-left transition-colors ${
                      customizations.temperature === temp
                        ? 'border-amber-600 bg-amber-50 text-amber-900'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="font-medium capitalize">{temp}</div>
                    {temp === 'cold' && (
                      <div className="text-sm text-gray-600">+${pricingRules.temperatureUpcharge.cold.toFixed(2)}</div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Sugar Level Selection */}
          {item.availableCustomizations.sugarLevel && (
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-900">Sugar Level</h3>
              <div className="space-y-2">
                {Object.entries(sugarLevelDescriptions).map(([key, description]) => (
                  <button
                    key={key}
                    onClick={() => handleCustomizationChange('sugarLevel', key)}
                    className={`w-full p-3 rounded-lg border-2 text-left transition-colors ${
                      customizations.sugarLevel === key
                        ? 'border-amber-600 bg-amber-50 text-amber-900'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="font-medium">{description}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Milk Type Selection */}
          {item.availableCustomizations.milkType && (
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-900">Milk Type</h3>
              <div className="space-y-2">
                {Object.entries(milkTypeDescriptions).map(([key, description]) => (
                  <button
                    key={key}
                    onClick={() => handleCustomizationChange('milkType', key)}
                    className={`w-full p-3 rounded-lg border-2 text-left transition-colors ${
                      customizations.milkType === key
                        ? 'border-amber-600 bg-amber-50 text-amber-900'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="font-medium">{description}</div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-sm text-gray-600">Base Price: ${item.basePrice.toFixed(2)}</div>
              {priceIncrease > 0 && (
                <div className="text-sm text-gray-600">Customizations: +${priceIncrease.toFixed(2)}</div>
              )}
              <div className="text-xl font-bold text-amber-600">Total: ${finalPrice.toFixed(2)}</div>
            </div>
          </div>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleAddToCart}
              className="flex-1 px-6 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 font-medium transition-colors"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BeverageCustomizer
