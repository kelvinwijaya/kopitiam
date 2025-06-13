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
