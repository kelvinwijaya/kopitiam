export interface MenuItem {
  id: string
  name: string
  description: string
  basePrice: number
  category: 'coffee' | 'tea' | 'specialty' | 'food' | 'desserts'
  image: string
  popular?: boolean
  availableCustomizations: {
    cupSize: boolean
    temperature: boolean
    sugarLevel: boolean
    milkType: boolean
  }
}

export interface CustomizationOptions {
  cupSize: 'regular' | 'large'
  temperature: 'hot' | 'cold'
  sugarLevel: 'normal' | 'katai' | 'siutai' | 'siu2xtai' | 'kosong'
  milkType: 'condensed' | 'evaporated'
}

export interface CartItem extends MenuItem {
  quantity: number
  customizations: CustomizationOptions
  finalPrice: number
}

export interface PricingRules {
  cupSizeUpcharge: {
    large: number
  }
  temperatureUpcharge: {
    cold: number
  }
}

export interface RewardsAccount {
  customerName: string
  points: number
  totalSpent: number
  visits: number
  tier: 'Bronze' | 'Silver' | 'Gold' | 'Platinum'
  joinDate: string
}

export interface Promotion {
  id: string
  title: string
  description: string
  type: 'discount' | 'freeItem' | 'points'
  value: number
  minSpend?: number
  validUntil: string
  isActive: boolean
  bannerColor: string
  icon: string
}

export interface RewardRedemption {
  id: string
  name: string
  description: string
  pointsCost: number
  type: 'discount' | 'freeItem'
  value: number
  icon: string
}
