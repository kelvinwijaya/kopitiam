import React, { useState } from 'react'
import { X, Gift, Star, Percent } from 'lucide-react'
import { Promotion } from '../types'
import { activePromotions } from '../data/rewardsData'

interface PromotionBannerProps {
  onPromotionSelect?: (promotion: Promotion) => void
}

const PromotionBanner: React.FC<PromotionBannerProps> = ({ onPromotionSelect }) => {
  const [currentPromoIndex, setCurrentPromoIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  const visiblePromotions = activePromotions.filter(promo => promo.isActive)

  if (!isVisible || visiblePromotions.length === 0) {
    return null
  }

  const currentPromo = visiblePromotions[currentPromoIndex]

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case '🎉': return <Gift className="w-5 h-5" />
      case '⭐': return <Star className="w-5 h-5" />
      case '🎁': return <Gift className="w-5 h-5" />
      default: return <Percent className="w-5 h-5" />
    }
  }

  const nextPromotion = () => {
    setCurrentPromoIndex((prev) => (prev + 1) % visiblePromotions.length)
  }

  const handleBannerClick = () => {
    if (onPromotionSelect) {
      onPromotionSelect(currentPromo)
    }
  }

  return (
    <div className={`${currentPromo.bannerColor} text-white relative overflow-hidden`}>
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div 
            className="flex items-center space-x-3 cursor-pointer flex-1"
            onClick={handleBannerClick}
          >
            <div className="flex-shrink-0">
              {getIcon(currentPromo.icon)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm sm:text-base">
                {currentPromo.title}
              </p>
              <p className="text-xs sm:text-sm opacity-90 truncate">
                {currentPromo.description}
                {currentPromo.minSpend && ` (Min spend: $${currentPromo.minSpend.toFixed(2)})`}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2 ml-4">
            {visiblePromotions.length > 1 && (
              <div className="flex space-x-1">
                {visiblePromotions.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentPromoIndex(index)}
                    className={`w-2 h-2 rounded-full transition-opacity ${
                      index === currentPromoIndex ? 'bg-white' : 'bg-white/50'
                    }`}
                  />
                ))}
              </div>
            )}
            
            {visiblePromotions.length > 1 && (
              <button
                onClick={nextPromotion}
                className="text-white/80 hover:text-white transition-colors p-1"
                title="Next promotion"
              >
                <Star className="w-4 h-4" />
              </button>
            )}

            <button
              onClick={() => setIsVisible(false)}
              className="text-white/80 hover:text-white transition-colors p-1"
              title="Close banner"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Animated background effect */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -top-4 -right-4 w-24 h-24 bg-white rounded-full animate-pulse"></div>
        <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-white rounded-full animate-pulse delay-1000"></div>
      </div>
    </div>
  )
}

export default PromotionBanner
