import React from 'react'
import { Star, Gift, Trophy, Crown } from 'lucide-react'
import { RewardsAccount } from '../types'
import { getTierBenefits } from '../data/rewardsData'

interface RewardsCardProps {
  account: RewardsAccount
  onViewRewards: () => void
}

const RewardsCard: React.FC<RewardsCardProps> = ({ account, onViewRewards }) => {
  const tierBenefits = getTierBenefits(account.tier)

  const getTierIcon = (tier: string) => {
    switch (tier) {
      case 'Platinum': return <Crown className="w-5 h-5 text-purple-600" />
      case 'Gold': return <Trophy className="w-5 h-5 text-yellow-600" />
      case 'Silver': return <Star className="w-5 h-5 text-gray-600" />
      default: return <Gift className="w-5 h-5 text-amber-600" />
    }
  }

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'Platinum': return 'from-purple-600 to-purple-800'
      case 'Gold': return 'from-yellow-500 to-yellow-700'
      case 'Silver': return 'from-gray-400 to-gray-600'
      default: return 'from-amber-500 to-amber-700'
    }
  }

  const getNextTierProgress = () => {
    const thresholds = { Bronze: 50, Silver: 100, Gold: 200 }
    const currentThreshold = thresholds[account.tier as keyof typeof thresholds]
    
    if (!currentThreshold) return null
    
    const progress = (account.totalSpent / currentThreshold) * 100
    const remaining = currentThreshold - account.totalSpent
    
    return { progress: Math.min(progress, 100), remaining: Math.max(remaining, 0) }
  }

  const nextTierInfo = getNextTierProgress()

  return (
    <div className={`bg-gradient-to-r ${getTierColor(account.tier)} rounded-lg p-4 text-white shadow-lg`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          {getTierIcon(account.tier)}
          <span className="font-semibold">{account.tier} Member</span>
        </div>
        <button
          onClick={onViewRewards}
          className="bg-white/20 hover:bg-white/30 px-3 py-1 rounded-full text-sm transition-colors"
        >
          View Rewards
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-3">
        <div className="text-center">
          <div className="text-2xl font-bold">{account.points}</div>
          <div className="text-xs opacity-80">Points</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold">{account.visits}</div>
          <div className="text-xs opacity-80">Visits</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold">${account.totalSpent.toFixed(0)}</div>
          <div className="text-xs opacity-80">Spent</div>
        </div>
      </div>

      <div className="text-xs opacity-90 mb-2">
        {tierBenefits.description}
      </div>

      {nextTierInfo && nextTierInfo.remaining > 0 && (
        <div className="mt-3">
          <div className="flex justify-between text-xs mb-1">
            <span>Next tier progress</span>
            <span>${nextTierInfo.remaining.toFixed(0)} to go</span>
          </div>
          <div className="w-full bg-white/20 rounded-full h-2">
            <div 
              className="bg-white rounded-full h-2 transition-all duration-500"
              style={{ width: `${nextTierInfo.progress}%` }}
            ></div>
          </div>
        </div>
      )}
    </div>
  )
}

export default RewardsCard
