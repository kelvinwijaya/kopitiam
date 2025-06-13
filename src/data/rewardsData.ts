import { RewardRedemption, Promotion } from '../types'

export const rewardRedemptions: RewardRedemption[] = [
  {
    id: 'free-kopi',
    name: 'Free Kopi',
    description: 'Redeem a free traditional Kopi',
    pointsCost: 100,
    type: 'freeItem',
    value: 1.20,
    icon: '☕'
  },
  {
    id: 'free-teh',
    name: 'Free Teh',
    description: 'Redeem a free traditional Teh',
    pointsCost: 100,
    type: 'freeItem',
    value: 1.20,
    icon: '🍵'
  },
  {
    id: 'discount-10',
    name: '10% Off',
    description: '10% discount on your next order',
    pointsCost: 150,
    type: 'discount',
    value: 0.10,
    icon: '💰'
  },
  {
    id: 'discount-20',
    name: '20% Off',
    description: '20% discount on your next order',
    pointsCost: 300,
    type: 'discount',
    value: 0.20,
    icon: '🎉'
  },
  {
    id: 'free-milo',
    name: 'Free Milo',
    description: 'Redeem a free Milo drink',
    pointsCost: 120,
    type: 'freeItem',
    value: 1.50,
    icon: '🍫'
  }
]

export const activePromotions: Promotion[] = [
  {
    id: 'weekend-special',
    title: 'Weekend Special',
    description: 'Get 20% off all beverages this weekend!',
    type: 'discount',
    value: 0.20,
    minSpend: 5.00,
    validUntil: '2024-12-31',
    isActive: true,
    bannerColor: 'bg-gradient-to-r from-purple-600 to-pink-600',
    icon: '🎉'
  },
  {
    id: 'double-points',
    title: 'Double Points Day',
    description: 'Earn 2x points on all purchases today!',
    type: 'points',
    value: 2,
    validUntil: '2024-12-25',
    isActive: true,
    bannerColor: 'bg-gradient-to-r from-green-600 to-blue-600',
    icon: '⭐'
  },
  {
    id: 'new-customer',
    title: 'Welcome Bonus',
    description: 'New customers get 50 bonus points!',
    type: 'points',
    value: 50,
    validUntil: '2024-12-31',
    isActive: true,
    bannerColor: 'bg-gradient-to-r from-amber-600 to-orange-600',
    icon: '🎁'
  }
]

export const calculateTier = (totalSpent: number): 'Bronze' | 'Silver' | 'Gold' | 'Platinum' => {
  if (totalSpent >= 200) return 'Platinum'
  if (totalSpent >= 100) return 'Gold'
  if (totalSpent >= 50) return 'Silver'
  return 'Bronze'
}

export const getTierBenefits = (tier: string) => {
  const benefits = {
    Bronze: { multiplier: 1, description: 'Earn 1 point per $1 spent' },
    Silver: { multiplier: 1.2, description: 'Earn 1.2 points per $1 spent + birthday bonus' },
    Gold: { multiplier: 1.5, description: 'Earn 1.5 points per $1 spent + exclusive offers' },
    Platinum: { multiplier: 2, description: 'Earn 2 points per $1 spent + VIP perks' }
  }
  return benefits[tier as keyof typeof benefits] || benefits.Bronze
}

export const calculatePointsEarned = (amount: number, tier: string, isDoublePoints: boolean = false): number => {
  const tierBenefits = getTierBenefits(tier)
  const basePoints = Math.floor(amount * tierBenefits.multiplier)
  return isDoublePoints ? basePoints * 2 : basePoints
}
