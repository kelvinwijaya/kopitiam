import { MenuItem, PricingRules } from '../types'

export const pricingRules: PricingRules = {
  cupSizeUpcharge: {
    large: 0.50
  },
  temperatureUpcharge: {
    cold: 0.30
  }
}

export const sugarLevelDescriptions = {
  normal: 'Normal (75% sweetness)',
  katai: 'Katai (100% sweetness - extra sweet)',
  siutai: 'Siutai (50% sweetness - less sweet)',
  siu2xtai: 'Siu2xtai (25% sweetness - very less sweet)',
  kosong: 'Kosong (0% sweetness - no sugar)'
}

export const milkTypeDescriptions = {
  condensed: 'Condensed Milk (Traditional sweet & creamy)',
  evaporated: 'Evaporated Milk (Light & smooth)'
}

export const menuItems: MenuItem[] = [
  // Traditional Coffee (Kopi) Series
  {
    id: 'kopi-001',
    name: 'Kopi',
    description: 'Traditional Nanyang coffee with condensed milk - the classic brew',
    basePrice: 2.20,
    category: 'coffee',
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    popular: true,
    availableCustomizations: {
      cupSize: true,
      temperature: true,
      sugarLevel: true,
      milkType: true
    }
  },
  {
    id: 'kopi-002',
    name: 'Kopi-O',
    description: 'Black coffee with sugar - strong and aromatic without milk',
    basePrice: 1.80,
    category: 'coffee',
    image: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    availableCustomizations: {
      cupSize: true,
      temperature: true,
      sugarLevel: true,
      milkType: false
    }
  },
  {
    id: 'kopi-003',
    name: 'Kopi-C',
    description: 'Coffee with evaporated milk and sugar - smooth and creamy',
    basePrice: 2.50,
    category: 'coffee',
    image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    availableCustomizations: {
      cupSize: true,
      temperature: true,
      sugarLevel: true,
      milkType: false
    }
  },

  // Traditional Tea (Teh) Series
  {
    id: 'teh-001',
    name: 'Teh',
    description: 'Traditional milk tea with condensed milk - smooth and comforting',
    basePrice: 2.00,
    category: 'tea',
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    popular: true,
    availableCustomizations: {
      cupSize: true,
      temperature: true,
      sugarLevel: true,
      milkType: true
    }
  },
  {
    id: 'teh-002',
    name: 'Teh-O',
    description: 'Black tea with sugar - refreshing and aromatic without milk',
    basePrice: 1.60,
    category: 'tea',
    image: 'https://images.unsplash.com/photo-1597318181409-cf64d0b5d8a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    availableCustomizations: {
      cupSize: true,
      temperature: true,
      sugarLevel: true,
      milkType: false
    }
  },
  {
    id: 'teh-003',
    name: 'Teh-C',
    description: 'Tea with evaporated milk and sugar - light and smooth',
    basePrice: 2.30,
    category: 'tea',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    availableCustomizations: {
      cupSize: true,
      temperature: true,
      sugarLevel: true,
      milkType: false
    }
  },
  {
    id: 'teh-004',
    name: 'Teh Tarik',
    description: 'Pulled tea - frothy and aromatic Malaysian favorite',
    basePrice: 2.80,
    category: 'tea',
    image: 'https://images.unsplash.com/photo-1571934811356-5cc061b6821f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    popular: true,
    availableCustomizations: {
      cupSize: true,
      temperature: false, // Traditional Teh Tarik is served hot only
      sugarLevel: true,
      milkType: true
    }
  },

  // Specialty Beverages
  {
    id: 'specialty-001',
    name: 'Milo',
    description: 'Classic chocolate malt drink - childhood favorite',
    basePrice: 2.50,
    category: 'specialty',
    image: 'https://images.unsplash.com/photo-1542990253-0b8be4294dac?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    availableCustomizations: {
      cupSize: true,
      temperature: true,
      sugarLevel: true,
      milkType: true
    }
  }
]
